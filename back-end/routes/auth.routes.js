const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
// Impor 'check' dari express-validator
const { check } = require('express-validator');

// Terapkan aturan validasi sebagai middleware sebelum controller
router.post(
    '/register',
    [
        check('username', 'Username harus diisi').not().isEmpty(),
        check('username', 'Username minimal 3 karakter').isLength({ min: 3 }),
        check('password', 'Password minimal 6 karakter').isLength({ min: 6 })
    ],
    authController.register
);

router.post(
    '/login',
    [
        check('username', 'Username harus diisi').not().isEmpty(),
        check('password', 'Password harus diisi').not().isEmpty()
    ],
    authController.login
);

module.exports = router;

