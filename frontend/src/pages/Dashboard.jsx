import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setStudent({
            id: payload.id,
            name: payload.name
        });
        }
    }, []);

    return (
        <>
        <Navbar />

        <div className="max-w-4xl mx-auto mt-20 text-center">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>

            {student && (
                <p className="mt-4">
                    Welcome, <span className="font-semibold">{student.name}</span>
                </p>
            )}
        </div>
        </>
    );
}
