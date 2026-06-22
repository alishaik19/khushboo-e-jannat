const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// FORGOT PASSWORD
// =========================
router.post("/forgot-password", async (req, res) => {
  try {
    console.log("FORGOT PASSWORD HIT");
    console.log("EMAIL:", req.body.email);
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("EMAIL ENV:", process.env.EMAIL);
    console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

    const { email } = req.body;

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user ? "YES" : "NO");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    console.log("TOKEN SAVED");

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log("RESET URL:", resetUrl);

    await sendEmail(
      user.email,
      "Password Reset Link",
      `
      <h2>Password Reset Request</h2>
      <a href="${resetUrl}">${resetUrl}</a>
      `,
    );

    console.log("EMAIL SENT");

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.log("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// RESET PASSWORD
// =========================
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ chars with uppercase, lowercase, number & special char",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // ✅ Check if new password is same as old password
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as your current password",
      });
    }

    // ✅ Hash new password
    user.password = await bcrypt.hash(password, 10);

    // ✅ Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log("RESET PASSWORD ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
