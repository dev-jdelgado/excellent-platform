import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { QUESTIONS } from "./QUESTIONS";
import { TrophyIcon } from "@heroicons/react/24/outline";

const pickRandom = (arr, n) => {
    const copy = [...arr];
    const result = [];
    for (let i = 0; i < n; i++) {
        const index = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(index, 1)[0]);
    }
    return result;
};

export default function PreAssessment() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(true); // spinner while fetching questions
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchStudent = async () => {
        try {
            const res = await api.get("/students/me");
            const student = res.data;

            // Navigate immediately if pre-assessment is done
            if (student.is_completed_preassessment) {
            navigate("/dashboard");
            return;
            }

            // Prepare questions only for students who haven't taken it
            const selected = [
            ...pickRandom(QUESTIONS["Cells & Worksheets"], 3),
            ...pickRandom(QUESTIONS["Charts & Graphs"], 3),
            ...pickRandom(QUESTIONS["Formatting Tools"], 2),
            ...pickRandom(QUESTIONS["Sorting & Filtering"], 2),
            ];

            setQuestions(selected);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
        };

        fetchStudent();
    }, [navigate]);

    const handleNext = () => {
        const correct = selectedOption === questions[currentIndex].answer;
        setAnswers((prev) => [
        ...prev,
        {
            question: questions[currentIndex].question,
            selected: selectedOption,
            correct,
            answer: questions[currentIndex].answer,
        },
        ]);

        if (correct) setScore((prev) => prev + 1);
        setSelectedOption("");

        if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        } else {
        setShowResults(true);
        }
    };

    const handleSubmitResults = async () => {
        try {
        await api.post("/students/pre-assessment/submit", { score });
        navigate("/dashboard");
        } catch (err) {
        console.error(err);
        }
    };

    // Show spinner while loading questions
    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <svg
                className="animate-spin h-10 w-10 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                ></path>
                </svg>
            </div>
        );

    if (!questions.length) return <p>No questions available</p>;

    // Results summary
    if (showResults) {
        return (
        <div className="max-w-3xl mx-auto mt-10 mb-40">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
                    <TrophyIcon className="w-8 h-8 text-primary" />
                    Pre-Assessment Test Score
                </h1>
            </div>

            <div className="p-6 rounded space-y-4">
                <div className="flex flex-col items-center gap-2 p-6 border-2 border-primary bg-primary_background rounded-xl max-w-xl mx-auto">
                    <div className="bg-primary rounded-full p-4">
                        <TrophyIcon className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-4xl font-bold">Congratulations!</p>
                    <p className="text-lg">
                        You scored <b>{score}</b> out of <b>{questions.length}</b>
                    </p>
                </div>

            {answers.map((ans, idx) => (
                <div key={idx}>
                    <div
                        className={`p-6 rounded-xl max-w-xl mx-auto border-l-4 border ${
                        ans.correct ? "border-l-primary border-gray-200" : "border-l-red-600 border-gray-200"
                        }`}
                    >
                        <p className="font-medium">Question {idx + 1}</p>
                        <p className="mb-3">{ans.question}</p>
                        <p className="font-semibold">
                            Your Answer:{" "}
                        <span className={ans.correct ? "text-green-600" : "text-red-600"}>
                            {ans.selected || "No answer"}
                        </span>
                        </p>
                        {!ans.correct && (
                        <p className="font-semibold">
                            Correct Answer: <span className="text-primary">{ans.answer}</span>
                        </p>
                        )}
                    </div>
                </div>
            ))}

                <div className="max-w-xl mx-auto">
                    <button
                        onClick={handleSubmitResults}
                        className="mt-4 py-2 px-4 w-full bg-primary text-white font-semibold rounded hover:bg-secondary transition"
                        >
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        </div>
        );
    }

    // Quiz view
    const currentQuestion = questions[currentIndex];

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
                        <TrophyIcon className="w-8 h-8 text-primary" />
                        Pre-Assessment Test
                    </h1>

                    <p className="text-center text-gray-600 mt-2 mb-6">
                        This short assessment helps evaluate your current knowledge level before starting the course.
                    </p>
                </div>
                <div className="p-6 shadow-lg rounded-xl border-l-4 border-l-primary border border-gray-200 max-w-xl mx-auto">
                    <p className="font-medium mb-4">
                        Question {currentIndex + 1} of {questions.length}
                    </p>
                    <p className="mb-4">{currentQuestion.question}</p>

                    <div className="space-y-2">
                        {currentQuestion.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedOption(opt)}
                            className={`w-full text-left p-2 border rounded hover:bg-primary_background transition ${
                            selectedOption === opt ? "bg-primary_background border-primary" : ""
                            }`}
                        >
                            {opt}
                        </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!selectedOption}
                        className="mt-4 w-full py-2 bg-primary text-white font-semibold rounded hover:bg-secondary transition disabled:opacity-50"
                    >
                        {currentIndex + 1 === questions.length ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}
