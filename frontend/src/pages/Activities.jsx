import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import SidebarNav from "../components/SidebarNav";
import MobileTabBar from "../components/MobileTabBar";

export default function Activities() {
    const activities = [
        {
            no: 1,
            difficulty: "Easy",
            title: "Calculate Total Sales",
            description:
                "Calculate the total sales from all products and find which product has the highest sales.",
            href: "/activities/1",
        },
        {
            no: 2,
            difficulty: "Medium",
            title: "Filter by Department",
            description:
                "Find all employees from the ‘IT’ department and calculate their average salary.",
            href: "/activities/2",
        },
        {
            no: 3,
            difficulty: "Medium",
            title: "Grade Analysis",
            description:
                "Count how many students score above 85% and calculate what percentage they represent.",
            href: "/activities/3",
        },
        {
            no: 4,
            difficulty: "Medium",
            title: "Product Lookup",
            description:
                "Use VLOOKUP to find the price of ‘Keyboard’ (Product Code: P003).",
            href: "/activities/4",
        },
        {
            no: 5,
            difficulty: "Easy",
            title: "Age Filter",
            description:
                "Find all customers aged between 25 and 35 (inclusive) and count how many there are.",
            href: "/activities/5",
        },
        {
            no: 6,
            difficulty: "Hard",
            title: "Sales Commission",
            description:
                "Calculate commission: 10% if sales > 5,000, otherwise 5%. What’s Alice’s commission?",
            href: "/activities/6",
        },
        {
            no: 7,
            difficulty: "Easy",
            title: "Remove Duplicates Count",
            description:
                "How many unique cities are in the list after removing duplicates?",
            href: "/activities/7",
        },
        {
            no: 8,
            difficulty: "Medium",
            title: "Text Manipulation",
            description:
                "Combine First Name and Last Name with a comma and space (Last, First). What’s the result for row 2?",
            href: "/activities/8",
        },
        {
            no: 9,
            difficulty: "Easy",
            title: "Percentage Calculation",
            description:
                "Product A sales are 3,000 out of total 10,000. What percentage is this?",
            href: "/activities/9",
        },
        {
            no: 10,
            difficulty: "Medium",
            title: "Date Calculation",
            description:
                "If today is January 15, 2025, how many days until March 1, 2024?",
            href: "/activities/10",
        },
    ];

    const difficultyBadge = (difficulty) => {
        const base =
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium";

        switch (difficulty) {
        case "Easy":
            return `${base} border-gray-200 text-gray-700 bg-gray-50`;
        case "Medium":
            return `${base} border-amber-200 text-amber-700 bg-amber-50`;
        case "Hard":
            return `${base} border-rose-200 text-rose-700 bg-rose-50`;
        default:
            return `${base} border-gray-200 text-gray-600 bg-gray-50`;
        }
    };

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            <div className="splash-nav">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-3 pb-6">
                    <h1 className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                        Practice Activities
                    </h1>
                    <p className="text-emerald-100 text-sm sm:text-base mt-1">
                        Apply Excel knowledge with real-world scenarios
                    </p>
            </div>
            </div>

            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <SidebarNav />

                    <main className="lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {activities.map((a) => (
                            <Link
                                key={a.no}
                                to={a.href}
                                className="group block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-4 flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-gray-800">
                                                #{a.no}
                                            </span>

                                            <span className={difficultyBadge(a.difficulty)}>
                                                {a.difficulty}
                                            </span>
                                        </div>

                                        <h3 className="mt-2 font-semibold text-gray-900">
                                            {a.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {a.description}
                                        </p>
                                    </div>

                                <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 mt-1 shrink-0" />
                                </div>
                            </Link>
                            ))}
                        </div>
                    </main>
                </div>
            </div>

            <MobileTabBar />
        </div>
        </>
    );
}
