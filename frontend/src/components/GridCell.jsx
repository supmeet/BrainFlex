// src/components/GridCell.jsx
import React from "react";
import "../assets/css/WordWrap.css";

const GridCell = ({ letter, feedback, isActive }) => {
  const getCellClass = () => {
    if (isActive) return "grid-cell active";
    if (feedback === "green") return "grid-cell green";
    if (feedback === "yellow") return "grid-cell yellow";
    if (feedback === "gray") return "grid-cell gray";
    return "grid-cell";
  };

  return <div className={getCellClass()}>{letter}</div>;
};

export default GridCell;
