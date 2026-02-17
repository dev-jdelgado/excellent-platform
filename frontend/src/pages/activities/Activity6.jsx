import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity6() {
  const expectedCommission = 600; // Alice sales 6000 => 10%

  return (
    <ActivityPage
      no={6}
      title= "Sales Commission"
      tip="Apply IF conditions to calculate different outcomes."
      difficulty="Hard"
      subtitle="Sales Commission"
      scenario={
        <>
          Calculate commission: <span className="font-semibold">10%</span> if sales{" "}
          <span className="font-semibold">&gt; 5,000</span>, otherwise{" "}
          <span className="font-semibold">5%</span>. What’s{" "}
          <span className="font-semibold">Alice</span>’s commission?
        </>
      }
      letters={["A", "B"]}
      sheetHeaders={["Name", "Sales"]}
      rows={[
        { row: "2", cells: ["Alice", "6000"] },
        { row: "3", cells: ["Ben", "4800"] },
        { row: "4", cells: ["Cara", "5200"] },
        { row: "5", cells: ["Dan", "3000"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your formula or answer (e.g., =IF(B2>5000,B2*10%,B2*5%) or 600)'
      hintBody={
        <>
          Use <span className="font-semibold">IF</span> to apply 10% when sales are above 5000,
          else 5%.
        </>
      }
      hintFormula={`=IF(B2>5000,B2*10%,B2*5%)`}
      onCheck={(ans) => {
        const a = norm(ans).replace(/,/g, "");
        const ok = a.includes(String(expectedCommission)) || a.includes("if(");
        return ok
          ? { ok: true, message: `Correct! Alice’s commission = ${expectedCommission}.` }
          : { ok: false, message: "Not quite. Alice sales is 6000, apply the correct rate." };
      }}
    />
  );
}
