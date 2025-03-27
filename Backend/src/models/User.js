const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
