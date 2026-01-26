// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");

const app = express();

/**
 * CORS
 * - Allows your Vercel frontend + localhost
 * - Also allows requests with NO Origin header (UptimeRobot/curl/server-to-server)
 */
const allowedOrigins = [
    process.env.FRONTEND_URL, // e.g. https://queuing-app.vercel.app
    "http://localhost:5173",
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
        // Allow requests with no Origin (health checks, server-to-server, curl, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) return callback(null, true);

        return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

// If you're behind proxies (Render), this helps correct IP/proto in some cases
app.set("trust proxy", 1);

app.use(express.json());

/**
 * Routes
 */
app.use("/api", authRoutes);
app.use("/api/students", studentRoutes);

/**
 * Root + Health routes (use /health for keep-alive pings)
 */
app.get("/", (req, res) => res.send("EXCELLENT API is running"));

app.get("/health", (req, res) => {
    res.status(200).json({
        ok: true,
        status: "up",
        service: "EXCELLENT API",
        timestamp: new Date().toISOString(),
    });
});

/**
 * 404 handler
 */
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
    console.error(err.stack || err);
    res.status(500).json({
        message: "Internal Server Error",
        // comment out in production if you want:
        error: process.env.NODE_ENV === "production" ? undefined : String(err),
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
