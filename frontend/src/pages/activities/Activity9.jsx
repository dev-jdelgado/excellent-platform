import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity9() {
  // 3000 / 10000 = 0.3 = 30%
  return (
    <ActivityPage
      no={9}
      title= "Percentage Calculation"
      tip="Divide part by total, then format as a percentage."
      difficulty="Easy"
      subtitle="Percentage Calculation"
      scenario={
        <>
          Product A sales are <span className="font-semibold">3,000</span> out of total{" "}
          <span className="font-semibold">10,000</span>. What percentage is this?
        </>
      }
      letters={["A", "B"]}
      sheetHeaders={["Value", "Amount"]}
      rows={[
        { row: "2", cells: ["Product A Sales", "3000"] },
        { row: "3", cells: ["Total Sales", "10000"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your formula or answer (e.g., =B2/B3 or 30%)'
      hintBody={
        <>
          Divide part by whole: <span className="font-mono">3000/10000</span>, then format as percentage.
        </>
      }
      hintFormula={`=B2/B3`}
      onCheck={(ans) => {
        const a = norm(ans).replace(/,/g, "");
        const ok = a.includes("30%") || a.includes("30") || a.includes("0.3") || a.includes("/b3");
        return ok
          ? { ok: true, message: "Correct! 3000 out of 10000 is 30%." }
          : { ok: false, message: "Not quite. Compute 3000 / 10000 and convert to %." };
      }}
    />
  );
}
