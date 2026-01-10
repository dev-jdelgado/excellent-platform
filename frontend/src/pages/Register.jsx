import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        grade_level: '',
        excel_expertise: ''
    });
    const [loading, setLoading] = useState(false); // <-- button loading
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(form);
    
            // Show success toast
            toast.success('Registered successfully! Redirecting to Login page');
    
            // Small delay to show toast before navigating
            setTimeout(() => {
                setLoading(false);
                navigate('/login');
            }, 2000); 
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error(err.response.data.message); // "Email already registered"
            } else {
                toast.error('Registration failed. Please try again.');
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
                className="bg-white sm:px-8 px-5 py-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center mx-4"
            >
                <div className="w-20 mb-4">
                    <img src="./EXCELlent-Icon-Transparent.png" alt="logo" />
                </div>

                <h1 className="sm:text-3xl text-xl font-bold text-black mb-6 text-center">
                    Welcome to EXCELLENT!
                </h1>

                {/* Name */}
                <div className="w-full mb-4">
                    <label className="font-semibold mb-1 block">Name</label>
                    <input
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                {/* Email */}
                <div className="w-full mb-4">
                    <label className="font-semibold mb-1 block">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                {/* Password */}
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

                {/* Grade Level */}
                <div className="w-full mb-4">
                    <label className="font-semibold mb-1 block">Grade Level</label>
                    <select
                        className="w-full px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        value={form.grade_level}
                        onChange={(e) => setForm({ ...form, grade_level: e.target.value })}
                        required
                    >
                        <option value="">Select grade level</option>
                        <option value="Elementary">Elementary</option>
                        <option value="Junior High">Junior High</option>
                        <option value="Senior High">Senior High</option>
                        <option value="College">College</option>
                    </select>
                </div>

                {/* Excel Expertise */}
                <div className="w-full mb-6">
                    <label className="font-semibold mb-1 block">Excel Expertise</label>
                    <select
                        className="w-full px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        value={form.excel_expertise}
                        onChange={(e) => setForm({ ...form, excel_expertise: e.target.value })}
                        required
                    >
                        <option value="">Select expertise level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded transition-colors flex justify-center items-center gap-2 mb-4"
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
                            Registering...
                        </>
                    ) : (
                        'Register'
                    )}
                </button>

                {/* Go to Login */}
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 rounded transition-colors"
                >
                    Go to Login
                </button>
            </form>
        </div>
    );
}
