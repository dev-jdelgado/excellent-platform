import React, { useState, useCallback, useRef, useEffect } from "react";

export default function ExcelEngine({ steps = [], initialData = null }) {
    // Sheet management
    const [sheets, setSheets] = useState([
        { id: 1, name: "Sheet1", data: initialData || generateInitialData() }
    ]);
    const [activeSheetId, setActiveSheetId] = useState(1);
    
    // Selection state
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
    const [selectionRange, setSelectionRange] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    
    // UI state
    const [formulaBar, setFormulaBar] = useState("");
    const [activeTab, setActiveTab] = useState("home");
    const [editingCell, setEditingCell] = useState(null);
    const [clipboard, setClipboard] = useState(null);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [showFunctionPanel, setShowFunctionPanel] = useState(false);
    
    // Formatting state
    const [cellFormats, setCellFormats] = useState({});
    const [columnWidths, setColumnWidths] = useState({});
    const [rowHeights, setRowHeights] = useState({});
    const [frozenRows, setFrozenRows] = useState(0);
    const [frozenCols, setFrozenCols] = useState(0);

    // Tutorial state
    const [stepIndex, setStepIndex] = useState(0);
    const [message, setMessage] = useState("");
    
    const gridRef = useRef(null);
    const inputRefs = useRef({});
    
    const currentStep = steps[stepIndex];
    const activeSheet = sheets.find(s => s.id === activeSheetId);
    const data = activeSheet?.data || [];

    // 🔍 Find & Replace state
    const [showFind, setShowFind] = useState(false);
    const [findValue, setFindValue] = useState("");
    const [replaceValue, setReplaceValue] = useState("");
    const [foundCells, setFoundCells] = useState([]);
    const [currentFindIndex, setCurrentFindIndex] = useState(0);

    // Generate initial data grid
    function generateInitialData(rows = 100, cols = 26) {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push("");
            }
            grid.push(row);
        }
        // Sample data
        grid[0][0] = "Name";
        grid[0][1] = "Department";
        grid[0][2] = "Salary";
        grid[0][3] = "Bonus";
        grid[0][4] = "Total";
        grid[1][0] = "John";
        grid[1][1] = "Sales";
        grid[1][2] = 50000;
        grid[1][3] = 5000;
        grid[2][0] = "Anna";
        grid[2][1] = "Marketing";
        grid[2][2] = 55000;
        grid[2][3] = 6000;
        grid[3][0] = "Mark";
        grid[3][1] = "Engineering";
        grid[3][2] = 70000;
        grid[3][3] = 8000;
        grid[4][0] = "Lisa";
        grid[4][1] = "Sales";
        grid[4][2] = 52000;
        grid[4][3] = 5500;
        return grid;
    }
    

    // Column letter conversion
    const getColumnLetter = (index) => {
        let letter = "";
        while (index >= 0) {
            letter = String.fromCharCode((index % 26) + 65) + letter;
            index = Math.floor(index / 26) - 1;
        }
        return letter;
    };

    const getColumnIndex = (letter) => {
        let index = 0;
        for (let i = 0; i < letter.length; i++) {
            index = index * 26 + (letter.charCodeAt(i) - 64);
        }
        return index - 1;
    };

    // Cell reference parsing
    const parseCellRef = (ref) => {
        const match = ref.match(/^([A-Z]+)(\d+)$/i);
        if (!match) return null;
        return {
            col: getColumnIndex(match[1].toUpperCase()),
            row: parseInt(match[2]) - 1
        };
    };

    const getCellRef = (row, col) => `${getColumnLetter(col)}${row + 1}`;

    // Parse range like A1:B5
    const parseRange = (rangeStr) => {
        const parts = rangeStr.split(":");
        if (parts.length === 1) {
            const cell = parseCellRef(parts[0]);
            return cell ? [cell] : [];
        }
        const start = parseCellRef(parts[0]);
        const end = parseCellRef(parts[1]);
        if (!start || !end) return [];
        
        const cells = [];
        for (let r = Math.min(start.row, end.row); r <= Math.max(start.row, end.row); r++) {
            for (let c = Math.min(start.col, end.col); c <= Math.max(start.col, end.col); c++) {
                cells.push({ row: r, col: c });
            }
        }
        return cells;
    };

    // Get cell value (handles formulas)
    const getCellValue = useCallback((row, col, visited = new Set()) => {
        const cellKey = `${row},${col}`;
        if (visited.has(cellKey)) return "#CIRCULAR!";
        
        const rawValue = data[row]?.[col];
        if (rawValue === undefined || rawValue === null || rawValue === "") return "";
        
        if (typeof rawValue === "string" && rawValue.startsWith("=")) {
            visited.add(cellKey);
            return evaluateFormula(rawValue, visited);
        }
        return rawValue;
    }, [data]);

    // Formula evaluation engine
    const evaluateFormula = useCallback((formula, visited = new Set()) => {
        try {
            const expr = formula.substring(1).trim();
            
            // Built-in functions
            const functions = {
                SUM: (args) => {
                    const values = getValuesFromArgs(args, visited);
                    return values.reduce((a, b) => a + (parseFloat(b) || 0), 0);
                },
                AVERAGE: (args) => {
                    const values = getValuesFromArgs(args, visited).filter(v => v !== "" && !isNaN(v));
                    return values.length ? values.reduce((a, b) => a + parseFloat(b), 0) / values.length : 0;
                },
                COUNT: (args) => {
                    const values = getValuesFromArgs(args, visited);
                    return values.filter(v => !isNaN(parseFloat(v))).length;
                },
                COUNTA: (args) => {
                    const values = getValuesFromArgs(args, visited);
                    return values.filter(v => v !== "").length;
                },
                MAX: (args) => {
                    const values = getValuesFromArgs(args, visited).map(v => parseFloat(v) || -Infinity);
                    return Math.max(...values);
                },
                MIN: (args) => {
                    const values = getValuesFromArgs(args, visited).map(v => parseFloat(v) || Infinity);
                    return Math.min(...values);
                },
                IF: (args) => {
                    const [condition, trueVal, falseVal] = args.split(",").map(a => a.trim());
                    const condResult = evaluateExpression(condition, visited);
                    return condResult ? evaluateExpression(trueVal, visited) : evaluateExpression(falseVal, visited);
                },
                SUMIF: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const range = parseRange(parts[0]);
                    const criteria = parts[1].replace(/"/g, "");
                    const sumRange = parts[2] ? parseRange(parts[2]) : range;
                    
                    let sum = 0;
                    range.forEach((cell, i) => {
                        const val = getCellValue(cell.row, cell.col, new Set(visited));
                        if (matchesCriteria(val, criteria)) {
                            const sumCell = sumRange[i] || cell;
                            sum += parseFloat(getCellValue(sumCell.row, sumCell.col, new Set(visited))) || 0;
                        }
                    });
                    return sum;
                },
                COUNTIF: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const range = parseRange(parts[0]);
                    const criteria = parts[1].replace(/"/g, "");
                    
                    return range.filter(cell => {
                        const val = getCellValue(cell.row, cell.col, new Set(visited));
                        return matchesCriteria(val, criteria);
                    }).length;
                },
                AVERAGEIF: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const range = parseRange(parts[0]);
                    const criteria = parts[1].replace(/"/g, "");
                    const avgRange = parts[2] ? parseRange(parts[2]) : range;
                
                    let sum = 0;
                    let count = 0;
                
                    range.forEach((cell, i) => {
                        const val = getCellValue(cell.row, cell.col, new Set(visited));
                
                        if (matchesCriteria(val, criteria)) {
                            const avgCell = avgRange[i] || cell;
                            const num = parseFloat(getCellValue(avgCell.row, avgCell.col, new Set(visited)));
                
                            if (!isNaN(num)) {
                                sum += num;
                                count++;
                            }
                        }
                    });
                
                    return count ? sum / count : 0;
                },
                COUNTIFS: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    let count = 0;
                
                    for (let i = 0; i < parts.length; i += 2) {
                        const range = parseRange(parts[i]);
                        const criteria = parts[i + 1].replace(/"/g, "");
                
                        range.forEach((cell, idx) => {
                            const val = getCellValue(cell.row, cell.col, new Set(visited));
                
                            if (matchesCriteria(val, criteria)) {
                                count++;
                            }
                        });
                    }
                
                    return count;
                },
                VLOOKUP: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const lookupVal = evaluateExpression(parts[0], visited);
                    const range = parseRange(parts[1]);
                    const colIndex = parseInt(parts[2]) - 1;
                    const exactMatch = parts[3]?.toUpperCase() !== "FALSE";
                    
                    // Get unique rows in range
                    const rows = [...new Set(range.map(c => c.row))].sort((a, b) => a - b);
                    const cols = [...new Set(range.map(c => c.col))].sort((a, b) => a - b);
                    
                    for (const row of rows) {
                        const cellVal = getCellValue(row, cols[0], new Set(visited));
                        if (exactMatch ? cellVal == lookupVal : cellVal <= lookupVal) {
                            if (!exactMatch || cellVal == lookupVal) {
                                return getCellValue(row, cols[colIndex], new Set(visited));
                            }
                        }
                    }
                    return "#N/A";
                },
                HLOOKUP: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const lookupVal = evaluateExpression(parts[0], visited);
                    const range = parseRange(parts[1]);
                    const rowIndex = parseInt(parts[2]) - 1;
                    
                    const rows = [...new Set(range.map(c => c.row))].sort((a, b) => a - b);
                    const cols = [...new Set(range.map(c => c.col))].sort((a, b) => a - b);
                    
                    for (const col of cols) {
                        const cellVal = getCellValue(rows[0], col, new Set(visited));
                        if (cellVal == lookupVal) {
                            return getCellValue(rows[rowIndex], col, new Set(visited));
                        }
                    }
                    return "#N/A";
                },
                CONCATENATE: (args) => {
                    return args.split(",").map(a => evaluateExpression(a.trim(), visited)).join("");
                },
                CONCAT: (args) => functions.CONCATENATE(args),
                LEFT: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const text = String(evaluateExpression(parts[0], visited));
                    const num = parseInt(parts[1]) || 1;
                    return text.substring(0, num);
                },
                RIGHT: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const text = String(evaluateExpression(parts[0], visited));
                    const num = parseInt(parts[1]) || 1;
                    return text.substring(text.length - num);
                },
                MID: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const text = String(evaluateExpression(parts[0], visited));
                    const start = parseInt(parts[1]) - 1;
                    const num = parseInt(parts[2]);
                    return text.substring(start, start + num);
                },
                LEN: (args) => String(evaluateExpression(args.trim(), visited)).length,
                TRIM: (args) => String(evaluateExpression(args.trim(), visited)).trim(),
                UPPER: (args) => String(evaluateExpression(args.trim(), visited)).toUpperCase(),
                LOWER: (args) => String(evaluateExpression(args.trim(), visited)).toLowerCase(),
                PROPER: (args) => {
                    const text = String(evaluateExpression(args.trim(), visited));
                    return text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
                },
                ABS: (args) => Math.abs(parseFloat(evaluateExpression(args.trim(), visited)) || 0),
                ROUND: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const num = parseFloat(evaluateExpression(parts[0], visited)) || 0;
                    const decimals = parseInt(parts[1]) || 0;
                    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
                },
                FLOOR: (args) => Math.floor(parseFloat(evaluateExpression(args.trim(), visited)) || 0),
                CEILING: (args) => Math.ceil(parseFloat(evaluateExpression(args.trim(), visited)) || 0),
                SQRT: (args) => Math.sqrt(parseFloat(evaluateExpression(args.trim(), visited)) || 0),
                POWER: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    return Math.pow(
                        parseFloat(evaluateExpression(parts[0], visited)) || 0,
                        parseFloat(evaluateExpression(parts[1], visited)) || 0
                    );
                },
                MOD: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    return (parseFloat(evaluateExpression(parts[0], visited)) || 0) % 
                           (parseFloat(evaluateExpression(parts[1], visited)) || 1);
                },
                NOW: () => new Date().toLocaleString(),
                TODAY: () => new Date().toLocaleDateString(),
                DATE: (args) => {
                    const parts = args.split(",").map(a => parseInt(evaluateExpression(a.trim(), visited)));
                    return new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString();
                },
                YEAR: (args) => new Date(evaluateExpression(args.trim(), visited)).getFullYear(),
                MONTH: (args) => new Date(evaluateExpression(args.trim(), visited)).getMonth() + 1,
                DAY: (args) => new Date(evaluateExpression(args.trim(), visited)).getDate(),
                ISNUMBER: (args) => !isNaN(parseFloat(evaluateExpression(args.trim(), visited))),
                ISTEXT: (args) => typeof evaluateExpression(args.trim(), visited) === "string",
                ISBLANK: (args) => evaluateExpression(args.trim(), visited) === "",
                AND: (args) => args.split(",").every(a => evaluateExpression(a.trim(), visited)),
                OR: (args) => args.split(",").some(a => evaluateExpression(a.trim(), visited)),
                NOT: (args) => !evaluateExpression(args.trim(), visited),
                RAND: () => Math.random(),
                RANDBETWEEN: (args) => {
                    const parts = args.split(",").map(a => parseInt(evaluateExpression(a.trim(), visited)));
                    return Math.floor(Math.random() * (parts[1] - parts[0] + 1)) + parts[0];
                },
                INDEX: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const range = parseRange(parts[0]);
                    const rowNum = parseInt(parts[1]) - 1;
                    const colNum = parseInt(parts[2] || "1") - 1;
                    
                    const rows = [...new Set(range.map(c => c.row))].sort((a, b) => a - b);
                    const cols = [...new Set(range.map(c => c.col))].sort((a, b) => a - b);
                    
                    return getCellValue(rows[rowNum], cols[colNum], new Set(visited));
                },
                MATCH: (args) => {
                    const parts = args.split(",").map(a => a.trim());
                    const lookupVal = evaluateExpression(parts[0], visited);
                    const range = parseRange(parts[1]);
                    
                    for (let i = 0; i < range.length; i++) {
                        if (getCellValue(range[i].row, range[i].col, new Set(visited)) == lookupVal) {
                            return i + 1;
                        }
                    }
                    return "#N/A";
                }
            };

            // Check for function calls
            const funcMatch = expr.match(/^([A-Z]+)\((.*)\)$/i);
            if (funcMatch) {
                const funcName = funcMatch[1].toUpperCase();
                const funcArgs = funcMatch[2];
                if (functions[funcName]) {
                    return functions[funcName](funcArgs);
                }
                return "#NAME?";
            }

            // Otherwise evaluate as expression
            return evaluateExpression(expr, visited);
        } catch (e) {
            console.error("Formula error:", e);
            return "#ERROR!";
        }
    }, [data, getCellValue]);

    // Helper to get values from function arguments
    const getValuesFromArgs = (args, visited) => {
        const values = [];
        const parts = args.split(",").map(a => a.trim());
        
        for (const part of parts) {
            if (part.includes(":")) {
                // Range
                const cells = parseRange(part);
                for (const cell of cells) {
                    values.push(getCellValue(cell.row, cell.col, new Set(visited)));
                }
            } else if (parseCellRef(part)) {
                // Single cell reference
                const cell = parseCellRef(part);
                values.push(getCellValue(cell.row, cell.col, new Set(visited)));
            } else {
                // Literal value
                values.push(part);
            }
        }
        return values;
    };

    // Evaluate mathematical expression
    const evaluateExpression = (expr, visited) => {
        if (!expr || expr === "") return "";
    
        // Handle Excel-style concatenation (&)
        expr = expr.replace(/&/g, "+");
    
        // Handle string literals
        if (expr.startsWith('"') && expr.endsWith('"')) {
            return expr.slice(1, -1);
        }
        
        // Replace cell references with values
        let processedExpr = expr.replace(/([A-Z]+\d+)/gi, (match) => {
            const cell = parseCellRef(match);
            if (cell) {
                const val = getCellValue(cell.row, cell.col, new Set(visited));
                return isNaN(parseFloat(val)) ? `"${val}"` : val;
            }
            return match;
        });

        // Handle comparison operators
        processedExpr = processedExpr
            .replace(/<>/g, "!==")
            .replace(/([^<>!])=/g, "$1===");

        try {
            const result = Function(`"use strict"; return (${processedExpr})`)();

            // ✅ ADD THIS HERE (AFTER evaluation)
            if (typeof result === "string" && Date.parse(result)) {
                const d1 = new Date(result);

                // Try to detect subtraction pattern like B3-B2
                if (expr.includes("-")) {
                    const parts = expr.split("-");
                    if (parts.length === 2) {
                        const d2 = new Date(evaluateExpression(parts[1].trim(), visited));
                        return Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
                    }
                }

                return d1;
            }

            return result;
        } catch {
            return expr;
        }
    };

    // Criteria matching for SUMIF, COUNTIF
    const matchesCriteria = (value, criteria) => {
        if (criteria.startsWith(">=")) return parseFloat(value) >= parseFloat(criteria.slice(2));
        if (criteria.startsWith("<=")) return parseFloat(value) <= parseFloat(criteria.slice(2));
        if (criteria.startsWith("<>")) return value != criteria.slice(2);
        if (criteria.startsWith(">")) return parseFloat(value) > parseFloat(criteria.slice(1));
        if (criteria.startsWith("<")) return parseFloat(value) < parseFloat(criteria.slice(1));
        if (criteria.startsWith("=")) return value == criteria.slice(1);
        if (criteria.includes("*") || criteria.includes("?")) {
            const regex = new RegExp("^" + criteria.replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "i");
            return regex.test(String(value));
        }
        return String(value).toLowerCase() === String(criteria).toLowerCase();
    };

    // Save state for undo
    const saveState = () => {
        setUndoStack(prev => [...prev.slice(-50), JSON.stringify(data)]);
        setRedoStack([]);
    };

    // Update cell with undo support
    const updateCell = (row, col, value) => {
        saveState();
        const updated = data.map((r, i) => 
            i === row ? r.map((c, j) => j === col ? value : c) : [...r]
        );
        updateSheetData(updated);
    };

    // Update multiple cells
    const updateCells = (updates) => {
        saveState();
        const updated = data.map(r => [...r]);
        updates.forEach(({ row, col, value }) => {
            if (updated[row]) updated[row][col] = value;
        });
        updateSheetData(updated);
    };

    // Update sheet data
    const updateSheetData = (newData) => {
        setSheets(prev => prev.map(s => 
            s.id === activeSheetId ? { ...s, data: newData } : s
        ));
    };

    // Undo/Redo
    const undo = () => {
        if (undoStack.length === 0) return;
        const previousState = undoStack[undoStack.length - 1];
        setRedoStack(prev => [...prev, JSON.stringify(data)]);
        setUndoStack(prev => prev.slice(0, -1));
        updateSheetData(JSON.parse(previousState));
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const nextState = redoStack[redoStack.length - 1];
        setUndoStack(prev => [...prev, JSON.stringify(data)]);
        setRedoStack(prev => prev.slice(0, -1));
        updateSheetData(JSON.parse(nextState));
    };

    // Copy/Paste
    const copy = () => {
        if (selectionRange) {
            const copied = [];
            for (let r = selectionRange.startRow; r <= selectionRange.endRow; r++) {
                const row = [];
                for (let c = selectionRange.startCol; c <= selectionRange.endCol; c++) {
                    row.push(data[r][c]);
                }
                copied.push(row);
            }
            setClipboard({ data: copied, range: selectionRange });
        } else {
            setClipboard({ 
                data: [[data[selectedCell.row][selectedCell.col]]], 
                range: { startRow: selectedCell.row, startCol: selectedCell.col, endRow: selectedCell.row, endCol: selectedCell.col }
            });
        }
        setMessage("Copied to clipboard");
        validate("copy");
    };

    const cut = () => {
        copy();
        // Clear original cells after copy
        if (selectionRange) {
            const updates = [];
            for (let r = selectionRange.startRow; r <= selectionRange.endRow; r++) {
                for (let c = selectionRange.startCol; c <= selectionRange.endCol; c++) {
                    updates.push({ row: r, col: c, value: "" });
                }
            }
            updateCells(updates);
        } else {
            updateCell(selectedCell.row, selectedCell.col, "");
        }
        validate("cut");
    };

    const paste = () => {
        if (!clipboard) return;
        saveState();
        const updates = [];
        clipboard.data.forEach((row, rOffset) => {
            row.forEach((value, cOffset) => {
                const targetRow = selectedCell.row + rOffset;
                const targetCol = selectedCell.col + cOffset;
                if (targetRow < data.length && targetCol < data[0].length) {
                    updates.push({ row: targetRow, col: targetCol, value });
                }
            });
        });
        updateCells(updates);
        validate("paste");
    };

    // Format cells
    const formatCell = (property, value) => {
        const key = selectionRange 
            ? `${selectionRange.startRow}-${selectionRange.startCol}-${selectionRange.endRow}-${selectionRange.endCol}`
            : `${selectedCell.row}-${selectedCell.col}`;
        
        setCellFormats(prev => ({
            ...prev,
            [key]: { ...prev[key], [property]: value }
        }));
    };

    const getCellFormat = (row, col) => {
        // Check for range format first, then individual cell
        for (const [key, format] of Object.entries(cellFormats)) {
            const parts = key.split("-").map(Number);
            if (parts.length === 4) {
                const [sr, sc, er, ec] = parts;
                if (row >= sr && row <= er && col >= sc && col <= ec) {
                    return format;
                }
            } else if (parts.length === 2 && parts[0] === row && parts[1] === col) {
                return format;
            }
        }
        return {};
    };

    // Insert/Delete rows and columns
    const insertRow = (index) => {
        saveState();
        const newRow = new Array(data[0].length).fill("");
        const updated = [...data.slice(0, index), newRow, ...data.slice(index)];
        updateSheetData(updated);
    };

    const deleteRow = (index) => {
        if (data.length <= 1) return;
        saveState();
        const updated = data.filter((_, i) => i !== index);
        updateSheetData(updated);
    };

    const insertColumn = (index) => {
        saveState();
        const updated = data.map(row => [...row.slice(0, index), "", ...row.slice(index)]);
        updateSheetData(updated);
    };

    const deleteColumn = (index) => {
        if (data[0].length <= 1) return;
        saveState();
        const updated = data.map(row => row.filter((_, i) => i !== index));
        updateSheetData(updated);
    };

    // Sort data
    const sortData = (colIndex, ascending = true) => {
        saveState();
        const header = data[0];
        const body = data.slice(1).sort((a, b) => {
            const aVal = a[colIndex];
            const bVal = b[colIndex];
            const comparison = isNaN(aVal) || isNaN(bVal)
                ? String(aVal).localeCompare(String(bVal))
                : parseFloat(aVal) - parseFloat(bVal);
            return ascending ? comparison : -comparison;
        });
        updateSheetData([header, ...body]);
        validate("sort");
    };

    // 🗑️ REMOVE DUPLICATES
    const removeDuplicates = () => {
        saveState();
    
        const startRow = selectionRange ? selectionRange.startRow : 1;
        const endRow = selectionRange ? selectionRange.endRow : data.length - 1;
        const startCol = selectionRange ? selectionRange.startCol : 0;
        const endCol = selectionRange ? selectionRange.endCol : data[0].length - 1;
    
        const seen = new Set();
        const updated = [...data];
    
        for (let r = startRow; r <= endRow; r++) {
            const rowSlice = updated[r].slice(startCol, endCol + 1);
            const key = JSON.stringify(rowSlice);
    
            if (seen.has(key)) {
                // ❌ Instead of removing row, CLEAR it (Excel-like behavior in grids)
                updated[r] = new Array(updated[r].length).fill("");
            } else {
                seen.add(key);
            }
        }
    
        updateSheetData(updated);
        validate("remove-duplicates");
    };

    // Filter data
    const [filterColumn, setFilterColumn] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [hiddenRows, setHiddenRows] = useState(new Set());

    const applyFilter = () => {
        if (filterColumn === null || !filterValue) {
            setHiddenRows(new Set());
            return;
        }
        const hidden = new Set();
        data.forEach((row, i) => {
            if (i === 0) return; // Keep header
            if (!String(row[filterColumn]).toLowerCase().includes(filterValue.toLowerCase())) {
                hidden.add(i);
            }
        });
        setHiddenRows(hidden);
        validate("filter");
    };

    // Auto-fill
    const autoFill = (startRow, startCol, endRow, endCol, direction) => {
        saveState();
        const sourceValue = data[startRow][startCol];
        const updates = [];
        
        // Detect pattern
        const numMatch = String(sourceValue).match(/(\d+)/);
        
        if (direction === "down") {
            for (let r = startRow + 1; r <= endRow; r++) {
                let newValue = sourceValue;
                if (numMatch) {
                    const diff = r - startRow;
                    newValue = String(sourceValue).replace(/\d+/, parseInt(numMatch[1]) + diff);
                }
                updates.push({ row: r, col: startCol, value: newValue });
            }
        }
        // Add other directions as needed
        
        updateCells(updates);
    };

    function generateBlankData(rows = 100, cols = 26) {
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => "")
        );
    }

    // Sheet management
    const addSheet = () => {
        const newId = Math.max(...sheets.map(s => s.id)) + 1;

        setSheets(prev => [
            ...prev,
            {
                id: newId,
                name: `Sheet${newId}`,
                data: generateBlankData() // ✅ now blank
            }
        ]);

        setActiveSheetId(newId);
        validate("add-sheet");
    };

    // 🔍 ZOOM CONTROLS
    const handleZoomChange = (value) => {
        const zoom = Math.max(50, Math.min(200, value));
        setZoomLevel(zoom);
        validate("zoom");
    };

    const zoomIn = () => handleZoomChange(zoomLevel + 10);
    const zoomOut = () => handleZoomChange(zoomLevel - 10);

    const renameSheet = (id, name) => {
        setSheets(prev => prev.map(s => s.id === id ? { ...s, name } : s));
    };

    const deleteSheet = (id) => {
        if (sheets.length <= 1) return;
        setSheets(prev => prev.filter(s => s.id !== id));
        if (activeSheetId === id) {
            setActiveSheetId(sheets.find(s => s.id !== id).id);
        }
    };

    // Apply formula from formula bar
    const applyFormula = () => {
        if (selectedCell.row === null) return;
    
        updateCell(selectedCell.row, selectedCell.col, formulaBar);
    
        // ✅ Smart validation (detect formula usage)
        if (formulaBar.startsWith("=")) {
            validate("formula");
        }
    
        setEditingCell(null);
    };

    // 🧮 INSERT FUNCTION
    const insertFunction = (fn) => {
        setFormulaBar(`=${fn}()`);
        setShowFunctionPanel(false);
        validate("insert-function");
    };

    // 🔍 FIND
    const handleFind = () => {
        const matches = [];

        data.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (
                    String(cell)
                        .toLowerCase()
                        .includes(findValue.toLowerCase())
                ) {
                    matches.push({ row: r, col: c });
                }
            });
        });

        setFoundCells(matches);
        setCurrentFindIndex(0);

        if (matches.length > 0) {
            setSelectedCell(matches[0]);
            validate("find");
        }
    };

    // 🔍 NEXT
    const handleFindNext = () => {
        if (!foundCells.length) return;

        const nextIndex = (currentFindIndex + 1) % foundCells.length;
        setCurrentFindIndex(nextIndex);

        const nextCell = foundCells[nextIndex];
        setSelectedCell(nextCell);
    };

    // 🔁 REPLACE ONE
    const handleReplace = () => {
        const cell = foundCells[currentFindIndex];
        if (!cell) return;

        updateCell(cell.row, cell.col, replaceValue);
        validate("replace");
    };

    // 🔁 REPLACE ALL
    const handleReplaceAll = () => {
        const updates = foundCells.map(cell => ({
            row: cell.row,
            col: cell.col,
            value: replaceValue
        }));

        updateCells(updates);
        validate("replace-all");
    };

    // Validation for tutorial
    const validate = (action, payload = {}) => {
        if (!currentStep) return;
        const match = currentStep.action === action &&
            (currentStep.target === undefined || currentStep.target === payload.target);
        if (match) {
            setMessage("✅ Correct!");
            setStepIndex(prev => prev + 1);
        } else {
            setMessage("❌ Follow the instruction");
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case "c": e.preventDefault(); copy(); break;
                    case "x": e.preventDefault(); cut(); break;
                    case "v": e.preventDefault(); paste(); break;
                    case "z": e.preventDefault(); e.shiftKey ? redo() : undo(); break;
                    case "y": e.preventDefault(); redo(); break;
                    case "b": e.preventDefault(); formatCell("fontWeight", "bold"); validate("format-bold"); break;
                    case "i": e.preventDefault(); formatCell("fontStyle", "italic"); validate("format-bold"); break;
                    case "u": e.preventDefault(); formatCell("textDecoration", "underline"); validate("format-bold"); break;
                    case "f": e.preventDefault(); setShowFind(true); validate("find-open"); break;
                    case "h": e.preventDefault(); setShowFind(true); validate("replace-open"); break;
                }
            }
            
            if (!editingCell) {
                switch (e.key) {
                    case "ArrowUp":
                        e.preventDefault();
                        setSelectedCell(prev => ({ ...prev, row: Math.max(0, prev.row - 1) }));
                        break;
                    case "ArrowDown":
                        e.preventDefault();
                        setSelectedCell(prev => ({ ...prev, row: Math.min(data.length - 1, prev.row + 1) }));
                        break;
                    case "ArrowLeft":
                        e.preventDefault();
                        setSelectedCell(prev => ({ ...prev, col: Math.max(0, prev.col - 1) }));
                        break;
                    case "ArrowRight":
                        e.preventDefault();
                        setSelectedCell(prev => ({ ...prev, col: Math.min(data[0].length - 1, prev.col + 1) }));
                        break;
                    case "Enter":
                        e.preventDefault();
                        setEditingCell(selectedCell);
                        setFormulaBar(data[selectedCell.row][selectedCell.col] || "");
                        break;
                    case "Delete":
                    case "Backspace":
                        e.preventDefault();
                        updateCell(selectedCell.row, selectedCell.col, "");
                        break;
                    case "Tab":
                        e.preventDefault();
                        setSelectedCell(prev => ({ 
                            ...prev, 
                            col: e.shiftKey 
                                ? Math.max(0, prev.col - 1) 
                                : Math.min(data[0].length - 1, prev.col + 1) 
                        }));
                        break;
                }
            } else if (e.key === "Escape") {
                setEditingCell(null);
            } else if (e.key === "Enter" && !e.shiftKey) {
                applyFormula();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [editingCell, selectedCell, data]);

    // Update formula bar when cell changes
    useEffect(() => {
        const rawValue = data[selectedCell.row]?.[selectedCell.col];
        setFormulaBar(rawValue !== undefined ? String(rawValue) : "");
    }, [selectedCell, data]);

    // Cell selection handlers
    const handleCellMouseDown = (row, col, e) => {
        if (e.shiftKey && selectedCell) {
            setSelectionRange({
                startRow: Math.min(selectedCell.row, row),
                startCol: Math.min(selectedCell.col, col),
                endRow: Math.max(selectedCell.row, row),
                endCol: Math.max(selectedCell.col, col)
            });
        } else {
            setSelectedCell({ row, col });
            setSelectionRange(null);
            setIsSelecting(true);
        }
    
        setEditingCell(null);
    
        // ✅ FIX HERE
        const cellRef = getCellRef(row, col);
        validate("select-cell", { target: cellRef });
    };

    const handleCellMouseEnter = (row, col) => {
        if (isSelecting) {
            setSelectionRange({
                startRow: Math.min(selectedCell.row, row),
                startCol: Math.min(selectedCell.col, col),
                endRow: Math.max(selectedCell.row, row),
                endCol: Math.max(selectedCell.col, col)
            });
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, []);

    // Check if cell is in selection
    const isInSelection = (row, col) => {
        if (!selectionRange) {
            return selectedCell.row === row && selectedCell.col === col;
        }
        return row >= selectionRange.startRow && row <= selectionRange.endRow &&
               col >= selectionRange.startCol && col <= selectionRange.endCol;
    };

    // Context menu
    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (e, row, col) => {
        e.preventDefault();
        setSelectedCell({ row, col });
        setContextMenu({ x: e.clientX, y: e.clientY, row, col });
    };

    // Render
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const visibleColumns = isMobile ? 6 : 15;
    const visibleRows = isMobile ? 20 : Math.min(data.length, 30);

    return (
        <div 
            className="bg-gray-100 border rounded-xl shadow-lg overflow-hidden flex flex-col h-[100dvh]"
            onClick={() => setContextMenu(null)}
        >
            {/* Title Bar */}
            <div className="bg-green-700 text-white px-4 py-2 flex items-center gap-3">
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="font-semibold">Excel Clone</span>
                <span className="text-sm opacity-75">- {activeSheet?.name}</span>
            </div>

            {/* Quick Access Toolbar */}
            <div className="bg-gray-200 px-3 py-1 flex items-center gap-2 border-b">
                <button onClick={undo} className="p-1 hover:bg-gray-300 rounded" title="Undo (Ctrl+Z)">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                </button>
                <button onClick={redo} className="p-1 hover:bg-gray-300 rounded" title="Redo (Ctrl+Y)">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                    </svg>
                </button>
                <div className="w-px h-4 bg-gray-400" />
                <button 
                    onClick={() => {
                        setMessage("✅ File saved!");
                        validate("save-file");
                    }}
                    className="p-1 hover:bg-gray-300 rounded"
                    title="Save"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </button>
            </div>

            {/* Ribbon Tabs */}
            <div className="bg-gray-50 border-b">
                <div className="flex gap-1 px-2 pt-1">
                    {["file", "home", "insert", "data", "formulas", "view"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                validate("click-tab", { target: tab });
                            }}
                            className={`px-4 py-2 text-sm capitalize rounded-t ${
                                activeTab === tab
                                    ? "bg-white border-t border-l border-r -mb-px font-semibold"
                                    : "hover:bg-gray-200"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Ribbon Content */}
                <div className="bg-white px-2 py-2 border-t">

                    {/* DESKTOP RIBBON */}
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-center min-h-[80px] overflow-x-auto">
                        {activeTab === "home" && (
                            <>
                                {/* Clipboard Group */}
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Clipboard</span>
                                    <div className="flex gap-1">
                                        <button onClick={cut} className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                            ✂️ Cut
                                        </button>
                                        <button onClick={copy} className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                            📋 Copy
                                        </button>
                                        <button onClick={paste} className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                            📄 Paste
                                        </button>
                                    </div>
                                </div>

                                {/* Font Group */}
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Font</span>
                                    <div className="flex gap-1 items-center">
                                        <select className="text-xs border rounded px-1 py-1">
                                            <option>Arial</option>
                                            <option>Calibri</option>
                                            <option>Times New Roman</option>
                                            <option>Courier New</option>
                                        </select>
                                        <select className="text-xs border rounded px-1 py-1 w-14">
                                            {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 36, 48, 72].map(s => (
                                                <option key={s}>{s}</option>
                                            ))}
                                        </select>
                                        <button 
                                            onClick={() => { formatCell("fontWeight", "bold"); validate("format-bold"); }}
                                            className="px-2 py-1 font-bold text-sm bg-gray-100 hover:bg-gray-200 rounded"
                                        >
                                            B
                                        </button>
                                        <button 
                                            onClick={() => { formatCell("fontStyle", "italic"); validate("format-bold"); }}
                                            className="px-2 py-1 italic text-sm bg-gray-100 hover:bg-gray-200 rounded"
                                        >
                                            I
                                        </button>
                                        <button 
                                            onClick={() => { formatCell("textDecoration", "underline"); validate("format-bold"); }}
                                            className="px-2 py-1 underline text-sm bg-gray-100 hover:bg-gray-200 rounded"
                                        >
                                            U
                                        </button>
                                        <input 
                                            type="color" 
                                            className="w-6 h-6 rounded cursor-pointer"
                                            onChange={(e) => formatCell("color", e.target.value)}
                                            title="Font Color"
                                        />
                                        <input 
                                            type="color" 
                                            className="w-6 h-6 rounded cursor-pointer"
                                            onChange={(e) => formatCell("backgroundColor", e.target.value)}
                                            title="Fill Color"
                                        />
                                    </div>
                                </div>

                                {/* Conditional Formatting Group */}
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Styles</span>
                                    <button 
                                        onClick={() => validate("format-conditional")}
                                        className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                                    >
                                        🌈 Conditional Formatting
                                    </button>
                                </div>

                                {/* Alignment Group */}
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Alignment</span>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => formatCell("textAlign", "left")}
                                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                                        >
                                            ⬅️
                                        </button>
                                        <button 
                                            onClick={() => formatCell("textAlign", "center")}
                                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                                        >
                                            ↔️
                                        </button>
                                        <button 
                                            onClick={() => formatCell("textAlign", "right")}
                                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                                        >
                                            ➡️
                                        </button>
                                    </div>
                                </div>

                                {/* Number Format Group */}
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Number</span>
                                    <div className="flex gap-1">
                                        <button className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                            $
                                        </button>
                                        <button className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                            %
                                        </button>
                                        <button className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                            ,
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "insert" && (
                            <>
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Tables</span>
                                    <button 
                                        onClick={() => validate("insert-table")}
                                        className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        📊 Table
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Charts</span>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => validate("insert-chart")}
                                            className="px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                                        >
                                            📈 Column
                                        </button>
                                        <button className="px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600">
                                            📉 Line
                                        </button>
                                        <button className="px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600">
                                            🥧 Pie
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-500">Illustrations</span>
                                    <div className="flex gap-1">
                                        <button className="px-3 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
                                            🖼️ Image
                                        </button>
                                        <button className="px-3 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
                                            ⬜ Shapes
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "data" && (
                            <>
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Sort & Filter</span>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => sortData(selectedCell.col, true)}
                                            className="px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            ⬆️ Sort A-Z
                                        </button>
                                        <button 
                                            onClick={() => sortData(selectedCell.col, false)}
                                            className="px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            ⬇️ Sort Z-A
                                        </button>
                                        <button 
                                            onClick={() => setFilterColumn(selectedCell.col)}
                                            className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            🔍 Filter
                                        </button>
                                    </div>
                                </div>

                                {/* Data Tools Group - NEW */}
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Data Tools</span>
                                    <button 
                                        onClick={removeDuplicates}
                                        className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        🗑️ Remove Duplicates
                                    </button>
                                </div>

                                {filterColumn !== null && (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Filter value..."
                                            value={filterValue}
                                            onChange={(e) => setFilterValue(e.target.value)}
                                            className="border rounded px-2 py-1 text-sm"
                                        />
                                        <button 
                                            onClick={applyFilter}
                                            className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                                        >
                                            Apply
                                        </button>
                                        <button 
                                            onClick={() => { setFilterColumn(null); setFilterValue(""); setHiddenRows(new Set()); }}
                                            className="px-2 py-1 text-sm bg-gray-300 rounded"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "formulas" && (
                            <>
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Function Library</span>
                                    <div className="flex gap-1 flex-wrap">
                                        {["SUM", "AVERAGE", "COUNT", "MAX", "MIN", "IF"].map(fn => (
                                            <button
                                                key={fn}
                                                onClick={() => {
                                                    setFormulaBar(`=${fn}()`);
                                                    validate("formula");
                                                }}
                                                className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                                            >
                                                {fn}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Formula Auditing Group - NEW */}
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Formula Auditing</span>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => validate("formula-audit")}
                                            className="px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded"
                                        >
                                            🔍 Trace Precedents
                                        </button>
                                        <button 
                                            onClick={() => validate("formula-audit")}
                                            className="px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded"
                                        >
                                            🔗 Trace Dependents
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-500">More Functions</span>
                                    <div className="flex gap-1 flex-wrap">
                                        {["VLOOKUP", "HLOOKUP", "INDEX", "MATCH", "SUMIF", "COUNTIF"].map(fn => (
                                            <button
                                                key={fn}
                                                onClick={() => setFormulaBar(`=${fn}()`)}
                                                className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 rounded"
                                            >
                                                {fn}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "view" && (
                            <>
                                <div className="flex flex-col gap-1 pr-3 border-r">
                                    <span className="text-xs text-gray-500">Freeze Panes</span>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => { 
                                                setFrozenRows(selectedCell.row); 
                                                setFrozenCols(selectedCell.col); 
                                                validate("freeze"); 
                                            }}
                                            className="px-3 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            ❄️ Freeze
                                        </button>
                                        <button 
                                            onClick={() => { setFrozenRows(0); setFrozenCols(0); }}
                                            className="px-3 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            Unfreeze
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-500">Show</span>
                                    <div className="flex gap-2">
                                        <label className="flex items-center gap-1 text-sm">
                                            <input type="checkbox" defaultChecked /> Gridlines
                                        </label>
                                        <label className="flex items-center gap-1 text-sm">
                                            <input type="checkbox" defaultChecked /> Headers
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    
                </div>
            </div>

            {/* Formula Bar */}
            <div className="sticky top-0 z-30 flex items-center gap-2 border-b bg-white px-3 py-2">
                <div className="w-16 text-center bg-gray-100 border rounded px-2 py-1 text-sm font-mono">
                    {getCellRef(selectedCell.row, selectedCell.col)}
                </div>
                <button
                    onClick={() => {
                        setShowFunctionPanel(true);
                        validate("open-insert-function");
                    }}
                    className="text-gray-600 font-mono px-2 hover:bg-gray-200 rounded"
                >
                    fx
                </button>
                <input
                    value={formulaBar}
                    onChange={(e) => setFormulaBar(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") applyFormula();
                        if (e.key === "Escape") setEditingCell(null);
                    }}
                    onFocus={() => setEditingCell(selectedCell)}
                    className="flex-1 border-0 outline-none bg-transparent px-2 py-1 font-mono text-sm"
                    placeholder="Enter a value or formula (e.g., =SUM(A1:A5))"
                />
                <button
                    onClick={() => {
                        setFormulaBar('=IF(B2>=60,"Pass","Fail")');
                        validate("formula");
                    }}
                    className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 rounded"
                >
                    IF Example
                </button>
            </div>

            {showFind && (
                <div className="bg-white border-b p-3 flex flex-wrap gap-2 items-center">
                    <input
                        placeholder="Find..."
                        value={findValue}
                        onChange={(e) => setFindValue(e.target.value)}
                        className="border px-2 py-1 text-sm"
                    />

                    <input
                        placeholder="Replace..."
                        value={replaceValue}
                        onChange={(e) => setReplaceValue(e.target.value)}
                        className="border px-2 py-1 text-sm"
                    />

                    <button onClick={handleFind} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                        Find
                    </button>

                    <button onClick={handleFindNext} className="px-2 py-1 bg-gray-200 rounded text-sm">
                        Next
                    </button>

                    <button onClick={handleReplace} className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">
                        Replace
                    </button>

                    <button onClick={handleReplaceAll} className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                        Replace All
                    </button>

                    <button onClick={() => setShowFind(false)} className="px-2 py-1 text-sm">
                        ✖
                    </button>
                </div>
            )}

            {showFunctionPanel && (
                <div className="bg-white border-b p-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">Insert Function</span>
                        <button onClick={() => setShowFunctionPanel(false)}>✖</button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {["SUM", "AVERAGE", "IF", "COUNTIF", "VLOOKUP"].map(fn => (
                            <button
                                key={fn}
                                onClick={() => insertFunction(fn)}
                                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded text-sm"
                            >
                                {fn}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Tutorial Instruction */}
            {currentStep && (
                <div className="px-3 py-2 text-sm text-gray-700 bg-yellow-50 border-b flex items-center gap-2">
                    <span className="text-yellow-600">💡</span>
                    {currentStep.instruction}
                    {message && <span className="ml-auto font-semibold">{message}</span>}
                </div>
            )}

            {/* Grid Container */}
            <div className="flex-1 overflow-auto bg-white touch-pan-x touch-pan-y" ref={gridRef}>   
                <div
                    style={{
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: "top left",
                        width: `${100 / (zoomLevel / 100)}%`,
                    }}
                >
                    <table className="border-collapse text-sm min-w-max">                    
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th
                                    className="bg-gray-200 border border-gray-300 sticky left-0 z-30"
                                    style={{ width: 48, minWidth: 48 }}
                                ></th>                            
                                {Array.from({ length: visibleColumns }, (_, i) => (
                                    <th
                                        key={i}
                                        className={`min-w-24 bg-gray-200 border border-gray-300 text-center py-1 font-normal text-gray-600 select-none cursor-pointer hover:bg-gray-300 ${
                                            selectedCell.col === i ? "bg-blue-100" : ""
                                        }`}
                                        style={{ width: columnWidths[i] || 100 }}
                                        onClick={() => {
                                            // Select entire column
                                            setSelectionRange({
                                                startRow: 0,
                                                startCol: i,
                                                endRow: data.length - 1,
                                                endCol: i
                                            });
                                        }}
                                    >
                                        {getColumnLetter(i)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(0, visibleRows).map((row, rowIndex) => {
                                if (hiddenRows.has(rowIndex)) return null;
                                
                                return (
                                    <tr key={rowIndex}>
                                        <td 
                                            className={`bg-gray-200 border border-gray-300 text-center py-1 font-normal text-gray-600 sticky left-0 z-20 select-none cursor-pointer hover:bg-gray-300 ${
                                                selectedCell.row === rowIndex ? "bg-blue-100" : ""
                                            }`}
                                            style={{ width: 48, minWidth: 48 }}
                                            onClick={() => {
                                                // Select entire row
                                                setSelectionRange({
                                                    startRow: rowIndex,
                                                    startCol: 0,
                                                    endRow: rowIndex,
                                                    endCol: data[0].length - 1
                                                });
                                            }}
                                            onContextMenu={(e) => handleContextMenu(e, rowIndex, -1)}
                                        >
                                            {rowIndex + 1}
                                        </td>
                                        {row.slice(0, visibleColumns).map((cell, colIndex) => {
                                            const isSelected = selectedCell.row === rowIndex && selectedCell.col === colIndex;
                                            const inSelection = isInSelection(rowIndex, colIndex);
                                            const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                                            const format = getCellFormat(rowIndex, colIndex);
                                            const isFound = foundCells.some(
                                                f => f.row === rowIndex && f.col === colIndex
                                            );
                                            
                                            const displayValue = typeof cell === "string" && cell.startsWith("=")
                                                ? getCellValue(rowIndex, colIndex)
                                                : cell;

                                            return (
                                                <td
                                                    key={colIndex}
                                                    className={`border border-gray-300 p-0 relative
                                                        ${isFound ? "bg-yellow-100" : ""}
                                                        ${inSelection ? "bg-blue-50" : ""}
                                                        ${isSelected ? "outline outline-2 outline-blue-500 -outline-offset-1 z-10" : ""}
                                                    `}
                                                    style={{
                                                        width: columnWidths[colIndex] || 100,
                                                        height: rowHeights[rowIndex] || (isMobile ? 40 : 24),
                                                        ...format
                                                    }}
                                                    onMouseDown={(e) => handleCellMouseDown(rowIndex, colIndex, e)}
                                                    onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                                                    onTouchStart={() => handleCellMouseDown(rowIndex, colIndex, { shiftKey: false })}
                                                    onTouchMove={() => handleCellMouseEnter(rowIndex, colIndex)}
                                                    onDoubleClick={() => {
                                                        setEditingCell({ row: rowIndex, col: colIndex });
                                                        setFormulaBar(String(cell || ""));
                                                    }}
                                                    onContextMenu={(e) => handleContextMenu(e, rowIndex, colIndex)}
                                                >
                                                    {isEditing ? (
                                                        <input
                                                            ref={el => { if (el) el.focus(); }}
                                                            value={formulaBar}
                                                            onChange={(e) => setFormulaBar(e.target.value)}
                                                            onBlur={applyFormula}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    applyFormula();
                                                                    setSelectedCell(prev => ({ ...prev, row: prev.row + 1 }));
                                                                }
                                                                if (e.key === "Tab") {
                                                                    e.preventDefault();
                                                                    applyFormula();
                                                                    setSelectedCell(prev => ({ ...prev, col: prev.col + 1 }));
                                                                }
                                                                if (e.key === "Escape") {
                                                                    setEditingCell(null);
                                                                    setFormulaBar(String(cell || ""));
                                                                }
                                                            }}
                                                            className="w-full h-full px-1 outline-none border-0 bg-white"
                                                            style={format}
                                                        />
                                                    ) : (
                                                        <div 
                                                            className="px-1 py-0.5 truncate h-full flex items-center"
                                                            style={format}
                                                        >
                                                            {typeof displayValue === "number" 
                                                                ? displayValue.toLocaleString()
                                                                : displayValue}
                                                        </div>
                                                    )}
                                                    
                                                    {/* Auto-fill handle */}
                                                    {isSelected && !isEditing && (
                                                        <div 
                                                            className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 cursor-crosshair"
                                                            onMouseDown={(e) => {
                                                                e.stopPropagation();
                                                                // Start auto-fill
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <div 
                    className="fixed bg-white border rounded shadow-lg py-1 z-50"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                >
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { cut(); setContextMenu(null); }}
                    >
                        Cut
                    </button>
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { copy(); setContextMenu(null); }}
                    >
                        Copy
                    </button>
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { paste(); setContextMenu(null); }}
                    >
                        Paste
                    </button>
                    <div className="border-t my-1" />
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { insertRow(contextMenu.row); setContextMenu(null); }}
                    >
                        Insert Row Above
                    </button>
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { insertRow(contextMenu.row + 1); setContextMenu(null); }}
                    >
                        Insert Row Below
                    </button>
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { deleteRow(contextMenu.row); setContextMenu(null); }}
                    >
                        Delete Row
                    </button>
                    <div className="border-t my-1" />
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { insertColumn(contextMenu.col); setContextMenu(null); }}
                    >
                        Insert Column Left
                    </button>
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { insertColumn(contextMenu.col + 1); setContextMenu(null); }}
                    >
                        Insert Column Right
                    </button>
                    <button 
                        className="w-full px-4 py-1 text-left text-sm hover:bg-gray-100"
                        onClick={() => { deleteColumn(contextMenu.col); setContextMenu(null); }}
                    >
                        Delete Column
                    </button>
                </div>
            )}

            {/* Sheet Tabs */}
            <div className="bg-gray-200 border-t flex items-center gap-1 px-2 py-1 overflow-x-auto">
                {sheets.map(sheet => (
                    <button
                        key={sheet.id}
                        onClick={() => setActiveSheetId(sheet.id)}
                        onDoubleClick={() => {
                            const newName = prompt("Enter sheet name:", sheet.name);
                            if (newName) renameSheet(sheet.id, newName);
                        }}
                        className={`px-3 py-1 text-sm rounded-t border-t border-l border-r ${
                            activeSheetId === sheet.id
                                ? "bg-white font-semibold -mb-px"
                                : "bg-gray-100 hover:bg-gray-50"
                        }`}
                    >
                        {sheet.name}
                        {sheets.length > 1 && (
                            <span 
                                className="ml-2 text-gray-400 hover:text-red-500"
                                onClick={(e) => { e.stopPropagation(); deleteSheet(sheet.id); }}
                            >
                                ×
                            </span>
                        )}
                    </button>
                ))}
                <button 
                    onClick={addSheet}
                    className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                >
                    +
                </button>
            </div>

            {/* Status Bar */}
            <div className="bg-green-700 text-white px-4 py-1 text-xs flex justify-between items-center">                
                <div className="flex gap-4">
                    {selectionRange && (
                        <>
                            <span>
                                Count: {(() => {
                                    let count = 0;
                                    for (let r = selectionRange.startRow; r <= selectionRange.endRow; r++) {
                                        for (let c = selectionRange.startCol; c <= selectionRange.endCol; c++) {
                                            if (data[r]?.[c] !== "" && data[r]?.[c] !== undefined) count++;
                                        }
                                    }
                                    return count;
                                })()}
                            </span>
                            <span>
                                Sum: {(() => {
                                    let sum = 0;
                                    for (let r = selectionRange.startRow; r <= selectionRange.endRow; r++) {
                                        for (let c = selectionRange.startCol; c <= selectionRange.endCol; c++) {
                                            sum += parseFloat(getCellValue(r, c)) || 0;
                                        }
                                    }
                                    return sum.toLocaleString();
                                })()}
                            </span>
                            <span>
                                Average: {(() => {
                                    let sum = 0, count = 0;
                                    for (let r = selectionRange.startRow; r <= selectionRange.endRow; r++) {
                                        for (let c = selectionRange.startCol; c <= selectionRange.endCol; c++) {
                                            const val = parseFloat(getCellValue(r, c));
                                            if (!isNaN(val)) { sum += val; count++; }
                                        }
                                    }
                                    return count ? (sum / count).toFixed(2) : 0;
                                })()}
                            </span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={zoomOut} className="px-2">➖</button>

                    <input
                        type="range"
                        min="50"
                        max="200"
                        value={zoomLevel}
                        onChange={(e) => handleZoomChange(Number(e.target.value))}
                    />

                    <button onClick={zoomIn} className="px-2">➕</button>

                    <span>{zoomLevel}%</span>
                </div>
            </div>
        </div>
    );
}
