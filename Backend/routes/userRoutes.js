const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("User found:", user.email);
    console.log("DB password:", user.password);
    console.log("Entered password:", password);
    if (user && user.password.trim() === password.trim()) {
        res.json({ token: "fakeToken123", user });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Update Shipping Address
router.put("/shipping/:id", async (req, res) => {
    const { shippingAddress } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { shippingAddress }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
