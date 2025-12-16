import React, { useEffect, useState } from 'react';

export default function Splash({ onFinish }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Fade in
        setVisible(true);

        // Fade out after 2.5 seconds
        const timer = setTimeout(() => {
        setVisible(false);
        }, 2500);

        // Call onFinish after fade-out
        const finishTimer = setTimeout(() => {
        onFinish();
        }, 3000); // fade-out duration: 500ms

        return () => {
        clearTimeout(timer);
        clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div
        className={`flex items-center justify-center h-screen flex-col transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: '#217346' }} // Excel green
        >
            {/* Optional Excel icon or accent box */}
            <div
                className="mt-6 h-16 rounded bg-green-700 animate-spin-slow"
                style={{ border: '4px solid #43A047' }}
            >SAMPLE ICON HERE</div>
            <h1
                className="text-5xl font-extrabold mb-4 animate-bounce"
                style={{ color: '#ffffff' }} // White text
            >
                EXCELLENT
            </h1>
            <p
                className="text-xl animate-pulse"
                style={{ color: '#D6EAF8' }} // Soft light accent
            >
                Interactive Excel Learning Platform
            </p>

        </div>
    );
}
