const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: 'Username sudah digunakan' }] });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Pengguna berhasil terdaftar' });
    } catch (error) {
        next(error); // Lempar error ke middleware terpusat
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ errors: [{ msg: 'Kredensial tidak valid' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ errors: [{ msg: 'Kredensial tidak valid' }] });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (error) {
        next(error); // Lempar error ke middleware terpusat
    }
};

