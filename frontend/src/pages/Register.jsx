import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        grade_level: '',
        excel_expertise: ''
    });

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
        <div class="flex items-center justify-center min-h-screen bg-background">
            <form
                onSubmit={submit}
                class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center"
            >
                <div className="w-16 mb-4 bg-primary rounded-2xl p-2 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                </div>
                <h1 class="text-3xl font-bold text-black mb-6 text-center">
                    Welcome to EXCELent!
                </h1>
                <div class="w-full">
                    <div class="flex flex-row items-center gap-1 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <label class="font-semibold">Name</label>
                    </div>
                    <input
                        class="w-full mb-4 px-3 py-2 border rounded
                            focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div class="w-full">
                    <div class="flex flex-row items-center gap-1 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <label class="font-semibold">Email</label>
                    </div>
                    <input
                        type="email"
                        class="w-full mb-4 px-3 py-2 border rounded
                            focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div class="w-full">
                    <div class="flex flex-row items-center gap-1 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>

                        <label class="font-semibold">Password</label>
                    </div>
                    <input
                        type="password"
                        class="w-full mb-6 px-3 py-2 border rounded
                            focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>

                <div className="w-full">
                    <div className="flex flex-row items-center gap-1 mb-1">
                        <label className="font-semibold">Grade Level</label>
                    </div>

                    <select
                        className="w-full mb-4 px-2 py-2 border rounded
                            focus:outline-none focus:ring-2 focus:ring-primary"
                        value={form.grade_level}
                        onChange={(e) =>
                            setForm({ ...form, grade_level: e.target.value })
                        }
                        required
                    >
                        <option value="">Select grade level</option>
                        <option value="Elementary">Elementary</option>
                        <option value="Junior High">Junior High</option>
                        <option value="Senior High">Senior High</option>
                        <option value="College">College</option>
                    </select>
                </div>

                <div className="w-full">
                    <div className="flex flex-row items-center gap-1 mb-1">
                        <label className="font-semibold">Excel Expertise</label>
                    </div>

                    <select
                        className="w-full mb-6 px-2 py-2 border rounded
                            focus:outline-none focus:ring-2 focus:ring-primary"
                        value={form.excel_expertise}
                        onChange={(e) =>
                            setForm({ ...form, excel_expertise: e.target.value })
                        }
                        required
                    >
                        <option value="">Select expertise level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <button
                    type="submit"
                    class="w-full bg-primary hover:bg-secondary text-white
                        font-semibold py-2 rounded transition-colors mb-4"
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    class="w-full border border-primary text-primary
                        hover:bg-primary hover:text-white
                        font-semibold py-2 rounded transition-colors"
                >
                    Go to Login
                </button>
            </form>
        </div>
    );
}
