import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Splash from "./components/Splash";
import PreAssessment from "./components/PreAssessment";

import FileOperations from "./pages/modules/FileOperations";
import FileOperationsNewWorkbook from "./pages/modules/FileOperationsNewWorkbook";
import FileOperationsSaveExport from "./pages/modules/FileOperationsSaveExport";

import EditAndModify from "./pages/modules/EditAndModify";
import EditAndModifyCopyPaste from "./pages/modules/EditAndModifyCopyPaste";
import EditAndModifyFindReplace from "./pages/modules/EditAndModifyFindReplace";


// ✅ Add these imports
import Formulas from "./pages/Formulas";
import Activities from "./pages/Activities";

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

        {/* Excel Tools / Dashboard */}
        <Route path="/excel-tools" element={ <PrivateRoute requirePreAssessment> <Dashboard /> </PrivateRoute>}/>

        {/*  MODULES */}
        <Route path="/modules/file-operations" element={ <PrivateRoute requirePreAssessment> <FileOperations /> </PrivateRoute> } />
        <Route
          path="/modules/file-operations/new-workbook"
          element={
            <PrivateRoute requirePreAssessment>
              <FileOperationsNewWorkbook />
            </PrivateRoute>
          }
        />
        <Route
          path="/modules/file-operations/save-export"
          element={
            <PrivateRoute requirePreAssessment>
              <FileOperationsSaveExport />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules/edit-modify"
          element={
            <PrivateRoute requirePreAssessment>
              <EditAndModify />
            </PrivateRoute>
          }
        />
        <Route
          path="/modules/edit-modify/copy-paste"
          element={
            <PrivateRoute requirePreAssessment>
              <EditAndModifyCopyPaste />
            </PrivateRoute>
          }
        />
        <Route
          path="/modules/edit-modify/find-replace"
          element={
            <PrivateRoute requirePreAssessment>
              <EditAndModifyFindReplace />
            </PrivateRoute>
          }
        />
        {/*  END OF MODULES */}

        {/* ✅ Formulas */}
        <Route
          path="/formulas"
          element={
            <PrivateRoute requirePreAssessment>
              <Formulas />
            </PrivateRoute>
          }
        />

        {/* ✅ Activities */}
        <Route
          path="/activities"
          element={
            <PrivateRoute requirePreAssessment>
              <Activities />
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

        {/* optional: fallback */}
        <Route path="*" element={<Navigate to="/excel-tools" />} />
      </Routes>
    );
}

export default App;
