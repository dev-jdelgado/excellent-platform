import React from "react";
import ActivityPage from "./ActivityPage";

const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

export default function Activity4() {
  const expectedPrice = 3500;

  return (
    <ActivityPage
      no={4}
      title="Product Lookup"
      tip="Use VLOOKUP or XLOOKUP to find values from a table."
      difficulty="Medium"
      subtitle="Product Lookup"
      scenario={
        <>
          Use <span className="font-semibold">VLOOKUP</span> to find the price of{" "}
          <span className="font-semibold">Keyboard</span> (Product Code:{" "}
          <span className="font-mono">P003</span>).
        </>
      }
      letters={["A", "B", "C"]}
      sheetHeaders={["Product Code", "Product", "Price"]}
      rows={[
        { row: "2", cells: ["P001", "Laptop", "25000"] },
        { row: "3", cells: ["P002", "Mouse", "1200"] },
        { row: "4", cells: ["P003", "Keyboard", "3500"] },
        { row: "5", cells: ["P004", "Monitor", "18000"] },
      ]}
      placeholder='Type your formula or answer (e.g., =VLOOKUP("P003",A2:C5,3,FALSE) or 3500)'
      hintBody={
        <>
          Lookup <span className="font-mono">P003</span> in the first column and return the{" "}
          <span className="font-semibold">3rd</span> column (Price).
        </>
      }
      hintFormula={`=VLOOKUP("P003",A2:C5,3,FALSE)`}
      onCheck={(ans) => {
        const a = norm(ans).replace(/,/g, "");
        const ok = a.includes(String(expectedPrice)) || a.includes("vlookup(");
        return ok
          ? { ok: true, message: `Correct! Keyboard price = ${expectedPrice}.` }
          : { ok: false, message: "Not quite. Use VLOOKUP to return the Price for P003." };
      }}
    />
  );
}
