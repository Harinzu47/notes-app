/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api/service';

// Terima `isAuthenticated` sebagai argumen
export const useNotes = (isAuthenticated) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    // useCallback akan membuat ulang fungsi ini jika isAuthenticated berubah
    const fetchNotes = useCallback(async () => {
        // Jangan coba fetch jika tidak login
        if (!isAuthenticated) {
            setNotes([]);
            setLoading(false);
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const data = await getNotes();
            if (Array.isArray(data)) {
                setNotes(data);
            } else {
                console.warn("API 'getNotes' tidak mengembalikan sebuah array.", data);
                setNotes([]); // Selalu pastikan state adalah array
            }
        } catch (err) {
            setError('Gagal memuat catatan.');
            setNotes([]);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]); // <-- Ketergantungan baru

    // useEffect sekarang akan berjalan setiap kali fetchNotes dibuat ulang (yaitu saat login/logout)
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const addNote = async (noteData) => {
        setIsSaving(true);
        setError(null);
        try {
            const newNote = await createNote(noteData);
            setNotes(prev => [newNote, ...prev]);
            return newNote;
        } catch (err) {
            setError('Gagal menyimpan catatan baru.');
        } finally {
            setIsSaving(false);
        }
    };

    const editNote = async (id, noteData) => {
        setIsSaving(true);
        setError(null);
        try {
            const updatedNote = await updateNote(id, noteData);
            setNotes(prev => prev.map(n => n._id === id ? updatedNote : n));
        } catch (err) {
            setError('Gagal memperbarui catatan.');
        } finally {
            setIsSaving(false);
        }
    };

    const removeNote = async (id) => {
        setIsSaving(true);
        setError(null);
        try {
            await deleteNote(id);
            setNotes(prev => prev.filter(n => n._id !== id));
        } catch (err) {
            setError('Gagal menghapus catatan.');
        } finally {
            setIsSaving(false);
        }
    };
    
    return { notes, loading, isSaving, error, addNote, editNote, removeNote };
};

