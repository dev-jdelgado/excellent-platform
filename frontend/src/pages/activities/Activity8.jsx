import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity8() {
  const expected = "doe, john";

  return (
    <ActivityPage
      no={8}
      title= "Text Manipulation"
      tip="Use text functions like CONCAT or TEXTJOIN."
      difficulty="Medium"
      subtitle="Text Manipulation"
      scenario={
        <>
          Combine First Name and Last Name with a comma and space{" "}
          <span className="font-semibold">(Last, First)</span>. What’s the result for row 2?
        </>
      }
      letters={["A", "B"]}
      sheetHeaders={["First Name", "Last Name"]}
      rows={[
        { row: "2", cells: ["John", "Doe"] },
        { row: "3", cells: ["Maria", "Santos"] },
        { row: "4", cells: ["Leo", "Reyes"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your formula or answer (e.g., =B2&", "&A2 or Doe, John)'
      hintBody={
        <>
          Use <span className="font-mono">&amp;</span> or <span className="font-semibold">CONCAT</span>:
          Last Name + ", " + First Name.
        </>
      }
      hintFormula={`=B2&", "&A2`}
      onCheck={(ans) => {
        const a = norm(ans);
        const ok =
          a.includes(expected) ||
          a.includes("b2") && a.includes("a2") && (a.includes("&") || a.includes("concat"));
        return ok
          ? { ok: true, message: `Correct! Row 2 result is "Doe, John".` }
          : { ok: false, message: "Not quite. Format should be Last, First (with comma + space)." };
      }}
    />
  );
}
