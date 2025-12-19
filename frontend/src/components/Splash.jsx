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
                <div className="md:w-56 w-36 mb-6">
                    <img src="./EXCELlent-Icon-Transparent.png"/>
                </div>

                <h1 className="md:text-5xl text-4xl font-bold mb-2">
                    EXCELLENT
                </h1>

                <p className="text-lg mb-10">
                    LEARN • MASTER • GROW
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
