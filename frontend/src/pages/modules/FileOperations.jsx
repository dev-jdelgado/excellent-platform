import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import {
    ChevronRightIcon,
    ArrowLeftIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import SidebarNav from "../../components/SidebarNav";
import MobileTabBar from "../../components/MobileTabBar";

export default function FileOperations() {
    const lessons = [
        {
            title: "New Workbook",
            description: "Create a new Excel workbook from scratch or using templates",
            to: "/modules/file-operations/new-workbook",
        },
        {
            title: "Save & Export",
            description: "Save your work and export to different formats",
            to: "/modules/file-operations/save-export",
        },
    ];

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            {/* Content */}
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-28">
                <div className="grid grid-cols-1 gap-6">
                    {/* <SidebarNav /> */}

                    <main className="">
                        <Link
                            to="/excel-tools"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-gray-900 font-semibold"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                                Back to all tools
                        </Link>

                        {/* Title block */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white border border-emerald-100">
                                <DocumentTextIcon className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                    File Operations
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Create, open, save, and manage Excel files
                                </p>
                            </div>
                        </div>

                        {/* Lessons list */}
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
                                        <p className="mt-1 text-sm text-gray-600">
                                            {l.description}
                                        </p>
                                    </div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 shrink-0" />
                                </div>
                            </Link>
                            ))}
                        </div>
                    </main>
                </div>
            </div>

            {/*  <MobileTabBar /> */}
        </div>
        </>
    );
}
