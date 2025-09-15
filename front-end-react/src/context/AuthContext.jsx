/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import { loginUser, registerUser } from '../api/service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch (error) {
            return null;
        }
    });
    
    // STATE BARU
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser({ username, password });
            const userData = { username: data.username, token: data.token };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            setError(err.response?.data?.error || 'Login gagal.');
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await registerUser({ username, password });
            return data; // Kembalikan pesan sukses
        } catch (err) {
            setError(err.response?.data?.error || 'Registrasi gagal.');
            throw err; // Lempar error agar bisa ditangkap di komponen
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        // EKSPOR STATE BARU
        loading,
        error,
        clearError: () => setError(null) // Fungsi untuk menghapus error
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

