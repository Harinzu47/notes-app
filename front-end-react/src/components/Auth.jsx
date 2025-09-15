/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login, register, loading, error, clearError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        clearError();
        if (isLogin) {
            await login(username, password);
        } else {
            try {
                const data = await register(username, password);
                setMessage(data.message + ' Silakan login.');
                setIsLogin(true); // Arahkan ke form login
            } catch (err) {
                // error sudah di-handle oleh context
            }
        }
    };

    const switchMode = () => {
        setIsLogin(prev => !prev);
        setMessage('');
        clearError();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Daftar'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Tampilkan pesan error atau sukses */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                    <button
                        type="submit"
                        disabled={loading} // Nonaktifkan tombol saat loading
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex justify-center items-center"
                    >
                        {loading ? ( // Tampilkan spinner saat loading
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            isLogin ? 'Login' : 'Daftar'
                        )}
                    </button>
                </form>
                <button onClick={switchMode} className="w-full mt-4 text-blue-600 hover:underline">
                    {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
                </button>
            </div>
        </div>
    );
}