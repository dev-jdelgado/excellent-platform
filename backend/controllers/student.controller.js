const db = require("../config/db"); 

exports.submitPreAssessment = (req, res) => {
    const studentId = req.user.id;
    const { score } = req.body;

    console.log("Submitting pre-assessment:", { studentId, score });

    const query = `
        UPDATE students 
        SET is_completed_preassessment = 1,
            preassessment_score = ?
        WHERE id = ?
    `;

    db.query(query, [score, studentId], (err) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ message: "Failed to save score" });
        }

        res.json({
            message: "Pre-assessment completed successfully",
            score,
        });
    });
};
