export const excelSteps = {
    // FILE OPERATIONS
    newWorkbook: [
        { instruction: "Click new sheet (+) below", action: "add-sheet" },
    ],
    saveExport: [
        { instruction: "Click File tab", action: "click-tab", target: "file" },
        { instruction: "Click Save icon", action: "save-file" },
    ],

    // EDIT & MODIFY
    copyPaste: [
        { instruction: "Press Ctrl+C to Copy", action: "copy" },
        { instruction: "Press Ctrl+V to Paste", action: "paste" },
    ],
    findReplace: [
        { instruction: "Select a cell and start editing", action: "formula" },
    ],

    // DATA MANAGEMENT
    sortData: [
        { instruction: "Click Data tab", action: "click-tab", target: "data" },
        { instruction: "Click Sort A-Z", action: "sort" },
    ],
    filterData: [
        { instruction: "Click Data tab", action: "click-tab", target: "data" },
        { instruction: "Click 🔍 Filter", action: "filter" },
        { instruction: "Click Apply", action: "apply-filter" },
    ],
    removeDuplicates: [
        { instruction: "Click Data tab", action: "click-tab", target: "data" },
        { instruction: "Click Remove Duplicates button", action: "remove-duplicates" },
    ],

    // INSERT
    insertTable: [
        { instruction: "Click Insert tab", action: "click-tab", target: "insert" },
        { instruction: "Click Table", action: "insert-table" },
    ],
    insertChart: [
        { instruction: "Click Insert tab", action: "click-tab", target: "insert" },
        { instruction: "Click Chart button", action: "insert-chart" },
    ],

    // FORMATTING
    cellFormatting: [
        { instruction: "Click Home tab", action: "click-tab", target: "home" },
        { instruction: "Click Bold/Italic/Underline", action: "format-bold" },
    ],
    conditionalFormatting: [
        { instruction: "Click Home tab", action: "click-tab", target: "home" },
        { instruction: "Click Conditional Formatting", action: "format-conditional" },
    ],

    // FORMULA TOOLS
    insertFunction: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Insert function (fx)", action: "formula" },
    ],
    formulaAuditing: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Click Trace Precedents/Dependents", action: "formula-audit" },
    ],

    // VIEW OPTIONS
    freezePanes: [
        { instruction: "Click View tab", action: "click-tab", target: "view" },
        { instruction: "Click ❄️ Freeze", action: "freeze" },
    ],
    zoomControls: [
        { instruction: "Click View tab", action: "click-tab", target: "view" },
    ],

    // FORMULAS (UPDATED FOR EXCEL ENGINE)
    AVERAGE: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Select result cell (B7)", action: "select-cell", target: "B7" },
        { instruction: "Type =AVERAGE(B2:B6)", action: "formula" },
    ],

    SUM: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Select result cell (A6)", action: "select-cell", target: "A6" },
        { instruction: "Type =SUM(A1:A5)", action: "formula" },
    ],

    CONCAT: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Select result cell (C2)", action: "select-cell", target: "C2" },
        { instruction: 'Type =CONCATENATE(A2," ",B2)', action: "formula" },
    ],

    COUNTIF: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Select result cell (B5)", action: "select-cell", target: "B5" },
        { instruction: 'Type =COUNTIF(B2:B4,">80")', action: "formula" },
    ],

    IF: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Select result cell (C2)", action: "select-cell", target: "C2" },
        { instruction: 'Type =IF(B2>=60,"Pass","Fail")', action: "formula" },
    ],

    VLOOKUP: [
        { instruction: "Click Formulas tab", action: "click-tab", target: "formulas" },
        { instruction: "Select result cell (E2)", action: "select-cell", target: "E2" },
        { instruction: 'Type =VLOOKUP("P001",A2:C4,2,FALSE)', action: "formula" },
    ],
};
