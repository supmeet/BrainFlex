const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `"BrainFlex Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "BrainFlex Verification Code",
    text: `Your verification code is: ${code}`,
  });
};

module.exports = { sendVerificationEmail };
