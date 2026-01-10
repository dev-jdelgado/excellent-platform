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

  if (loading) return <p>Loading...</p>;

  // Not logged in
  if (!user) return <Navigate to="/login" />;

  // Pre-assessment required but not completed
  if (requirePreAssessment && !user.is_completed_preassessment) {
    return <Navigate to="/pre-assessment" />;
  }

  return allowed ? children : null;
}
