import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
    const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            alert('Registered successfully!');
            navigate('/login');
        } catch (err) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-excel-50">
            <form
                onSubmit={submit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">
                    EXCELLENT Register
                </h1>

                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-excel-500"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    required
                />

                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-excel-500"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    required
                />

                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-excel-500"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-excel-500"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-excel-500 hover:bg-excel-600 text-white font-semibold py-2 rounded transition-colors mb-4"
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-full border border-excel-500 hover:bg-excel-500 hover:text-white text-excel-500 font-semibold py-2 rounded transition-colors"
                >
                    Go to Login
                </button>
            </form>
        </div>
    );
}
