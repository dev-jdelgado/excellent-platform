import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import ExcelEngine from "../../components/ExcelEngine";

/* ---------- Pill ---------- */
function Pill({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function difficultyTone(difficulty) {
  if (difficulty === "Medium") return "amber";
  if (difficulty === "Hard") return "rose";
  return "gray";
}

const initialData = [
  ["Lecture Component", "Score", "Weight", "Lab Component", "Score", "Weight", "", ""],
  ["Performance Output", "90", "40%", "Performance Output", "92", "40%", "", ""],
  ["Major Exam", "85", "30%", "Major Assessment", "88", "30%", "", ""], 
  ["Quiz", "80", "15%", "Peer Assessment", "90", "15%", "", ""],
  ["Recitation", "95", "15%", "Practice", "94", "15%", "", ""], 
  ["Lecture Total", "", "100%", "Lab Total", "", "100%", "", ""], 
  ["Final Grade", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

const steps = [
    { instruction: "Select cell B6", action: "select-cell", target: "B6" },
    { instruction: "Type =SUMPRODUCT(B2:B5,C2:C5)", action: "formula" },

    { instruction: "Select cell E6", action: "select-cell", target: "E6" },
    { instruction: "Type =SUMPRODUCT(E2:E5,F2:F5)", action: "formula" },

    { instruction: "Select cell B7", action: "select-cell", target: "B7" },
    { instruction: "Type =(B6*60%)+(E6*40%)", action: "formula" },
];

export default function Activity11() {
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

            {/* Title */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Activity 11: Grade Computation
                </h1>
                <Pill tone={difficultyTone("Medium")}>Hard</Pill>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Use SUMPRODUCT to multiply scores with weights.
              </p>
            </div>

            {/* Scenario */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-l-4 border-emerald-600 p-5">
                <p className="font-semibold text-gray-900">Scenario</p>
                <div className="mt-2 text-sm text-gray-600">
                    Compute the student's <span className="font-semibold">final grade</span>
                    using the grading system below.
                    <div className="mt-4 overflow-x-auto">
                        <table className="border border-gray-300 text-sm text-center w-full max-w-2xl">
                            
                            <thead>
                            <tr className="bg-gray-100">
                                <th colSpan="2" className="border p-2 font-semibold">
                                    Lecture (60%)
                                </th>
                                <th colSpan="2" className="border p-2 font-semibold">
                                    Laboratory (40%)
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td className="border p-2">Performance Output</td>
                                <td className="border p-2">40%</td>

                                <td className="border p-2">Performance Output</td>
                                <td className="border p-2">40%</td>
                            </tr>

                            <tr>
                                <td className="border p-2">Major Examination</td>
                                <td className="border p-2">30%</td>

                                <td className="border p-2">Major Assessment</td>
                                <td className="border p-2">30%</td>
                            </tr>

                            <tr>
                                <td className="border p-2">Quiz</td>
                                <td className="border p-2">15%</td>

                                <td className="border p-2">Peer Assessment</td>
                                <td className="border p-2">15%</td>
                            </tr>

                            <tr>
                                <td className="border p-2">Recitation</td>
                                <td className="border p-2">15%</td>

                                <td className="border p-2">Practice</td>
                                <td className="border p-2">15%</td>
                            </tr>

                            <tr className="font-semibold bg-gray-50">
                                <td className="border p-2">Total</td>
                                <td className="border p-2">100</td>

                                <td className="border p-2">Total</td>
                                <td className="border p-2">100</td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
              </div>
            </div>

            {/* Excel Engine */}
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
              <p className="font-semibold text-gray-900">Interactive Sheet</p>
              <p className="text-sm text-gray-600 mt-1">
                Follow the steps inside the Excel simulator
              </p>

              <div className="mt-4">
                <ExcelEngine steps={steps} initialData={initialData} />
              </div>
            </div>

            {/* Hint */}
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-semibold text-emerald-800">Hint</p>
              <code className="block mt-2 text-sm bg-white border rounded px-3 py-2">
                {'=B3-B2'}
              </code>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}