const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Diubah untuk menggunakan header 'Authorization: Bearer <token>'
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Akses ditolak, token tidak tersedia' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Tambahkan userId ke object request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token tidak valid' });
    }
};

module.exports = authMiddleware;
