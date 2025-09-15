require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// --- MIDDLEWARE & SETUP ---
app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
    message: 'Terlalu banyak request dari IP ini, silakan coba lagi setelah 15 menit'
});
app.use('/api', limiter);

// --- RUTE ---
const authRoutes = require('./routes/auth.routes');
const noteRoutes = require('./routes/note.routes');
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Terjadi kesalahan internal pada server!' });
});

// --- FUNGSI KONEKSI DATABASE (DIPISAHKAN) ---
const connectDB = async () => {
    try {
        const uri = process.env.NODE_ENV === 'test' 
            ? process.env.MONGO_URI_TEST 
            : process.env.MONGO_URI;
        await mongoose.connect(uri);
        console.log('Berhasil terhubung ke MongoDB');
    } catch (err) {
        console.error('Koneksi MongoDB gagal:', err);
        process.exit(1); // Keluar dari proses jika koneksi gagal
    }
};

// --- START SERVER ---
// Hanya jalankan server jika file ini dieksekusi langsung
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server backend berjalan di http://localhost:${PORT}`);
        });
    });
}

module.exports = { app, connectDB }; // Ekspor app DAN fungsi connectDB

