// src/components/DynamicHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/styles.css";
import UserSection from "./UserSection"; // Import the UserSection component

const DynamicHeader = ({ logo, title, tagline }) => {
  return (
    <header className="dynamic-header">
      <div className="left-section">
        <Link to="/" className="home-button button-style">
          Back to Home
        </Link>
      </div>
      <div className="center-section">
        <img src={logo} alt={`${title} Logo`} className="game-logo" />
        <div className="text-content">
          <h1 className="game-title">{title}</h1>
          <p className="game-tagline">{tagline}</p>
        </div>
      </div>
      <div className="right-section">
        <UserSection /> {/* Add the UserSection component here */}
      </div>
    </header>
  );
};

export default DynamicHeader;
