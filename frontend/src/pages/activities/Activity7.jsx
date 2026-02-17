import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity7() {
  const expectedUnique = 4;

  return (
    <ActivityPage
      no={7}
      title= "Remove Duplicates Count"
      tip="Identify unique values after removing duplicates."
      difficulty="Easy"
      subtitle="Remove Duplicates Count"
      scenario={
        <>
          How many unique cities are in the list after removing duplicates?
        </>
      }
      letters={["A"]}
      sheetHeaders={["City"]}
      rows={[
        { row: "2", cells: ["Manila"] },
        { row: "3", cells: ["Cebu"] },
        { row: "4", cells: ["Davao"] },
        { row: "5", cells: ["Cebu"] },
        { row: "6", cells: ["Manila"] },
        { row: "7", cells: ["Baguio"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your answer (e.g., 4) or a formula like =COUNTA(UNIQUE(A2:A7))'
      hintBody={
        <>
          You can use <span className="font-mono">UNIQUE</span> (if available) then count, or
          remove duplicates manually and count remaining unique cities.
        </>
      }
      hintFormula={`=COUNTA(UNIQUE(A2:A7))`}
      onCheck={(ans) => {
        const a = norm(ans);
        const ok = a.includes(String(expectedUnique)) || a.includes("unique(");
        return ok
          ? { ok: true, message: `Correct! There are ${expectedUnique} unique cities.` }
          : { ok: false, message: "Not quite. Count unique cities after duplicates are removed." };
      }}
    />
  );
}
