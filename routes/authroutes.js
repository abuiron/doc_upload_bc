const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert User
        db.query(
            "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
            [name, username, email, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.status(201).json({ message: "User registered successfully" });
            }
        );
    });
});

// User Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error occurred" });
        }

        if (!results || results.length === 0) {
            console.log("Invalid email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, "ADFDFfrgrge4534", { expiresIn: "1h" });

        console.log("Token generated:", token);

        // ✅ Ensure correct response format
        res.status(200).json({ 
            message: "Login successful", 
            token,
            user: { id: user.id, name: user.name, email: user.email } // Include user data if needed
        });
    });
});



module.exports = router;
