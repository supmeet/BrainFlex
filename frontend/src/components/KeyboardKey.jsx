// src/components/KeyboardKey.jsx
import React from "react";
import "../assets/css/WordWrap.css";

const KeyboardKey = ({ letter, onClick }) => {
  return (
    <div className="key" onClick={() => onClick(letter)}>
      {letter === "ENTER" ? "⏎" : letter === "BACKSPACE" ? "⌫" : letter}
    </div>
  );
};

export default KeyboardKey;
