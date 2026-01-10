import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";


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
                        onClick={logout}
                        className="flex justify-center items-center gap-1 font-semibold text-white hover:text-gray-300 transition"
                    >
                        <ArrowDownTrayIcon className="w-6 h-6 rotate-90" />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
