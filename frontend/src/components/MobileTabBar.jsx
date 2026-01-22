import React from "react";
import { NavLink } from "react-router-dom";
import {
    CircleStackIcon,
    DocumentTextIcon,
    CalculatorIcon,
} from "@heroicons/react/24/outline";

export default function MobileTabBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white lg:hidden">
            <div className="mx-auto max-w-md px-9 py-3 flex items-center justify-between text-xs">
                <NavLink
                    to="/excel-tools"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${
                        isActive ? "text-emerald-700 font-medium" : "text-gray-500"
                        }`
                    }
                    >
                    <CircleStackIcon className="h-6 w-6" />
                    Excel Tools
                </NavLink>

                <NavLink
                    to="/formulas"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${
                        isActive ? "text-emerald-700 font-medium" : "text-gray-500"
                        }`
                    }
                    >
                    <CalculatorIcon className="h-6 w-6" />
                    Formulas
                </NavLink>

                <NavLink
                    to="/activities"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${
                        isActive ? "text-emerald-700 font-medium" : "text-gray-500"
                        }`
                    }
                    >
                    <DocumentTextIcon className="h-6 w-6" />
                    Activities
                </NavLink>
            </div>
        </div>
    );
}
