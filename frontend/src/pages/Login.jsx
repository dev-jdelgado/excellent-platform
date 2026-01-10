import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false); // <-- new
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        try {
            const res = await login(form);
            const { token, student } = res.data;
            localStorage.setItem('token', token);
    
            // Stop loading before navigating
            setLoading(false);
    
            if (student.is_completed_preassessment) {
                navigate('/dashboard');
            } else {
                navigate('/pre-assessment');
            }
        } catch (err) {
            alert('Login failed. Please check your credentials.');
            setLoading(false); // stop loading on error
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
                    disabled={loading} // <-- disable while loading
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
