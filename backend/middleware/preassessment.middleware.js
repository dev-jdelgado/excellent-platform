module.exports = (req, res, next) => {
    if (!req.user.is_completed_preassessment) {
        return res.status(403).json({
            message: 'Pre-assessment required'
        });
    }
    next();
};
