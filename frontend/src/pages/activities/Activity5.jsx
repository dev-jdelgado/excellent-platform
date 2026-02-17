import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity5() {
  const expectedCount = 4;

  return (
    <ActivityPage
      no={5}
      title= "Age Filter"
      tip="Filter data using logical conditions between two values."
      difficulty="Easy"
      subtitle="Age Filter"
      scenario={
        <>
          Find all customers aged between <span className="font-semibold">25</span> and{" "}
          <span className="font-semibold">35</span> (inclusive) and count how many there are.
        </>
      }
      letters={["A", "B"]}
      sheetHeaders={["Customer", "Age"]}
      rows={[
        { row: "2", cells: ["Chris", "22"] },
        { row: "3", cells: ["Dana", "25"] },
        { row: "4", cells: ["Eli", "29"] },
        { row: "5", cells: ["Faye", "35"] },
        { row: "6", cells: ["Gio", "36"] },
        { row: "7", cells: ["Hana", "31"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your formula or answer (e.g., =COUNTIFS(B2:B7,">=25",B2:B7,"<=35") or 4)'
      hintBody={
        <>
          Use <span className="font-semibold">COUNTIFS</span> with two conditions:{" "}
          <span className="font-mono">&gt;=25</span> and <span className="font-mono">&lt;=35</span>.
        </>
      }
      hintFormula={`=COUNTIFS(B2:B7,">=25",B2:B7,"<=35")`}
      onCheck={(ans) => {
        const a = norm(ans);
        const ok = a.includes(String(expectedCount)) || a.includes("countifs(");
        return ok
          ? { ok: true, message: `Correct! There are ${expectedCount} customers aged 25–35.` }
          : { ok: false, message: "Not quite. Count ages between 25 and 35 inclusive." };
      }}
    />
  );
}
