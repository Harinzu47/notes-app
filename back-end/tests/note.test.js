const request = require('supertest');
const { app } = require('../index'); // <-- PERBAIKAN: Gunakan destructuring

describe('Note Endpoints', () => {
    let token;
    let userId;

    // Sebelum setiap tes, buat user dan login untuk mendapatkan token
    beforeEach(async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'noteuser', password: 'password123' });
        
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'noteuser', password: 'password123' });
        
        token = res.body.token;
    });

    it('should not allow access to notes without a token', async () => {
        const res = await request(app).get('/api/notes');
        expect(res.statusCode).toEqual(401);
    });

    it('should create a new note for an authenticated user', async () => {
        const res = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`) // Pasang token di header
            .send({ title: 'My First Note', content: 'This is the content.' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'My First Note');
    });

    it('should fetch all notes for an authenticated user', async () => {
        // Buat catatan dulu
        await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Note 1', content: 'Content 1' });
        
        // Ambil semua catatan
        const res = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe('Note 1');
    });
});

