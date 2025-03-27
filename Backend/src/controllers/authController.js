const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/mailer");

// Generate Random Verification Code
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const registerOrLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const userId = new mongoose.Types.ObjectId().toString();
      const verificationCode = generateCode();
      user = await User.create({ userId, email, password, verificationCode });
      await sendVerificationEmail(email, verificationCode);
      return res
        .status(201)
        .json({ message: "Verification code sent to email" });
    }

    if (!user.isVerified) {
      const verificationCode = generateCode();
      user.verificationCode = verificationCode;
      await user.save();
      await sendVerificationEmail(email, verificationCode);
      return res
        .status(200)
        .json({ message: "Verification code sent again. Please verify." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.isVerified)
      return res.status(400).json({ message: "Invalid request" });

    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid code" });

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerOrLogin, verifyCode };
