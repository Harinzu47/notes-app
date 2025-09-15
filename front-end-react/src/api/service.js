/* eslint-disable no-unused-vars */
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api'
});

// Interceptor untuk menambahkan token ke setiap request
apiClient.interceptors.request.use((config) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    } catch (error) {
        // Abaikan jika ada error parsing, request akan dikirim tanpa token
    }
    return config;
});

// --- FUNGSI-FUNGSI DIPERBAIKI UNTUK MENGEMBALIKAN response.data ---

export const loginUser = async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
};

export const getNotes = async () => {
    const response = await apiClient.get('/notes');
    return response.data;
};

export const createNote = async (noteData) => {
    const response = await apiClient.post('/notes', noteData);
    return response.data;
};

export const updateNote = async (id, noteData) => {
    const response = await apiClient.put(`/notes/${id}`, noteData);
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
};

