import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
    const { logout } = useAuth();

    return (
        <div className="flex flex-col h-screen font-sans bg-gray-100">
            <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-800">Aplikasi Catatan</h1>
                <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                    Logout
                </button>
            </header>
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
