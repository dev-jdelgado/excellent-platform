import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Splash from "./components/Splash";
import PreAssessment from "./components/PreAssessment";

// Modules
import FileOperations from "./pages/modules/FileOperations";
import FileOperationsNewWorkbook from "./pages/modules/FileOperationsNewWorkbook";
import FileOperationsSaveExport from "./pages/modules/FileOperationsSaveExport";

import EditAndModify from "./pages/modules/EditAndModify";
import EditAndModifyCopyPaste from "./pages/modules/EditAndModifyCopyPaste";
import EditAndModifyFindReplace from "./pages/modules/EditAndModifyFindReplace";

import ViewOptions from "./pages/modules/ViewOptions";
import ViewOptionsFreezePanes from "./pages/modules/ViewOptionsFreezePanes";
import ViewOptionsZoomControls from "./pages/modules/ViewOptionsZoomControls";

import DataManagement from "./pages/modules/DataManagement";
import DataManagementSortData from "./pages/modules/DataManagementSortData";
import DataManagementFilterData from "./pages/modules/DataManagementFilterData";
import DataManagementRemoveDuplicates from "./pages/modules/DataManagementRemoveDuplicates";

import FormulaTools from "./pages/modules/FormulaTools";
import FormulaToolsInsertFunction from "./pages/modules/FormulaToolsInsertFunction";
import FormulaToolsFormulaAuditing from "./pages/modules/FormulaToolsFormulaAuditing";

import InsertElements from "./pages/modules/InsertElements";
import InsertElementsInsertTable from "./pages/modules/InsertElementsInsertTable";
import InsertElementsInsertChart from "./pages/modules/InsertElementsInsertChart";

import Formatting from "./pages/modules/Formatting";
import FormattingCellFormatting from "./pages/modules/FormattingCellFormatting";
import FormattingConditionalFormatting from "./pages/modules/FormattingConditionalFormatting";

import Formulas from "./pages/Formulas";
import Activities from "./pages/Activities";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) return <Splash onFinish={() => setShowSplash(false)} />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/excel-tools" element={<PrivateRoute requirePreAssessment><Dashboard /></PrivateRoute>} />

      <Route path="/excel-tools/file-operations" element={<PrivateRoute requirePreAssessment><FileOperations /></PrivateRoute>} />
      <Route path="/excel-tools/file-operations/new-workbook" element={<PrivateRoute requirePreAssessment><FileOperationsNewWorkbook /></PrivateRoute>} />
      <Route path="/excel-tools/file-operations/save-export" element={<PrivateRoute requirePreAssessment><FileOperationsSaveExport /></PrivateRoute>} />

      <Route path="/excel-tools/edit-modify" element={<PrivateRoute requirePreAssessment><EditAndModify /></PrivateRoute>} />
      <Route path="/excel-tools/edit-modify/copy-paste" element={<PrivateRoute requirePreAssessment><EditAndModifyCopyPaste /></PrivateRoute>} />
      <Route path="/excel-tools/edit-modify/find-replace" element={<PrivateRoute requirePreAssessment><EditAndModifyFindReplace /></PrivateRoute>} />

      <Route path="/excel-tools/view-options" element={<PrivateRoute requirePreAssessment><ViewOptions /></PrivateRoute>} />
      <Route path="/excel-tools/view-options/freeze-panes" element={<PrivateRoute requirePreAssessment><ViewOptionsFreezePanes /></PrivateRoute>} />
      <Route path="/excel-tools/view-options/zoom-controls" element={<PrivateRoute requirePreAssessment><ViewOptionsZoomControls /></PrivateRoute>} />

      <Route path="/excel-tools/data-management" element={<PrivateRoute requirePreAssessment><DataManagement /></PrivateRoute>} />
      <Route path="/excel-tools/data-management/sort-data" element={<PrivateRoute requirePreAssessment><DataManagementSortData /></PrivateRoute>} />
      <Route path="/excel-tools/data-management/filter-data" element={<PrivateRoute requirePreAssessment><DataManagementFilterData /></PrivateRoute>} />
      <Route path="/excel-tools/data-management/remove-duplicates" element={<PrivateRoute requirePreAssessment><DataManagementRemoveDuplicates /></PrivateRoute>} />

      <Route path="/excel-tools/formula-tools" element={<PrivateRoute requirePreAssessment><FormulaTools /></PrivateRoute>} />
      <Route path="/excel-tools/formula-tools/insert-function" element={<PrivateRoute requirePreAssessment><FormulaToolsInsertFunction /></PrivateRoute>} />
      <Route path="/excel-tools/formula-tools/formula-auditing" element={<PrivateRoute requirePreAssessment><FormulaToolsFormulaAuditing /></PrivateRoute>} />

      <Route path="/excel-tools/insert-elements" element={<PrivateRoute requirePreAssessment><InsertElements /></PrivateRoute>} />
      <Route path="/excel-tools/insert-elements/insert-table" element={<PrivateRoute requirePreAssessment><InsertElementsInsertTable /></PrivateRoute>} />
      <Route path="/excel-tools/insert-elements/insert-chart" element={<PrivateRoute requirePreAssessment><InsertElementsInsertChart /></PrivateRoute>} />

      <Route path="/excel-tools/formatting" element={<PrivateRoute requirePreAssessment><Formatting /></PrivateRoute>} />
      <Route path="/excel-tools/formatting/cell-formatting" element={<PrivateRoute requirePreAssessment><FormattingCellFormatting /></PrivateRoute>} />
      <Route path="/excel-tools/formatting/conditional-formatting" element={<PrivateRoute requirePreAssessment><FormattingConditionalFormatting /></PrivateRoute>} /> 

      <Route path="/formulas" element={<PrivateRoute requirePreAssessment><Formulas /></PrivateRoute>} />
      <Route path="/activities" element={<PrivateRoute requirePreAssessment><Activities /></PrivateRoute>} />

      <Route path="/pre-assessment" element={<PrivateRoute><PreAssessment /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/excel-tools" />} />
    </Routes>
  );
}

export default App;
