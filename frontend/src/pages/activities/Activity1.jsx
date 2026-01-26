import React, { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import {
    ArrowLeftIcon,
    LightBulbIcon,
    CheckCircleIcon,
    XCircleIcon,
    } from "@heroicons/react/24/outline";

function Pill({ children, tone = "gray" }) {
    const tones = {
        gray: "bg-gray-100 text-gray-700 border-gray-200",
        emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
        amber: "bg-amber-50 text-amber-800 border-amber-200",
        rose: "bg-rose-50 text-rose-800 border-rose-200",
    };
    return (
        <span
        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}
        >
        {children}
        </span>
    );
}

export default function Activity1() {
    const sampleRows = useMemo(
        () => [
            ["2", "Laptop", "25000"],
            ["3", "Mouse", "1200"],
            ["4", "Keyboard", "3500"],
            ["5", "Monitor", "18000"],
        ],
        []
    );

    const totalSales = 25000 + 1200 + 3500 + 18000; // 47700
    const highestProduct = "Laptop";
    const acceptedTotalFormulas = useMemo(
        () => new Set(["=sum(b2:b5)", "=sum(b2:b5) ", "=sum(b2:b5)\n"]),
        []
    );

    const [answer, setAnswer] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [result, setResult] = useState(null); // { ok: boolean, message: string }

    function normalize(s) {
        return (s || "").trim().toLowerCase();
    }

    function handleSubmit() {
        const raw = answer.trim();
        const norm = normalize(raw);

        // Accept if user provides:
        // - Total only: "47700" OR "=SUM(B2:B5)"
        // - OR both total + highest product anywhere in the text
        const hasTotalNumber = raw.replace(/[, ]/g, "").includes(String(totalSales));
        const hasTotalFormula = acceptedTotalFormulas.has(norm);
        const hasHighest = norm.includes(normalize(highestProduct));

        // If they gave total (number OR formula), pass. If they also included highest product, show stronger pass.
        if (hasTotalNumber || hasTotalFormula) {
        if (hasHighest) {
            setResult({
                ok: true,
                message: `Correct! Total sales = ${totalSales} and highest sales product = ${highestProduct}.`,
                });
        } else {
            setResult({
                ok: true,
                message: `Correct total sales! Total = ${totalSales}. (Bonus: highest sales product is ${highestProduct}.)`,
            });
        }
        return;
        }

        // If they only typed the highest product, guide them.
        if (hasHighest) {
            setResult({
                ok: false,
                message: `You got the highest product (${highestProduct}) — now compute the total sales. Try =SUM(B2:B5).`,
            });
            return;
        }

        setResult({
            ok: false,
            message:
                "Not quite. Try summing the Sales column (B2:B5). You can type the formula or the final total.",
        });
    }

    function handleReset() {
        setAnswer("");
        setResult(null);
        setShowHint(false);
    }

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">
                <div className="grid grid-cols-1 gap-6">
                    <main>
                    <Link
                        to="/activities"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-gray-900 font-semibold"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                            Back to all activities
                    </Link>

                    {/* Title */}
                    <div className="mt-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                Activity 1
                            </h1>
                            <Pill tone="gray">Easy</Pill>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Calculate total sales
                        </p>
                    </div>

                    {/* Scenario */}
                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-l-4 border-emerald-600 p-5">
                        <p className="font-semibold text-gray-900">Scenario</p>
                        <p className="mt-2 text-sm text-gray-600">
                            Calculate the total sales from all products and find which
                            product has the highest sales.
                        </p>
                        </div>
                    </div>

                    {/* Sample Data */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                        <p className="font-semibold text-gray-900">Sample Data</p>
                        <p className="text-sm text-gray-600 mt-1">
                            Work with this data to solve the problem
                        </p>

                        <div className="mt-3 overflow-hidden bg-white">
                            <div className="overflow-auto">
                                <table className="border border-gray-300 max-w-xl w-full text-sm border-separate border-spacing-0">
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
                                        {/* Row 1 (headers inside the sheet) */}
                                        <tr>
                                            <th className="sticky left-0 z-10 border-b border-r border-gray-300 bg-primary px-2 py-2 text-center font-semibold text-white">
                                                1
                                            </th>
                                            <td className="border-b border-r border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">
                                                Product
                                            </td>
                                            <td className="border-b border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">
                                                Sales
                                            </td>
                                        </tr>

                                        {sampleRows.map(([row, product, sales]) => (
                                        <tr key={row}>
                                            <th className="sticky left-0 z-10 border-b border-r border-gray-300 bg-primary px-2 py-2 text-center font-semibold text-white">
                                                {row}
                                            </th>

                                            <td className="border-b border-r border-gray-300 px-3 py-2 text-left text-gray-800">
                                                {product}
                                            </td>

                                            <td className="border-b border-gray-300 px-3 py-2 text-left text-gray-800">
                                                {sales}
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Your Solution */}
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                        <p className="font-semibold text-gray-900">Your Solution</p>
                        <p className="text-sm text-gray-600 mt-1">
                            Write your formula or answer below
                        </p>

                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={4}
                            placeholder='Type your formula or answer here (e.g., =SUM(B2:B5) or just the result)'
                            className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                            >
                                Submit Answer
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                            >
                                Reset
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowHint((v) => !v)}
                                className="sm:ml-auto inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                            >
                                {showHint ? "Hide Hint" : "Show Hint"}
                            </button>
                        </div>

                        {/* Result feedback */}
                        {result && (
                        <div
                            className={[
                            "mt-4 rounded-xl border px-4 py-3 flex gap-3",
                            result.ok
                                ? "border-emerald-200 bg-emerald-50"
                                : "border-rose-200 bg-rose-50",
                            ].join(" ")}
                        >
                            {result.ok ? (
                                <CheckCircleIcon className="h-5 w-5 text-emerald-700 mt-0.5" />
                                ) : (
                                <XCircleIcon className="h-5 w-5 text-rose-700 mt-0.5" />
                            )}
                            <div>
                                <p
                                    className={[
                                    "text-sm font-semibold",
                                    result.ok ? "text-emerald-900" : "text-rose-900",
                                    ].join(" ")}
                                >
                                    {result.ok ? "Nice!" : "Try again"}
                                </p>
                                <p
                                    className={[
                                    "text-sm mt-0.5",
                                    result.ok ? "text-emerald-900/80" : "text-rose-900/80",
                                    ].join(" ")}
                                >
                                    {result.message}
                                </p>
                            </div>
                        </div>
                        )}
                    </div>

                    {/* Hint (toggle) */}
                    {showHint && (
                        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 shadow-sm p-5">
                            <div className="flex items-start gap-2">
                                <LightBulbIcon className="h-6 w-6 text-amber-700" />
                                <div>
                                    <p className="font-semibold text-gray-900">Hint</p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        Try using the <span className="font-semibold">SUM</span>{" "}
                                        function for the range <span className="font-mono">B2:B5</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    </main>
                </div>
            </div>
        </div>
        </>
    );
}
