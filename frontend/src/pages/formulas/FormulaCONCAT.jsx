import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ExcelEngine from "../../components/ExcelEngine";
import { excelSteps } from "../../components/stepsConfig";

function Pill({ children, tone = "gray" }) {
    const tones = {
        gray: "bg-gray-100 text-gray-700 border-gray-200",
        emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    };
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
            {children}
        </span>
    );
}
function MonoBox({ children }) {
    return (
        <div className="mt-2 rounded-lg bg-gray-100 px-3 py-2 text-xs sm:text-sm text-gray-800 font-mono overflow-x-auto">
            {children}
        </div>
    );
}

export default function FormulaCONCAT() {
    const steps = [
        "Select the cell where you want the combined text",
        "Reference the first text/cell (ex: A2)",
        "Add a separator like a space \" \" if needed",
        "Reference the next text/cell (ex: B2) and press Enter",
    ];

    const tips = [
        "In Excel 365, you can use A2 & \" \" & B2 (simple and fast)",
        "CONCAT is the newer version (Excel 2019+)",
        "Use TEXTJOIN to add separators automatically for many cells",
    ];

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">
                <div className="grid grid-cols-1 gap-6">
                    <main>
                        <Link
                            to="/formulas"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-gray-900 font-semibold"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                                Back to all formulas
                        </Link>

                        <div className="mt-4">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">CONCATENATE / CONCAT</h1>
                                <Pill tone="emerald">Text</Pill>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Joins multiple text strings into one string</p>
                        </div>

                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="border-l-4 border-emerald-600 p-5">
                                <p className="font-semibold text-gray-900">Description</p>
                                <p className="mt-2 text-sm text-gray-600">
                                    CONCATENATE/CONCAT combines text from multiple cells into one result (like building a full name).
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">Syntax</p>
                            <MonoBox>
                                =CONCATENATE(text1, [text2], ...) <span className="text-gray-400">or</span> =CONCAT(text1, [text2], ...)
                            </MonoBox>

                            <div className="mt-4">
                                <p className="font-semibold text-gray-900">Parameters</p>
                                <ul className="mt-3 space-y-3 text-sm text-gray-700">
                                    <li>
                                        <span className="font-mono font-semibold">text1</span> <Pill>Required</Pill>
                                        <p className="text-gray-600 mt-1">First text string</p>
                                    </li>
                                    <li>
                                        <span className="font-mono font-semibold">text2</span> <Pill>Optional</Pill>
                                        <p className="text-gray-600 mt-1">Additional text strings</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-emerald-700 bg-emerald-50 shadow-sm p-5">
                            <div className="flex items-start gap-2">
                                <CheckCircleIcon className="h-6 w-6 text-emerald-700" />
                                <div>
                                    <p className="font-semibold text-gray-900">Interactive Demo</p>
                                    <p className="text-sm text-gray-600">Follow these steps to practice</p>
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

                            {/* Excel Engine */}
                            <div className="mt-4 border rounded-xl overflow-hidden">
                                <ExcelEngine
                                    steps={excelSteps.CONCAT}
                                    initialData={[
                                        ["First Name", "Last Name", "Full Name", "", ""],
                                        ["John", "Doe", "", "", ""],
                                        ["Jane", "Smith", "", "", ""],
                                        ["", "", "", "", ""],
                                    ]}
                                />
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                            💡 Tip: Click <span className="font-semibold">C2</span> then type the formula
                            </p>
                        </div>

                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">Tips &amp; Best Practices</p>
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
