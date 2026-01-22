import React from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  CircleStackIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function SidebarNav() {
    const navItemClass = ({ isActive }) =>
        `w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
        isActive
            ? "font-medium text-emerald-700 bg-emerald-50 border border-emerald-100"
            : "text-gray-600 hover:bg-gray-50"
        }`;

    return (
        <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold tracking-wide text-gray-500">
                        NAVIGATION
                    </p>

                    <div className="mt-3 space-y-1">
                        <NavLink to="/excel-tools" className={navItemClass}>
                            <CircleStackIcon className="h-5 w-5" />
                            Excel Tools
                        </NavLink>

                        <NavLink to="/formulas" className={navItemClass}>
                            <BookOpenIcon className="h-5 w-5" />
                            Formulas
                        </NavLink>

                        <NavLink to="/activities" className={navItemClass}>
                            <DocumentTextIcon className="h-5 w-5" />
                            Activities
                        </NavLink>
                    </div>
                </div>
            </div>
        </aside>
    );
}
