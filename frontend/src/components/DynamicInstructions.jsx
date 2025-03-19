// src/components/DynamicInstructions.jsx
import React from "react";
import "../assets/css/styles.css"; // Ensure this path is correct

const DynamicInstructions = ({ title, instructions }) => {
  return (
    <div className="instructions-container">
      <h2>{title}</h2>
      <ul>
        {instructions.map((instruction, index) => (
          <li key={index}>
            {instruction.text}
            {instruction.subInstructions && (
              <ul>
                {instruction.subInstructions.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <span className={sub.color}>{sub.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicInstructions;
