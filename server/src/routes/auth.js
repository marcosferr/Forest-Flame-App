const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // If user not found, return error
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Compare password with hashed password in database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If password is invalid, return error
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  // Return token
  res.json({ token });
});
router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    email,
    password: hashedPassword,
    role: role || "user",
  });

  // Save user to database
  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  // Return token
  res.json({ token });
});

module.exports = router;
