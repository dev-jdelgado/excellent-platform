const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const db = require("../config/db"); // ✅ FIX
const studentController = require("../controllers/student.controller");

// Get current student
router.get("/me", verifyToken, (req, res) => {
    const query = `
        SELECT 
            id, 
            name, 
            email, 
            excel_expertise,
            preassessment_score,
            is_completed_preassessment 
        FROM students 
        WHERE id = ?
    `;
    db.query(query, [req.user.id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(results[0]);
    });
});

// Submit pre-assessment score
router.post(
    "/pre-assessment/submit",
    verifyToken,
    studentController.submitPreAssessment
);

module.exports = router;
