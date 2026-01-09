const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const requirePreAssessment = require('../middleware/preassessment.middleware');

router.get(
    '/dashboard',
    verifyToken,
    requirePreAssessment, // 🚨 BLOCKS BYPASS
    (req, res) => {
        res.json({ message: 'Welcome to dashboard' });
    }
);

module.exports = router;
