import React from "react";
import ActivityPage from "./ActivityPage";

const normalize = (s) =>
  (s || "").trim().toLowerCase().replace(/\s+/g, " ");

export default function Activity2() {
  const itAvgExact = (50000 + 54000 + 51000) / 3;
  const itAvgRounded0 = Math.round(itAvgExact); // 51667
  const itAvgRounded2 = Math.round(itAvgExact * 100) / 100; // 51666.67

  function hasNumberLike(text, n) {
    return text.replace(/,/g, "").includes(String(n));
  }

  return (
    <ActivityPage
      no={2}
      title="Filter by Department"
      tip="Filter rows by department, then calculate the average salary."
      difficulty="Medium"
      subtitle="Filter by Department"
      scenario={
        <>
          Find all employees from the{" "}
          <span className="font-semibold">IT</span> department and calculate
          their <span className="font-semibold">average salary</span>.
        </>
      }
      letters={["A", "B", "C", "D"]}
      sheetHeaders={["Name", "Department", "Salary", "Notes"]}
      rows={[
        { row: "2", cells: ["Alice", "IT", "50000", ""] },
        { row: "3", cells: ["Ben", "HR", "42000", ""] },
        { row: "4", cells: ["Carla", "IT", "54000", ""] },
        { row: "5", cells: ["Dan", "Sales", "38000", ""] },
        { row: "6", cells: ["Ella", "IT", "51000", ""] },
      ]}
      tableMaxWidth="max-w-2xl"
      placeholder='Type your formula or answer (e.g., =AVERAGEIF(B2:B6,"IT",C2:C6) or 51666.67)'
      hintBody={
        <>
          Filter rows where Department is{" "}
          <span className="font-semibold">IT</span>, then compute the average of
          their salaries.
        </>
      }
      hintFormula='=AVERAGEIF(B2:B6,"IT",C2:C6)'
      onCheck={(answer) => {
        const raw = answer.trim();
        const norm = normalize(raw);

        const mentionsIt = norm.includes("it");
        const mentionsAverage = norm.includes("average") || norm.includes("avg");

        const okByRounded0 = hasNumberLike(raw, itAvgRounded0);
        const okByRounded2 = hasNumberLike(raw, itAvgRounded2);
        const okByExact =
          raw.replace(/,/g, "").includes("51666.66") ||
          raw.replace(/,/g, "").includes("51666.67");

        const hasAverageIf =
          norm.includes("averageif(") &&
          norm.includes("b2:b6") &&
          norm.includes("c2:c6");

        if (
          okByRounded0 ||
          okByRounded2 ||
          okByExact ||
          hasAverageIf
        ) {
          return {
            ok: true,
            message: `Correct! IT average salary ≈ ${itAvgRounded2} (rounded: ${itAvgRounded0}).`,
          };
        }

        if (mentionsIt && !mentionsAverage) {
          return {
            ok: false,
            message:
              "You identified the IT department. Now calculate their average salary.",
          };
        }

        return {
          ok: false,
          message:
            "Not quite. Filter IT employees and compute their average salary.",
        };
      }}
    />
  );
}
