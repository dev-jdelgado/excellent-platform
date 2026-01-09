import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Splash from './components/Splash';
import PreAssessment from './components/PreAssessment';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
          path="/dashboard"
          element={
              <PrivateRoute requirePreAssessment>
                  <Dashboard />
              </PrivateRoute>
          }
      />

      <Route
          path="/pre-assessment"
          element={
              <PrivateRoute>
                  <PreAssessment />
              </PrivateRoute>
          }
      />
    </Routes>
  );
}

export default App;
