import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            const { token, student } = res.data;
            localStorage.setItem('token', token);

            if (student.is_completed_preassessment) {
                navigate('/dashboard');
            } else {
                navigate('/pre-assessment');
            }
        } catch (err) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <form
                onSubmit={submit}
                className="bg-white sm:px-8 py-8 px-5 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center mx-4"
            >
                <div className="w-20 mb-4">
                    <img src="./EXCELlent-Icon-Transparent.png" />
                </div>
                <h1 className="sm:text-3xl text-xl font-bold text-black mb-6 text-center">
                    Welcome to EXCELLENT!
                </h1>

                <div className="w-full">
                    <label className="font-semibold mb-1">Email</label>
                    <input
                        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="w-full">
                    <label className="font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded transition-colors mb-4"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="w-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 rounded transition-colors"
                >
                    Go to Register
                </button>
            </form>
        </div>
    );
}
