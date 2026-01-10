import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        try {
            const res = await login(form);
            const { token, student } = res.data;
            localStorage.setItem('token', token);

            // Show toast for successful login
            toast.success('Login successful! Redirecting...');

            // Small delay to show toast before navigation
            setTimeout(() => {
                setLoading(false);
                if (student.is_completed_preassessment) {
                    navigate('/dashboard');
                } else {
                    navigate('/pre-assessment');
                }
            }, 2000); // 2 second delay
        } catch (err) {
            // Show proper toast for invalid credentials
            if (err.response?.status === 401) {
                toast.error('Invalid email or password!');
            } else {
                toast.error('Login failed. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            {/* Toast container */}
            <Toaster position="top-right" reverseOrder={false} />

            <form
                onSubmit={submit}
                className="bg-white sm:px-8 py-8 px-5 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center mx-4"
            >
                <div className="w-20 mb-4">
                    <img src="./EXCELlent-Icon-Transparent.png" alt="logo" />
                </div>
                <h1 className="sm:text-3xl text-xl font-bold text-black mb-6 text-center">
                    Welcome to EXCELLENT!
                </h1>

                <div className="w-full mb-4">
                    <label className="font-semibold mb-1 block">Email</label>
                    <input
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div className="w-full mb-6">
                    <label className="font-semibold mb-1 block">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded transition-colors mb-4 flex justify-center items-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
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
