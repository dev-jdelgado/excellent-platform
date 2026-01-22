import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import SidebarNav from "../components/SidebarNav";
import MobileTabBar from "../components/MobileTabBar";

export default function Formulas() {
    const sections = [
        {
        title: "Math Functions",
        items: [
            {
            name: "SUM",
            description: "Adds all numbers in range of cells",
            syntax: "=SUM(number1, [number2], ...)",
            href: "/formulas/sum",
            },
            {
            name: "AVERAGE",
            description: "Calculates the average (arithmetic mean) of numbers",
            syntax: "=AVERAGE(number1, [number2], ...)",
            href: "/formulas/average",
            },
        ],
        },
        {
        title: "Logical Functions",
        items: [
            {
            name: "IF",
            description: "Returns one value if condition is TRUE, another if FALSE",
            syntax: "=IF(logical_test, value_if_true, value_if_false)",
            href: "/formulas/if",
            },
        ],
        },
        {
        title: "Lookup Functions",
        items: [
            {
            name: "VLOOKUP",
            description:
                "Searches for a value in the first column and returns a value from another column",
            syntax:
                "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
            href: "/formulas/vlookup",
            },
        ],
        },
        {
        title: "Statistical Functions",
        items: [
            {
            name: "COUNTIF",
            description: "Counts cells that meet a specific condition",
            syntax: "=COUNTIF(range, criteria)",
            href: "/formulas/countif",
            },
        ],
        },
        {
        title: "Text Functions",
        items: [
            {
            name: "CONCATENATE / CONCAT",
            description: "Joins multiple text strings into one string",
            syntax:
                "=CONCATENATE(text1, [text2], ...) or =CONCAT(text1, [text2], ...)",
            href: "/formulas/concat",
            },
        ],
        },
    ];

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-gray-50">
            <div className="splash-nav">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-3 pb-6">
                <h1 className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                Excel Formulas &amp; Functions
                </h1>
                <p className="text-emerald-100 text-sm sm:text-base mt-1">
                Learn the essential formulas with examples
                </p>
            </div>
            </div>

            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <SidebarNav />

                <main className="lg:col-span-9">
                <div className="space-y-6">
                    {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        {section.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item) => (
                            <Link
                            key={item.name}
                            to={item.href}
                            className="group block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                            <div className="p-4 flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                <p className="font-semibold text-gray-900">
                                    {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                    {item.description}
                                </p>

                                <div className="mt-3 rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-700 font-mono overflow-x-auto">
                                    {item.syntax}
                                </div>
                                </div>

                                <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 mt-1 shrink-0" />
                            </div>
                            </Link>
                        ))}
                        </div>
                    </div>
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
