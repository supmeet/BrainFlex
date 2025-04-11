// src/components/UserSection.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const UserSection = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUserName(user.username);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName(null);
    setDropdownVisible(false);
    navigate("/login");
  };

  return (
    <div className="user-section">
      {userName ? (
        <div className="user-info" onClick={toggleDropdown}>
          <div className="username-container">
            <span className="username-box">{userName.substring(0, 10)}</span>
            <FaChevronDown className="dropdown-icon" />
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu show">
              <button>Edit Profile</button>
              <button>Game Stats</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <a href="/login" className="login-button">
          Login to Play
        </a>
      )}
    </div>
  );
};

export default UserSection;
