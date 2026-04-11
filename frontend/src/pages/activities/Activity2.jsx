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

/* ✅ EXTENDED DATA */
const initialData = [
  ["Name", "Department", "Salary", "", "", ""],
  ["Alice", "IT", 50000, "", "", ""],
  ["Ben", "HR", 42000, "", "", ""],
  ["Carla", "IT", 54000, "", "", ""],
  ["Dan", "Sales", 38000, "", "", ""],
  ["Ella", "IT", 51000, "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

/* ✅ STEPS */
const steps = [
  { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
  { instruction: "Select result cell (D2)", action: "select-cell", target: "D2" },
  { instruction: 'Type =AVERAGEIF(B2:B6,"IT",C2:C6)', action: "formula" },
];

export default function Activity2() {
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
                  Activity 2: Filter by Department
                </h1>
                <Pill tone={difficultyTone("Medium")}>Medium</Pill>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Filter rows by department, then calculate the average salary.
              </p>
            </div>

            {/* Scenario */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-l-4 border-emerald-600 p-5">
                <p className="font-semibold text-gray-900">Scenario</p>
                <div className="mt-2 text-sm text-gray-600">
                  Find all employees from the{" "}
                  <span className="font-semibold">IT</span> department and calculate
                  their <span className="font-semibold">average salary</span>.
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
                =AVERAGEIF(B2:B6,"IT",C2:C6)
              </code>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}