import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        // Decode JWT to get student info (simplified)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setStudent({ id: payload.id });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        {student && <p className="mt-4">Welcome, student ID: {student.id}</p>}
        <button
            onClick={logout}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Logout
        </button>
        </div>
    );
}
