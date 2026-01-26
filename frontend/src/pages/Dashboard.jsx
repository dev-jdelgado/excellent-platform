import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
    DocumentTextIcon,
    PencilSquareIcon,
    EyeIcon,
    CircleStackIcon,
    CalculatorIcon,
    ChevronRightIcon,
    PhotoIcon,
    WrenchIcon,
} from "@heroicons/react/24/outline";

import SidebarNav from "../components/SidebarNav";
import MobileTabBar from "../components/MobileTabBar";

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

    const tools = [
        {
            title: "File Operations",
            level: "Basic",
            description: "Create, open, save, and manage Excel files",
            topics: 2,
            icon: DocumentTextIcon,
            href: "/excel-tools/file-operations",
        },
        {
            title: "Edit & Modify",
            level: "Basic",
            description: "Cut, copy, paste, find, and replace data",
            topics: 2,
            icon: PencilSquareIcon,
            href: "/excel-tools/edit-modify",
        },
        {
            title: "View Options",
            level: "Basic",
            description: "Control how your spreadsheet is displayed",
            topics: 2,
            icon: EyeIcon,
            href: "/excel-tools/view-options",
        },
        {
            title: "Data Management",
            level: "Intermediate",
            description: "Sort, filter, and manage your data",
            topics: 3,
            icon: CircleStackIcon,
            href: "/excel-tools/data-management",
        },
        {
            title: "Formula Tools",
            level: "Intermediate",
            description: "Use formulas to calculate and analyze data",
            topics: 3,
            icon: CalculatorIcon,
            href: "/excel-tools/formula-tools",
        },
        {
            title: "Insert Elements",
            level: "Advance",
            description: "Add tables, charts, and visual elements",
            topics: 3,
            icon: PhotoIcon,
            href: "/excel-tools/insert-elements",
        },
        {
            title: "Formatting",
            level: "Advance",
            description: "Add tables, charts, and visual elements",
            topics: 3,
            icon: WrenchIcon,
            href: "/excel-tools/formatting",
        },
    ];

    const levelBadgeClasses = (level) => {
        const base =
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium";

        switch (level) {
        case "Basic":
            return `${base} border-emerald-200 text-emerald-700 bg-emerald-50`;
        case "Intermediate":
            return `${base} border-amber-200 text-amber-700 bg-amber-50`;
        case "Advance":
            return `${base} border-rose-200 text-rose-700 bg-rose-50`;
        default:
            return `${base} border-gray-200 text-gray-600 bg-gray-50`;
        }
    };

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            {/* Top header */}
            <div className="splash-nav">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-3 pb-6">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <h1 className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                                Excel Tools &amp; Features
                            </h1>
                            <p className="text-emerald-100 text-sm sm:text-base mt-1">
                                Learn every Excel tool with interactive demos
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* ✅ Desktop Sidebar component */}
                    <SidebarNav />

                    {/* Main content */}
                    <main className="lg:col-span-9">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {tools.map((item, idx) => (
                                <Link
                                key={idx}
                                to={item.href}
                                className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                                >
                                <div className="p-4 flex items-start gap-3">
                                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                                        <item.icon className="h-6 w-6" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                                                {item.title}
                                            </h3>
                                            <span className={levelBadgeClasses(item.level)}>
                                                {item.level}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <p className="mt-2 text-xs text-gray-500">
                                            {item.topics} topics to explore
                                        </p>
                                    </div>

                                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 mt-2 shrink-0" />
                                </div>

                                <div className="px-4 pb-4">
                                    <div className="w-full text-center rounded-xl bg-emerald-600 text-white text-sm py-2 group-hover:bg-emerald-700 transition">
                                        Explore
                                    </div>
                                </div>
                                </Link>
                            ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* ✅ Mobile Tab Bar component */}
            <MobileTabBar />
        </div>
        </>
    );
}
