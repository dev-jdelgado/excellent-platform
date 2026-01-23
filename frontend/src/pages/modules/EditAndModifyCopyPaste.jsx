import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function EditAndModifyCopyPaste() {
    const steps = [
        "Select cells'",
        "Ctrl+C to copy",
        "Select destination",
        "Ctrl+V to paste",
    ];

    const tips = [
        "Practice this feature multiple times to build muscle memory",
        "Use keyboard shortcuts for faster workflow",
        "Experiment with different options to understand all possibilities",
    ];

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            {/* Content */}
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">
                <div className="grid grid-cols-1 gap-6">
                    <main>
                        {/* Back */}
                        <Link
                            to="/modules/edit-modify"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-gray-900 font-semibold"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Edit & Modify
                        </Link>

                        {/* Title */}
                        <div className="mt-4">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                Copy & Paste
                            </h1>
                        </div>

                        {/* What is */}
                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="border-l-4 border-emerald-600 p-5">
                                <p className="font-semibold text-gray-900">
                                    What is Copy & Paste
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Copy cells and paste with different options
                                </p>
                            </div>
                        </div>

                        {/* Interactive demo */}
                        <div className="mt-4 rounded-2xl border border-emerald-700 bg-emerald-50 shadow-sm p-5">
                            <div className="flex items-start gap-2">
                                <CheckCircleIcon className="h-6 w-6 text-emerald-700" />
                                <div>
                                    <p className="font-semibold text-gray-900">Interactive Demo</p>
                                    <p className="text-sm text-gray-600">
                                        Follow these steps to practice
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {steps.map((s, i) => (
                                    <div
                                    key={i}
                                    className="flex items-center gap-3 rounded-xl bg-white/80 border border-emerald-100 px-4 py-3"
                                    >
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-semibold shrink-0">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-gray-800">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">
                                Tips &amp; Best Practices
                            </p>

                            <ul className="mt-3 space-y-2 text-sm text-gray-700">
                                {tips.map((t, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        </>
    );
}
