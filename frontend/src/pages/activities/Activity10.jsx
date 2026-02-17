import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity10() {
  // From Jan 15, 2025 to Mar 1, 2024 is -320 days (date is in the past)
  const expected = "-320";

  return (
    <ActivityPage
      no={10}
      title= "Date Calculation"
      tip="Use date functions to calculate the number of days between dates."
      difficulty="Medium"
      subtitle="Date Calculation"
      scenario={
        <>
          If today is <span className="font-semibold">January 15, 2025</span>, how many days until{" "}
          <span className="font-semibold">March 1, 2024</span>?
        </>
      }
      letters={["A", "B"]}
      sheetHeaders={["Date", "Value"]}
      rows={[
        { row: "2", cells: ["Today", "1/15/2025"] },
        { row: "3", cells: ["Target Date", "3/1/2024"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your formula or answer (e.g., =B3-B2 or -320)'
      hintBody={
        <>
          Subtract dates: <span className="font-mono">Target - Today</span>. If the target is earlier,
          the result will be negative.
        </>
      }
      hintFormula={`=B3-B2`}
      onCheck={(ans) => {
        const a = norm(ans);
        const ok = a.includes(expected) || a.includes("b3-b2") || a.includes("date(");
        return ok
          ? { ok: true, message: "Correct! The result is -320 days (the target date is in the past)." }
          : { ok: false, message: "Not quite. Do Target Date minus Today (B3 - B2)." };
      }}
    />
  );
}
