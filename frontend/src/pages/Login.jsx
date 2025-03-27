import React, { useState } from "react";
import "../assets/css/styles.css";
import { loginOrSignup, verifyCode } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const response = await loginOrSignup(email);
      if (response.needsVerification) {
        alert("Verification code sent to your email.");
        setStep(2);
      } else {
        alert("User verified. Please enter your password.");
        setStep(3);
      }
    } catch (error) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode(email, verificationCode);
      if (response.success) {
        alert("Verification successful. Please set your password.");
        setStep(3);
      } else {
        alert(response.message || "Invalid verification code. Try again.");
      }
    } catch (error) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginOrSignup(email, password);
      if (response.success) {
        alert("Login successful! Redirecting to dashboard.");
        navigate("/");
      } else {
        alert(response.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="home-container">
      <div className="main-content">
        <h1 className="logo-title">Welcome to BrainFlex</h1>
        <p className="tagline">Login to play and challenge your mind!</p>

        {step === 1 && (
          <div className="form-container">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmailSubmit}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="form-container">
            <p>We’ve sent a verification code to your email.</p>
            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleVerifyCode}>Verify</button>
          </div>
        )}

        {step === 3 && (
          <div className="form-container">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
