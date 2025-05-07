const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // Import the User model
const router = express.Router();

// Authentication System Implementation:
// 1. JWT Token Configuration
//    - Using environment variables for secrets
//    - Token verification middleware
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// 2. Token Verification Middleware
//    - Checks for token in cookies
//    - Verifies token validity
//    - Attaches user data to request
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

// 3. User Registration
//    - Password hashing with bcrypt
//    - Email uniqueness check
//    - User creation in database
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

// 4. Login System
//    - Password comparison
//    - JWT token generation
//    - Secure cookie setting
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

            // 5. Cookie Management
            //    - HTTP-only cookies
            //    - Secure in production
            //    - Strict same-site policy
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

// 6. Protected Routes
//    - Token verification
//    - User data access
//    - Secure endpoints
router.get("/profile", verifyToken, (req, res) => {
    res.json({ 
        username: req.user.username,
        message: "This is a protected route"
    });
});

module.exports = router;