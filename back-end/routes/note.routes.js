const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middleware/auth.middleware');
// Impor 'check'
const { check } = require('express-validator');

router.use(authMiddleware);

router.get('/', noteController.getAllNotes);

router.post(
    '/',
    [ // Aturan validasi untuk membuat catatan baru
        check('title', 'Judul tidak boleh kosong').not().isEmpty()
    ],
    noteController.createNote
);

router.put(
    '/:id',
    [ // Aturan validasi untuk mengupdate catatan
        check('title', 'Judul tidak boleh kosong').not().isEmpty()
    ],
    noteController.updateNote
);

router.delete('/:id', noteController.deleteNote);

module.exports = router;

