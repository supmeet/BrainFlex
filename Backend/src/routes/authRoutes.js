const express = require("express");
const {
  registerOrLogin,
  verifyCode,
} = require("../controllers/authController");

const router = express.Router();

router.post("/loginreg", registerOrLogin);
router.post("/verify", verifyCode);

module.exports = router;
