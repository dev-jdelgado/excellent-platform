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

export default function FormulaIF() {
    const steps = [
        "Write a logical test (ex: B2>=60)",
        "Choose what to return when TRUE (ex: \"Pass\")",
        "Choose what to return when FALSE (ex: \"Fail\")",
        "Press Enter and copy down if needed",
    ];

    const tips = [
        "Use quotes around text values like \"Pass\"",
        "You can nest multiple IF statements for complex logic",
        "Consider IFS for multiple conditions (Excel 2019+)",
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
                                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">IF</h1>
                                <Pill tone="emerald">Logical</Pill>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Returns one value if condition is TRUE, another if FALSE
                            </p>
                        </div>

                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="border-l-4 border-emerald-600 p-5">
                                <p className="font-semibold text-gray-900">Description</p>
                                <p className="mt-2 text-sm text-gray-600">
                                    IF checks a condition (logical test). If it’s TRUE, it returns one value; if FALSE, it returns another.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">Syntax</p>
                            <MonoBox>=IF(logical_test, value_if_true, value_if_false)</MonoBox>

                            <div className="mt-4">
                                <p className="font-semibold text-gray-900">Parameters</p>
                                <ul className="mt-3 space-y-3 text-sm text-gray-700">
                                    <li>
                                        <span className="font-mono font-semibold">logical_test</span> <Pill>Required</Pill>
                                        <p className="text-gray-600 mt-1">Condition to evaluate</p>
                                    </li>
                                    <li>
                                        <span className="font-mono font-semibold">value_if_true</span> <Pill>Required</Pill>
                                        <p className="text-gray-600 mt-1">Value returned if condition is TRUE</p>
                                    </li>
                                    <li>
                                        <span className="font-mono font-semibold">value_if_false</span> <Pill>Required</Pill>
                                        <p className="text-gray-600 mt-1">Value returned if condition is FALSE</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                            <p className="font-semibold text-gray-900">Example</p>
                            <p className="text-sm text-gray-600 mt-1">Sample Data</p>

                            <div className="mt-3 overflow-hidden bg-white">
                                <div className="overflow-auto">
                                    <table className="border border-gray-300 max-w-xl w-full text-sm border-separate border-spacing-0">
                                        {/* Excel-like column headers */}
                                        <thead className="sticky top-0 z-10">
                                            <tr>
                                                {/* top-left corner */}
                                                <th className="sticky left-0 z-20 w-14 border-b border-r border-gray-300 bg-primary" />
                                                <th className="border-b border-gray-300 bg-primary px-3 py-2 text-center font-semibold text-white">
                                                    A
                                                </th>
                                                <th className="border-b border-gray-300 bg-primary px-3 py-2 text-center font-semibold text-white">
                                                    B
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {[
                                                ["1", "Student", "Score"],
                                                ["2", "Alice", "75"],
                                                ["3", "Bob", "45"],
                                            ].map(([row, colA, colB]) => (
                                            <tr key={row}>
                                                {/* Excel-like row headers */}
                                                <th className="sticky left-0 z-10 w-1/4 border-b border-r border-gray-300 bg-primary px-2 py-2 text-center font-semibold text-white">
                                                    {row}
                                                </th>

                                                {/* Column A */}
                                                <td className="border-b border-r border-gray-300 px-3 py-2 text-left">
                                                    {colA}
                                                </td>

                                                {/* Column B (numbers look better right-aligned) */}
                                                <td className="border-b border-r border-gray-300 px-3 py-2 font-mono tabular-nums">
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
                                <MonoBox>=IF(B2&gt;=60, "Pass", "Fail")</MonoBox>
                            </div>

                            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                                <p className="text-sm text-gray-700">Result</p>
                                <p className="mt-1 font-semibold text-emerald-900">Pass / Fail</p>
                            </div>

                            <p className="mt-3 text-sm text-gray-600">
                                Returns <span className="font-mono">"Pass"</span> if score is 60 or above, otherwise <span className="font-mono">"Fail"</span>.
                            </p>
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
