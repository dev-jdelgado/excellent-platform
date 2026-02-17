import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity3() {
  const expectedCount = 3;
  const expectedPercent = 60; // %

  return (
    <ActivityPage
      no={3}
      title="Grade Analysis"
      tip="Use COUNTIF or similar functions to analyze score ranges."
      difficulty="Medium"
      subtitle="Grade Analysis"
      scenario={
        <>
          Count how many students score above <span className="font-semibold">85%</span>{" "}
          and calculate what percentage they represent.
        </>
      }
      letters={["A", "B"]}
      sheetHeaders={["Student", "Score (%)"]}
      rows={[
        { row: "2", cells: ["Ana", "90"] },
        { row: "3", cells: ["Ben", "82"] },
        { row: "4", cells: ["Cara", "88"] },
        { row: "5", cells: ["Dan", "75"] },
        { row: "6", cells: ["Ella", "95"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your formula or answer (e.g., COUNT above 85 and %). Example: "3 students, 60%"'
      hintBody={
        <>
          Use <span className="font-semibold">COUNTIF</span> to count scores above 85, then divide
          by total students to get the percentage.
        </>
      }
      hintFormula={`=COUNTIF(B2:B6,">85") / COUNTA(B2:B6)`}
      onCheck={(ans) => {
        const a = norm(ans);
        const hasCount = a.includes(String(expectedCount));
        const hasPercent =
          a.includes("60%") || a.includes("60") || a.includes("0.6");
        const hasCountif = a.includes("countif(");
        if ((hasCount && hasPercent) || (hasCountif && hasPercent)) {
          return {
            ok: true,
            message: `Correct! ${expectedCount} students above 85%, which is ${expectedPercent}% of the class.`,
          };
        }
        if (hasCount) {
          return {
            ok: true,
            message: `Count is correct (${expectedCount}). Bonus: percentage is ${expectedPercent}%.`,
          };
        }
        return {
          ok: false,
          message: `Not quite. Count above 85% then compute percent out of 5 students.`,
        };
      }}
    />
  );
}
