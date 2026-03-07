import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
    ChevronRightIcon,
    ArrowLeftIcon,
    PlayCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function VideoTutorials() {

    const [activeVideo, setActiveVideo] = useState(null);

    const videos = [
        {
            title: "Charts and Graphs",
            description: "Learn how to create charts and visualize your data",
            src: "/videos/charts-and-graph.mp4",
        },
        {
            title: "Formatting Tools",
            description: "Format cells, text, and tables",
            src: "/videos/formatting-tools.mp4",
        },
        {
            title: "Sorting and Filtering",
            description: "Organize Excel data efficiently",
            src: "/videos/sorting-filtering.mov",
        },
        {
            title: "Excel Overview",
            description: "Introduction to Excel workspace",
            src: "/videos/introduction.mp4",
        },
    ];

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">

                <main>
                    {/* Back button */}
                    <Link
                        to="/excel-tools"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-gray-900 font-semibold"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to learning
                    </Link>

                    {/* Title block */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white border border-emerald-100">
                            <PlayCircleIcon className="h-7 w-7" />
                        </div>

                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                Video Tutorials
                            </h1>
                            <p className="text-sm text-gray-600">
                                Watch step-by-step Excel lessons
                            </p>
                        </div>
                    </div>

                    {/* Video cards */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {videos.map((v) => (
                            <button
                                key={v.title}
                                onClick={() => setActiveVideo(v)}
                                className="group text-left rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-4 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900">
                                            {v.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {v.description}
                                        </p>
                                    </div>

                                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 shrink-0" />
                                </div>
                            </button>
                        ))}
                    </div>
                </main>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="relative w-full max-w-7xl rounded-2xl bg-white shadow-lg">

                        {/* Close button */}
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-3">
                                {activeVideo.title}
                            </h2>

                            <video
                                key={activeVideo?.src}
                                controls
                                autoPlay
                                className="w-full rounded-lg max-h-[75vh]"
                            >
                                <source src={activeVideo?.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                    </div>
                </div>
            )}

        </div>
        </>
    );
}