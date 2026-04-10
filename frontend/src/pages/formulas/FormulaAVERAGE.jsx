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
        <div className="mt-2 rounded-lg bg-gray-100 px-3 py-2 text-xs sm:text-sm font-mono">
            {children}
        </div>
    );
}

export default function FormulaAVERAGE() {

    const steps = [
        "Click cell B7 (empty result cell)",
        "Type =AVERAGE(B2:B6) in the formula bar",
        "Press Enter to see the result",
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">

                    {/* Back */}
                    <Link to="/formulas" className="inline-flex items-center gap-2 text-sm font-semibold">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to all formulas
                    </Link>

                    {/* Title */}
                    <div className="mt-4">
                        <div className="flex gap-2">
                            <h1 className="text-xl sm:text-2xl font-semibold">AVERAGE</h1>
                            <Pill tone="emerald">Math</Pill>
                        </div>
                        <p className="text-sm text-gray-600">Calculates the average of numbers</p>
                    </div>

                    {/* Description */}
                    <div className="mt-6 bg-white border rounded-2xl p-5">
                        <p className="font-semibold">Description</p>
                        <p className="text-sm text-gray-600 mt-2">
                            Adds all numbers and divides by count.
                        </p>
                    </div>

                    {/* Syntax */}
                    <div className="mt-4 bg-white border rounded-2xl p-5">
                        <p className="font-semibold">Syntax</p>
                        <MonoBox>=AVERAGE(B2:B6)</MonoBox>
                    </div>

                    {/* Interactive Demo */}
                    <div className="mt-4 border border-emerald-700 bg-emerald-50 rounded-2xl p-5">

                        <div className="flex gap-2">
                            <CheckCircleIcon className="h-6 w-6 text-emerald-700" />
                            <div>
                                <p className="font-semibold">Interactive Demo</p>
                                <p className="text-sm text-gray-600">Practice the formula</p>
                            </div>
                        </div>

                        {/* Steps UI */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {steps.map((s, i) => (
                                <div key={i} className="flex gap-3 bg-white border rounded-xl p-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm">{s}</p>
                                </div>
                            ))}
                        </div>

                        {/* 🔥 Excel Engine */}
                        <div className="mt-4 border rounded-xl overflow-hidden">
                            <ExcelEngine
                                steps={excelSteps.AVERAGE}
                                initialData={[
                                    ["Student", "Grade", "", "", ""],
                                    ["John", 85, "", "", ""],
                                    ["Mary", 92, "", "", ""],
                                    ["Tom", 78, "", "", ""],
                                    ["Sarah", 88, "", "", ""],
                                    ["Mike", 95, "", "", ""],
                                    ["Average", "", "", "", ""], // ✅ RESULT CELL (B7)
                                    ["", "", "", "", ""], 
                                    ["", "", "", "", ""], 
                                    ["", "", "", "", ""], 
                                ]}
                            />
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                        💡 Tip: Click <span className="font-semibold">B7</span> then type the formula in the formula bar
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}