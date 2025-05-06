require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const workoutRoutes = require("./routes/workoutRoutes"); // Modular routes
const authRoutes = require("./routes/authRoutes"); // Auth routes
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser()); // Enable cookie parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// JWT Middleware for Secure Routes
const verifyToken = (req, res, next) => {
    const token = req.cookies.sessionToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded; // Attach user data to request
        next();
    });
};

// Authentication Route (Login)
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    // Mock user validation (Replace with database lookup)
    if (username === "testuser" && password === "password123") {
        const token = jwt.sign({ username, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("sessionToken", token, { httpOnly: true, secure: false, maxAge: 3600000 });
        return res.json({ success: true, token });
    } else {
        return res.status(400).json({ error: "Invalid credentials" });
    }
});

// Protected Profile Route (Only accessible with JWT)
app.get("/api/profile", verifyToken, (req, res) => {
    res.json({ username: req.user.username, role: req.user.role });
});

// Use modular routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));