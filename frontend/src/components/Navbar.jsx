import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="splash-bg text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-wide">
                EXCELLENT
            </h1>

            <div className="flex items-center gap-4">
            <button
                onClick={() => navigate('/dashboard')}
                className="hover:underline"
            >
                Dashboard
            </button>

            <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
            </div>
        </div>
        </nav>
    );
}
