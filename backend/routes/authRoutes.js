const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // Import the User model
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

// 🔹 SIGNUP ROUTE (Create User)
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 LOGIN ROUTE (Authenticate User)
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // TODO: Replace with your actual user lookup
        // This is a mock user for testing
        const mockUser = {
            username: "testuser",
            password: await bcrypt.hash("password123", 10)
        };

        const isValidPassword = await bcrypt.compare(password, mockUser.password);
        
        if (username === mockUser.username && isValidPassword) {
            // Create JWT token
            const token = jwt.sign(
                { username: mockUser.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            // Set token in HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure in production
                sameSite: "strict",
                maxAge: 3600000 // 1 hour
            });

            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 LOGOUT ROUTE (Logout User)
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
    res.json({ success: true, message: "Logged out successfully" });
});

// 🔹 VERIFY ROUTE (Check Authentication)
router.get("/verify", verifyToken, (req, res) => {
    res.json({ 
        success: true, 
        user: { 
            username: req.user.username 
        } 
    });
});

// 🔹 PROTECTED ROUTE (Check Authentication)
router.get("/profile", verifyToken, (req, res) => {
    res.json({ 
        username: req.user.username,
        message: "This is a protected route"
    });
});

module.exports = router;