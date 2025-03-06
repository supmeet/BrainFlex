import React from "react";
import logo from "../assets/images/BrainFlex-Logo.webp";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="BrainFlex Logo" className="logo-image" />
        <div className="text-content">
          <h1 className="logo-title">BrainFlex</h1>
          <p className="tagline">Flex Your Brain with Puzzles!</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
