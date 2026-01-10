import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function PrivateRoute({ children, requirePreAssessment = false }) {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false); // whether we finished fetching

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/students/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setChecked(true);
      }
    };

    fetchUser();
  }, []);

  // Render children immediately
  // Only redirect after we know the user status
  if (checked) {
    if (!user) return <Navigate to="/login" />;
    if (requirePreAssessment && !user.is_completed_preassessment) {
      return <Navigate to="/pre-assessment" />;
    }
  }

  return children;
}