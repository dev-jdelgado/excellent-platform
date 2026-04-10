import React from "react";
import ExcelEngine from "../components/ExcelEngine";

export default function ExcelDemoWrapper({ title, steps }) {
    return (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow overflow-hidden">
        <div className="border-l-4 border-emerald-600 p-5">
            <p className="font-semibold text-gray-900">{title} — Interactive Practice</p>
            <p className="text-sm text-gray-600 mt-1">
            Follow the guided steps below inside the Excel simulator.
            </p>
        </div>
        <div className="p-5 bg-gray-50">
            <ExcelEngine steps={steps} />
        </div>
        </div>
    );
}
