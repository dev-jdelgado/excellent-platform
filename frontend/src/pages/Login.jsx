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
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div class="flex items-center justify-center min-h-screen bg-background">
            <form
                onSubmit={submit}
                class="bg-white sm:px-8 py-8 px-5 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center mx-4"
            >
                <div class="w-20 mb-4">
                    <img src="./EXCELlent-Icon-Transparent.png"/>
                </div>
                <h1 class="sm:text-3xl text-xl font-bold text-black mb-6 text-center">
                    Welcome to EXCELLENT!
                </h1>

                <div class="w-full">
                    <div class="flex flex-row items-center gap-1 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <label class="font-semibold">Email</label>
                    </div>
                    <input
                        class="w-full mb-4 px-3 py-2 border rounded
                            focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    />
                </div>

                <button
                    type="submit"
                    class="w-full bg-primary hover:bg-secondary text-white
                        font-semibold py-2 rounded transition-colors mb-4"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    class="w-full border border-primary text-primary
                        hover:bg-primary hover:text-white
                        font-semibold py-2 rounded transition-colors"
                >
                    Go to Register
                </button>
            </form>
        </div>
    );
}
