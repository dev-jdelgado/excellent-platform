import React from "react";
import ActivityPage from "./ActivityPage";

const normalize = (s) => (s || "").trim().toLowerCase();

export default function Activity1() {
  const totalSales = 47700;
  const highestProduct = "Laptop";

  const acceptedTotalFormulas = new Set([
    "=sum(b2:b5)",
    "=sum(b2:b5) ",
  ]);

  return (
    <ActivityPage
      no={1}
      title="Calculate Total Sales"
      tip="Use a SUM formula to calculate totals from a range."
      difficulty="Easy"
      subtitle="Calculate total sales"
      scenario={
        <>
          Calculate the total sales from all products and identify which product
          has the <span className="font-semibold">highest sales</span>.
        </>
      }
      letters={["A", "B"]}
      sheetHeaders={["Product", "Sales"]}
      rows={[
        { row: "2", cells: ["Laptop", "25000"] },
        { row: "3", cells: ["Mouse", "1200"] },
        { row: "4", cells: ["Keyboard", "3500"] },
        { row: "5", cells: ["Monitor", "18000"] },
      ]}
      tableMaxWidth="max-w-xl"
      placeholder='Type your formula or answer (e.g., =SUM(B2:B5) or 47700)'
      hintBody={
        <>
          Try using the <span className="font-semibold">SUM</span> function on the
          Sales column.
        </>
      }
      hintFormula="=SUM(B2:B5)"
      onCheck={(answer) => {
        const raw = answer.trim();
        const norm = normalize(raw);

        const hasTotalNumber = raw.replace(/[, ]/g, "").includes(String(totalSales));
        const hasTotalFormula = acceptedTotalFormulas.has(norm);
        const hasHighest = norm.includes(normalize(highestProduct));

        if (hasTotalNumber || hasTotalFormula) {
          if (hasHighest) {
            return {
              ok: true,
              message: `Correct! Total sales = ${totalSales} and the highest product is ${highestProduct}.`,
            };
          }
          return {
            ok: true,
            message: `Correct total sales! Total = ${totalSales}. (Bonus: highest product is ${highestProduct}.)`,
          };
        }

        if (hasHighest) {
          return {
            ok: false,
            message: `You identified ${highestProduct}, now calculate the total sales.`,
          };
        }

        return {
          ok: false,
          message: "Not quite. Sum the Sales column (B2:B5).",
        };
      }}
    />
  );
}
