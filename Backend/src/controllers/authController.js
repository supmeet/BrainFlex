// auth.js (API endpoints)
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/mailer");
const mongoose = require("mongoose");

// Generate Random Verification Code
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const registerOrLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // New User - Send Verification
    if (!user) {
      const userId = new mongoose.Types.ObjectId().toString();
      const verificationCode = generateCode();

      // Create user with validateBeforeSave: false to bypass password requirement
      user = new User({
        userId,
        email,
        password: null,
        verificationCode,
        isVerified: false,
      });
      await user.save({ validateBeforeSave: false });

      await sendVerificationEmail(email, verificationCode);
      return res.status(201).json({
        message: "Verification code sent to email.",
        userId: user.userId,
      });
    }

    // If Not Verified - Re-send Verification
    if (!user.isVerified) {
      const verificationCode = generateCode();
      user.verificationCode = verificationCode;
      await user.save({ validateBeforeSave: false });
      await sendVerificationEmail(email, verificationCode);
      return res.status(200).json({
        message: "Verification code sent again. Please verify.",
        userId: user.userId,
      });
    }

    // If Verified But No Password Sent Yet
    if (!password) {
      return res.status(200).json({
        message: "User verified. Enter your password.",
        userId: user.userId,
      });
    }

    // If Verified but Password Not Yet Set
    if (!user.password) {
      user.password = password; // Will be hashed by pre-save middleware
      await user.save(); // Now we want validation

      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        token,
        userId: user.userId,
        message: "Password set successfully. You can now log in.",
      });
    }

    // Already Has Password - Compare for Login
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      token,
      userId: user.userId,
      userName: user.userName,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Error in registerOrLogin:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save({ validateBeforeSave: false }); // Skip validation here

    return res.status(200).json({
      message: "User verified successfully",
      userId: user.userId,
    });
  } catch (error) {
    console.error("Error in verifyCode:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = { registerOrLogin, verifyCode };
