// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import UserSection from "./UserSection";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <UserSection />
    </nav>
  );
};

export default Navbar;
