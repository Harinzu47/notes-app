const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { connectDB } = require('../index'); // Impor fungsi connectDB

let mongoServer;

// Sebelum semua tes dimulai
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGO_URI_TEST = mongoUri;
    
    // Panggil connectDB SECARA EKSPLISIT setelah URI siap
    await connectDB();
});

// Setelah semua tes selesai
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Sebelum setiap tes individu
beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

