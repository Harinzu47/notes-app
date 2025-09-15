const Note = require('../models/note.model');
const { validationResult } = require('express-validator');

exports.createNote = async (req, res, next) => { // Tambahkan 'next'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content } = req.body;
        const note = new Note({ title, content, owner: req.userId });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        next(error); // Lempar error ke middleware terpusat
    }
};

exports.getAllNotes = async (req, res, next) => { // Tambahkan 'next'
    try {
        const notes = await Note.find({ owner: req.userId }).sort({ updatedAt: -1 });
        res.json(notes);
    } catch (error) {
        next(error); // Lempar error ke middleware terpusat
    }
};

exports.updateNote = async (req, res, next) => { // Tambahkan 'next'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, owner: req.userId },
            { title, content },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ error: 'Catatan tidak ditemukan atau Anda tidak punya akses' });
        }
        res.json(note);
    } catch (error) {
        next(error); // Lempar error ke middleware terpusat
    }
};

exports.deleteNote = async (req, res, next) => { // Tambahkan 'next'
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!note) {
            return res.status(404).json({ error: 'Catatan tidak ditemukan atau Anda tidak punya akses' });
        }
        res.json({ message: 'Catatan berhasil dihapus' });
    } catch (error) {
        next(error); // Lempar error ke middleware terpusat
    }
};

