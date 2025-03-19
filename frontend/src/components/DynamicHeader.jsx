// src/components/DynamicHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/styles.css";

const DynamicHeader = ({ logo, title, tagline }) => {
  return (
    <header className="dynamic-header">
      <div className="left-section">
        <Link to="/" className="home-button">
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
        <div className="profile-icon" onClick={() => toggleDropdown()}>
          <img src="/user.png" alt="Profile" />
        </div>
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

const toggleDropdown = () => {
  const dropdown = document.querySelector(".dropdown-menu");
  dropdown.classList.toggle("show");
};

export default DynamicHeader;
