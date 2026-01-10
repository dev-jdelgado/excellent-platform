import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    TableCellsIcon,
    ChartBarIcon,
    PaintBrushIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setStudent({
            id: payload.id,
            name: payload.name,
        });
        }
    }, []);

    const modules = [
        {
            title: "Cells & Worksheets",
            progress: 60,
            description: "Learn cell references, worksheets, and workbook structure.",
            icon: TableCellsIcon,
        },
        {
            title: "Charts & Graphs",
            progress: 40,
            description: "Create charts to visualize academic and livelihood data.",
            icon: ChartBarIcon,
        },
        {
            title: "Formatting Tools",
            progress: 75,
            description: "Apply professional formatting and conditional styles.",
            icon: PaintBrushIcon,
        },
        {
            title: "Sorting & Filtering",
            progress: 30,
            description: "Organize and analyze data efficiently.",
            icon: FunnelIcon,
        },
    ];

    return (
        <>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 md:mt-12 mt-6 mb-24">
            {student && (
                <h1 className="text-2xl font-semibold mb-6">
                    Welcome back, {student.name} 👋
                </h1>
            )}

            {/* Overall Progress */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
                <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-secondary h-3 rounded-full w-[51%]" />
                </div>
                <p className="text-sm text-text mt-2">
                    Track your progress in mastering Microsoft Excel skills.
                </p>
            </div>

            {/* Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-6">
                {modules.map((module, index) => (
                    <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg border-l-4 border-l-primary border border-gray-200 p-5 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <module.icon className="w-6 h-6" />
                            </div>

                            <h3 className="font-semibold text-base">
                                {module.title}
                            </h3>
                        </div>


                        <p className="text-sm text-text mb-4">
                            {module.description}
                        </p>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                            className="bg-secondary h-2 rounded-full"
                            style={{ width: `${module.progress}%` }}
                            />
                        </div>

                        <span className="text-xs text-right mb-4">
                            {module.progress}% completed
                        </span>

                        <button className="mt-auto bg-primary text-white text-sm py-2 rounded hover:bg-secondary">
                            Continue Module
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
