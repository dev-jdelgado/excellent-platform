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
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}
            >
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

export default function FormulaSUM() {
    const steps = [
        "Select a range of numbers (ex: A1:A5)",
        "Type =SUM(",
        "Highlight the range or type it manually",
        "Press Enter to get the total",
    ];

    const tips = [
        "Use comma to separate multiple ranges: =SUM(A1:A5, C1:C5)",
        "You can mix ranges and individual cells: =SUM(A1:A3, B5)",
        "Ignores text and blank cells automatically",
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
                                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                    SUM
                                </h1>
                                <Pill tone="emerald">Math</Pill>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Adds all numbers in a range of cells
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="border-l-4 border-emerald-600 p-5">
                            <p className="font-semibold text-gray-900">Description</p>
                            <p className="mt-2 text-sm text-gray-600">
                                SUM adds numbers from selected cells or ranges and returns
                                the total.
                            </p>
                            </div>
                        </div>

                        {/* Syntax + Params */}
                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">Syntax</p>
                            <MonoBox>=SUM(number1, [number2], ...)</MonoBox>

                            <div className="mt-4">
                            <p className="font-semibold text-gray-900">Parameters</p>
                            <ul className="mt-3 space-y-3 text-sm text-gray-700">
                                <li>
                                <span className="font-mono font-semibold">number1</span>{" "}
                                <Pill>Required</Pill>
                                <p className="text-gray-600 mt-1">
                                    First number or range to add
                                </p>
                                </li>
                                <li>
                                <span className="font-mono font-semibold">number2</span>
                                <p className="text-gray-600 mt-1">
                                    Additional numbers or ranges
                                </p>
                                </li>
                            </ul>
                            </div>
                        </div>    

                        {/* Interactive Demo */}
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

                            <div className="mt-4 border rounded-xl overflow-hidden">
                                <ExcelEngine
                                    steps={excelSteps.SUM}
                                    initialData={[
                                        [10, "", "", "", ""],
                                        [20, "", "", "", ""],
                                        [30, "", "", "", ""],
                                        [40, "", "", "", ""],
                                        [50, "", "", "", ""],
                                        ["", "", "", "", ""], // RESULT A6
                                    ]}
                                />
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                            💡 Tip: Click <span className="font-semibold">A6</span> then type the formula
                            </p>
                        </div>

                        {/* Tips */}
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
