import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

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

export default function FormulaCOUNTIF() {
    const steps = [
        "Choose the range to check (ex: B2:B10)",
        "Write your criteria (ex: \">80\")",
        "Enter the formula using COUNTIF(range, criteria)",
        "Press Enter and review the count result",
    ];

    const tips = [
        "Use quotes for text criteria like \"Apple\"",
        "Supports wildcards: \"*apple*\" matches any text containing apple",
        "Use COUNTIFS for multiple conditions",
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
                                COUNTIF
                            </h1>
                            <Pill tone="emerald">Statistical</Pill>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                            Counts cells that meet a specific condition
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="border-l-4 border-emerald-600 p-5">
                            <p className="font-semibold text-gray-900">Description</p>
                            <p className="mt-2 text-sm text-gray-600">
                                COUNTIF counts how many cells in a range match a condition,
                                like values greater than 80 or text that contains a specific word.
                            </p>
                            </div>
                        </div>

                        {/* Syntax + Params */}
                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">Syntax</p>
                            <MonoBox>=COUNTIF(range, criteria)</MonoBox>

                            <div className="mt-4">
                            <p className="font-semibold text-gray-900">Parameters</p>
                            <ul className="mt-3 space-y-3 text-sm text-gray-700">
                                <li>
                                <span className="font-mono font-semibold">range</span>{" "}
                                <Pill>Required</Pill>
                                <p className="text-gray-600 mt-1">
                                    Range of cells to count
                                </p>
                                </li>
                                <li>
                                <span className="font-mono font-semibold">criteria</span>{" "}
                                <Pill>Required</Pill>
                                <p className="text-gray-600 mt-1">
                                    Condition that determines which cells to count (ex:
                                    <span className="font-mono"> "&gt;80"</span>,{" "}
                                    <span className="font-mono">"Apple"</span>)
                                </p>
                                </li>
                            </ul>
                            </div>
                        </div>

                        {/* Example */}
                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">Example</p>
                            <p className="text-sm text-gray-600 mt-1">Sample Data</p>

                            <div className="mt-3 overflow-hidden bg-white">
                                <div className="overflow-auto">
                                    <table className="border border-gray-300 max-w-xl w-full text-sm border-separate border-spacing-0">
                                        {/* Excel column headers */}
                                        <thead className="sticky top-0 z-10">
                                            <tr>
                                                {/* top-left corner */}
                                                <th className="sticky left-0 z-20 w-1/4 border-b border-r border-gray-300 bg-primary" />
                                                <th className="border-b border-gray-300 bg-primary px-3 py-2 text-left font-semibold text-white">
                                                    A
                                                </th>
                                                <th className="border-b border-gray-300 bg-primary px-3 py-2 text-left font-semibold text-white">
                                                    B
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {[
                                                ["1", "Student", "Score"],
                                                ["2", "A", "85"],
                                                ["3", "B", "75"],
                                                ["4", "C", "90"],
                                            ].map(([row, colA, colB]) => (
                                            <tr key={row}>
                                                {/* Excel row header */}
                                                <th className="sticky left-0 z-10 w-1/4 border-b border-r border-gray-300 bg-primary px-2 py-2 text-left font-semibold text-white">
                                                    {row}
                                                </th>

                                                {/* Column A */}
                                                <td className="border-b border-r border-gray-300 px-3 py-2 text-left">
                                                    {colA}
                                                </td>

                                                {/* Column B — LEFT aligned as requested */}
                                                <td className="border-b border-r border-gray-300 px-3 py-2 text-left">
                                                    {colB}
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-900">Formula</p>
                                <MonoBox>=COUNTIF(B2:B10, "&gt;80")</MonoBox>
                            </div>

                            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                                <p className="text-sm text-gray-700">Result</p>
                                <p className="mt-1 font-semibold text-emerald-900">2</p>
                            </div>

                            <p className="mt-3 text-sm text-gray-600">
                                Counts how many scores are greater than 80 (85 and 90).
                            </p>
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
