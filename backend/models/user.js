const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * User Model
 * @author Halim
 * 
 * This schema implements secure user data management:
 * 
 * 1. Data Structure
 * - Unique username and email constraints
 * - Required field validation
 * - Secure password storage
 * 
 * 2. Security Features
 * - Pre-save password hashing
 * - 10 rounds of bcrypt salting
 * - Schema-level validation
 * 
 * 3. Database Optimization
 * - Indexed fields for efficient queries
 * - Unique constraints for data integrity
 * - Mongoose middleware integration
 */
const UserSchema = new mongoose.Schema({
    // Username field with unique index for fast lookups
    // Required field ensures every user has a username
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    
    // Email field with unique index for user identification
    // Required field ensures every user has an email
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    
    // Password field for secure authentication
    // Required field ensures every user has a password
    password: { 
        type: String, 
        required: true 
    },
});

/**
 * Pre-save Middleware
 * This hook automatically hashes the password before saving to the database
 * Features:
 * - Only hashes if password is modified
 * - Uses bcrypt for secure hashing
 * - 10 rounds of salting for security
 */
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", UserSchema);