import React, { useState } from "react";
import ActivityPage from "./ActivityPage";

const normalize = (s) => (s || "").trim().toLowerCase();

export default function Activity11() {
    const [step, setStep] = useState(1);

    const lectureScores = [90, 85, 80, 95];
    const lectureWeights = [0.40, 0.30, 0.15, 0.15];

    const labScores = [92, 88, 90, 94];
    const labWeights = [0.40, 0.30, 0.15, 0.15];

    const lectureGrade = lectureScores.reduce(
        (sum, score, i) => sum + score * lectureWeights[i],
        0
    );

    const labGrade = labScores.reduce(
        (sum, score, i) => sum + score * labWeights[i],
        0
    );

    const finalGrade = (lectureGrade * 0.6 + labGrade * 0.4).toFixed(2);

    const acceptedFormulas = [
        "=sumproduct(b2:b5,c2:c5)",
        "=sumproduct(e2:e5,f2:f5)",
        "=(b6*60%)+(e6*40%)",
        "=b6*0.6+e6*0.4",
    ];

    return (
        <ActivityPage
        no={11}
        title="Grade Computation"
        difficulty="Hard"
        subtitle="Compute the Final Grade"
        tip="Use SUMPRODUCT to multiply scores with weights."

        scenario={
            <>
            Compute the student's <span className="font-semibold">final grade</span>
            using the grading system below.

            <div className="mt-4 overflow-x-auto">
                <table className="border border-gray-300 text-sm text-center w-full max-w-2xl">
                    
                    <thead>
                    <tr className="bg-gray-100">
                        <th colSpan="2" className="border p-2 font-semibold">
                            Lecture (60%)
                        </th>
                        <th colSpan="2" className="border p-2 font-semibold">
                            Laboratory (40%)
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td className="border p-2">Performance Output</td>
                        <td className="border p-2">40%</td>

                        <td className="border p-2">Performance Output</td>
                        <td className="border p-2">40%</td>
                    </tr>

                    <tr>
                        <td className="border p-2">Major Examination</td>
                        <td className="border p-2">30%</td>

                        <td className="border p-2">Major Assessment</td>
                        <td className="border p-2">30%</td>
                    </tr>

                    <tr>
                        <td className="border p-2">Quiz</td>
                        <td className="border p-2">15%</td>

                        <td className="border p-2">Peer Assessment</td>
                        <td className="border p-2">15%</td>
                    </tr>

                    <tr>
                        <td className="border p-2">Recitation</td>
                        <td className="border p-2">15%</td>

                        <td className="border p-2">Practice</td>
                        <td className="border p-2">15%</td>
                    </tr>

                    <tr className="font-semibold bg-gray-50">
                        <td className="border p-2">Total</td>
                        <td className="border p-2">100</td>

                        <td className="border p-2">Total</td>
                        <td className="border p-2">100</td>
                    </tr>
                    </tbody>

                </table>
            </div>

            <div className="mt-4 text-sm text-gray-700">
                Step {step} of 3
            </div>
            </>
        }

        letters={["A", "B", "C", "D", "E", "F"]}
        sheetHeaders={[
            "Lecture Component",
            "Score",
            "Weight",
            "Lab Component",
            "Score",
            "Weight"
        ]}
        rows={[
        {
            row: "2",
            cells: [
            "Performance Output",
            "90",
            "40%",
            "Performance Output",
            "92",
            "40%",
            ],
        },
        {
            row: "3",
            cells: [
            "Major Exam",
            "85",
            "30%",
            "Major Assessment",
            "88",
            "30%",
            ],
        },
        {
            row: "4",
            cells: [
            "Quiz",
            "80",
            "15%",
            "Peer Assessment",
            "90",
            "15%",
            ],
        },
        {
            row: "5",
            cells: [
            "Recitation",
            "95",
            "15%",
            "Practice",
            "94",
            "15%",
            ],
        },

        // TOTAL ROW
        {
            row: "6",
            cells: [
            "Lecture Total",
            "",
            "100%",
            "Lab Total",
            "",
            "100%",
            ],
        },

        // FINAL GRADE ROW
        {
            row: "7",
            cells: [
            "Final Grade",
            ],
        },
        ]}

        tableMaxWidth="max-w-2xl"

        placeholder="Enter Excel formula or final grade"

        hintBody={
            <>
                Step 1: Compute Lecture Grade
                <br />
                <code>=SUMPRODUCT(B2:B5,C2:C5)</code>

                <br /><br />

                Step 2: Compute Laboratory Grade
                <br />
                <code>=SUMPRODUCT(E2:E5,F2:F5)</code>

                <br /><br />

                Step 3: Compute Final Grade
                <br />
                <code>=(B6*60%)+(E6*40%)</code>
            </>
        }

        onCheck={(answer) => {
            const raw = answer.trim();
            const norm = normalize(raw);

            if (acceptedFormulas.includes(norm)) {
            setStep(2);
            return {
                ok: true,
                message: "Great! You're using SUMPRODUCT correctly.",
            };
            }

            const num = parseFloat(raw);

            if (!isNaN(num) && Math.abs(num - finalGrade) < 0.5) {
            setStep(3);
            return {
                ok: true,
                message: `🎉 Correct! Final Grade = ${finalGrade}`,
            };
            }

            return {
            ok: false,
            message:
                "Not quite. Try computing Lecture and Laboratory grades first using SUMPRODUCT.",
            };
        }}
        />
    );
}