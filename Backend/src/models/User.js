// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    default: null,
    // Modify the required validation to be more flexible
    required: function () {
      // Password is required only if user is verified and trying to save with null password
      return this.isVerified && this.password === null;
    },
  },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  userName: { type: String, unique: true },
  fullName: { type: String },
  mobileNo: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
});

// Generate username before saving
userSchema.pre("save", function (next) {
  if (!this.userName) {
    this.userName = `Brainy${this.userId}`;
  }
  next();
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Add method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);
