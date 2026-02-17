import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  LightBulbIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

/* ---------- Pill ---------- */
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

/* ---------- Difficulty Tone ---------- */
function difficultyTone(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "gray";
    case "Medium":
      return "amber";
    case "Hard":
      return "rose";
    default:
      return "gray";
  }
}

/* ---------- Activity Page ---------- */
export default function ActivityPage({
  no,
  title,          // ✅ Activity name restored
  tip,            // ✅ Tip text restored
  difficulty,
  scenario,
  letters,
  sheetHeaders,
  rows,
  tableMaxWidth = "max-w-2xl",
  placeholder,
  hintTitle = "Hint",
  hintBody,
  hintFormula,
  onCheck,
}) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState(null);

  function handleSubmit() {
    const res = onCheck?.(answer) || {
      ok: false,
      message: "No checker configured.",
    };
    setResult(res);
  }

  function handleReset() {
    setAnswer("");
    setShowHint(false);
    setResult(null);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">
          <main>
            {/* Back */}
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-gray-900 font-semibold"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to all activities
            </Link>

            {/* ---------- TITLE (FIXED) ---------- */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Activity {no}: {title}
                </h1>
                <Pill tone={difficultyTone(difficulty)}>{difficulty}</Pill>
              </div>

              {tip && (
                <p className="text-sm text-gray-600 mt-1">
                  {tip}
                </p>
              )}
            </div>

            {/* ---------- Scenario ---------- */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-l-4 border-emerald-600 p-5">
                <p className="font-semibold text-gray-900">Scenario</p>
                <div className="mt-2 text-sm text-gray-600">{scenario}</div>
              </div>
            </div>

            {/* ---------- Sample Data ---------- */}
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
              <p className="font-semibold text-gray-900">Sample Data</p>
              <p className="text-sm text-gray-600 mt-1">
                Work with this data to solve the problem
              </p>

              <div className="mt-3 overflow-auto">
                <table
                  className={`border border-gray-300 ${tableMaxWidth} w-full text-sm border-separate border-spacing-0`}
                >
                  <thead>
                    <tr>
                      <th className="w-14 border-b border-r border-gray-300 bg-primary" />
                      {letters.map((L) => (
                        <th
                          key={L}
                          className="border-b border-gray-300 bg-primary px-3 py-2 text-center font-semibold text-white"
                        >
                          {L}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th className="border-b border-r border-gray-300 bg-primary px-2 py-2 text-center font-semibold text-white">
                        1
                      </th>
                      {sheetHeaders.map((h, i) => (
                        <td
                          key={i}
                          className="border-b border-r border-gray-300 px-3 py-2 font-semibold"
                        >
                          {h}
                        </td>
                      ))}
                    </tr>

                    {rows.map((r) => (
                      <tr key={r.row}>
                        <th className="border-b border-r border-gray-300 bg-primary px-2 py-2 text-center font-semibold text-white">
                          {r.row}
                        </th>
                        {r.cells.map((c, i) => (
                          <td
                            key={i}
                            className="border-b border-r border-gray-300 px-3 py-2"
                          >
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ---------- Solution ---------- */}
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
              <p className="font-semibold text-gray-900">Your Solution</p>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                placeholder={placeholder}
                className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-600"
              />

              <div className="mt-4 flex gap-3 flex-wrap">
                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Submit Answer
                </button>

                <button
                  onClick={handleReset}
                  className="rounded-xl border px-5 py-2.5 text-sm font-semibold"
                >
                  Reset
                </button>

                <button
                  onClick={() => setShowHint((v) => !v)}
                  className="ml-auto rounded-xl border px-5 py-2.5 text-sm font-semibold"
                >
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
              </div>

              {result && (
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 flex gap-3 ${
                    result.ok
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-rose-200 bg-rose-50"
                  }`}
                >
                  {result.ok ? (
                    <CheckCircleIcon className="h-5 w-5 text-emerald-700" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-rose-700" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {result.ok ? "Nice!" : "Try again"}
                    </p>
                    <p className="text-sm">{result.message}</p>
                  </div>
                </div>
              )}
            </div>

            {/* ---------- Hint ---------- */}
            {showHint && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex gap-2">
                  <LightBulbIcon className="h-6 w-6 text-amber-700" />
                  <div>
                    <p className="font-semibold">{hintTitle}</p>
                    <p className="text-sm mt-1">{hintBody}</p>
                    {hintFormula && (
                      <code className="mt-2 inline-block rounded bg-white px-3 py-1 text-sm">
                        {hintFormula}
                      </code>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
