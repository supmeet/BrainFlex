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
      console.log("Response for email submit", response);

      const message = response.message.toLowerCase();

      if (message.includes("verification code sent")) {
        alert(response.message);
        setStep(2); // Go to verification step
      } else if (message.includes("set your password")) {
        alert(response.message);
        setStep(3); // Go to set password step
      } else if (message.includes("enter your password")) {
        alert(response.message);
        setStep(4); // Go to login step
      } else {
        alert("Unexpected response. Please try again.");
      }
    } catch (error) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode(email, verificationCode);
      console.log("Response for Code Verification", response);

      if (response.message.toLowerCase().includes("verified successfully")) {
        alert(response.message);
        setStep(3); // Now allow setting password
      } else {
        alert(response.message || "Invalid verification code.");
      }
    } catch (error) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginOrSignup(email, password);
      console.log("Response for Login", response);

      if (response.token) {
        alert(response.message || "Login successful!");
        const userData = {
          username: response.userName, // Assuming response contains username
          token: response.token,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        alert(response.message || "Invalid credentials.");
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

        {/* Step 1: Enter Email */}
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

        {/* Step 2: Enter Verification Code */}
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

        {/* Step 3: Set Password (First-time user after verification) */}
        {step === 3 && (
          <div className="form-container">
            <input
              type="password"
              placeholder="Set your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Set Password</button>
          </div>
        )}

        {/* Step 4: Enter Password (Returning user) */}
        {step === 4 && (
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
