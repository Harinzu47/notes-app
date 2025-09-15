const request = require('supertest');
const { app } = require('../index'); // <-- PERBAIKAN: Gunakan destructuring
const User = require('../models/user.model');

describe('Auth Endpoints', () => {
    
    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Pengguna berhasil terdaftar');
    });

    it('should not register a user with an existing username', async () => {
        // Buat user pertama
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'password123' });
        
        // Coba buat user kedua dengan username yang sama
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'password123' });
            
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors[0]).toHaveProperty('msg', 'Username sudah digunakan');
    });

    it('should log in an existing user successfully', async () => {
        // Daftar dulu
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'loginuser', password: 'password123' });

        // Coba login
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'loginuser', password: 'password123' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('username', 'loginuser');
    });

    it('should not log in with incorrect credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'nouser', password: 'wrongpassword' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.errors[0]).toHaveProperty('msg', 'Kredensial tidak valid');
    });
});

