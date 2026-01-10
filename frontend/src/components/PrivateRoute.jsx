import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function PrivateRoute({ children, requirePreAssessment = false }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/students/me");
        const student = res.data;
        setUser(student);

        if (!requirePreAssessment || student.is_completed_preassessment) {
          setAllowed(true);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [requirePreAssessment]);

  // Show full-screen spinner while checking auth
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

  // Not logged in
  if (!user) return <Navigate to="/login" />;

  // Pre-assessment required but not completed
  if (requirePreAssessment && !user.is_completed_preassessment) {
    return <Navigate to="/pre-assessment" />;
  }

  return allowed ? children : null;
}
