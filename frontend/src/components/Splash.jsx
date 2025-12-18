import React, { useEffect, useState } from 'react';

export default function Splash({ onFinish }) {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 120) {
                    clearInterval(interval);
                    setVisible(false);
                    setTimeout(onFinish, 500);
                    return 120;
                }
                return prev + 4; // 🔥 faster loading
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div
            className={`flex items-center justify-center h-screen flex-col px-5
            transition-opacity duration-500
            ${visible ? 'opacity-100' : 'opacity-0'}
            splash-bg text-white`}
        >
            <div className="sm:min-w-[500px] min-w-[90%]">
                {/* Icon */}
                <div className="md:w-44 w-36 mb-10">
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

                <h1 className="md:text-5xl text-4xl font-bold mb-2">
                    EXCELlent
                </h1>

                <p className="text-lg mb-10">
                    Microsoft Excel Learning Platform
                </p>

                {/* Loading Bar */}
                <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-50 linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
