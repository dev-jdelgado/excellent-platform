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
  ["Name", "Sales", "", "", "", ""],
  ["Alice", 6000, "", "", "", ""],
  ["Ben", 4800, "", "", "", ""],
  ["Cara", 5200, "", "", "", ""],
  ["Dan", 3000, "", "", "", ""],
  ["", "", "", "", "", "", ],
  ["", "", "", "", "", "", ],
  ["", "", "", "", "", "", ]
];

const steps = [
  { instruction: "Select cell C2", action: "select-cell", target: "C2" },
  { instruction: "Type =IF(B2>5000,B2*10%,B2*5%)", action: "formula" },
];

export default function Activity6() {
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
                  Activity 6: Sales Commission
                </h1>
                <Pill tone={difficultyTone("Hard")}>Hard</Pill>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Apply IF conditions to calculate different outcomes.
              </p>
            </div>

            {/* Scenario */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-l-4 border-emerald-600 p-5">
                <p className="font-semibold text-gray-900">Scenario</p>
                <div className="mt-2 text-sm text-gray-600">
                  Calculate commission: <span className="font-semibold">10%</span> if sales{" "}
                  <span className="font-semibold">&gt; 5,000</span>, otherwise{" "}
                  <span className="font-semibold">5%</span>. What’s{" "}
                  <span className="font-semibold">Alice</span>’s commission?
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
                {'=IF(B2>5000,B2*10%,B2*5%)'}
              </code>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}