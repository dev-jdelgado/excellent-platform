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
        "=sumproduct(b6:b9,c6:c9)",
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

        letters={["A", "B", "C"]}
        sheetHeaders={["Component", "Score", "Weight"]}

        rows={[
            { row: "2", cells: ["Lecture - Performance Output", "90", "40%"] },
            { row: "3", cells: ["Lecture - Major Exam", "85", "30%"] },
            { row: "4", cells: ["Lecture - Quiz", "80", "15%"] },
            { row: "5", cells: ["Lecture - Recitation", "95", "15%"] },
            { row: "6", cells: ["Lab - Performance Output", "92", "40%"] },
            { row: "7", cells: ["Lab - Major Assessment", "88", "30%"] },
            { row: "8", cells: ["Lab - Peer Assessment", "90", "15%"] },
            { row: "9", cells: ["Lab - Practice", "94", "15%"] },
        ]}

        tableMaxWidth="max-w-2xl"

        placeholder="Enter Excel formula or final grade"

        hintBody={
            <>
                Step 1: Compute Lecture Grade
                <br />
                <span className="font-semibold">Hint:</span> Try using:
                <br />
                <code>=SUMPRODUCT(B2:B5,C2:C5)</code>
                <br /><br />

                Step 2: Compute Lab Grade
                <br />
                <code>=SUMPRODUCT(B6:B9,C6:C9)</code>
                <br /><br />

                Step 3: Final Grade
                <br />
                Final=(Total Lecture Score × 60%) + (Total Lab Score × 40%)
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