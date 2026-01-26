import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { ChevronRightIcon, ArrowLeftIcon, CircleStackIcon } from "@heroicons/react/24/outline";

export default function DataManagement() {
    const lessons = [
        {
            title: "Sort Data",
            description: "Arrange data in ascending or descending order",
            to: "/excel-tools/data-management/sort-data",
        },
        {
            title: "Filter Data",
            description: "Display only rows that meet certain criteria",
            to: "/excel-tools/data-management/filter-data",
        },
        {
            title: "Remove Duplicates",
            description: "Find and delete duplicate entries",
            to: "/excel-tools/data-management/remove-duplicates",
        },
    ];

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">
                <div className="grid grid-cols-1 gap-6">
                    <main>
                        <Link
                            to="/excel-tools"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-gray-900 font-semibold"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                                Back to all tools
                        </Link>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white border border-emerald-100">
                                <CircleStackIcon className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                    Data Management
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Sort, filter, and manage your data
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lessons.map((l) => (
                            <Link
                                key={l.title}
                                to={l.to}
                                className="group block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-4 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900">{l.title}</p>
                                        <p className="mt-1 text-sm text-gray-600">{l.description}</p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 shrink-0" />
                                </div>
                            </Link>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
        </>
    );
}
