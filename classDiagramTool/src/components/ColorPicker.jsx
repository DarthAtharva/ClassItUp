// src/components/ColorPicker.jsx
import React, { useState } from "react";
import "./ColorPicker.css";

const ColorPicker = () => {
  // List of 12 predefined colors (based on your UI design)
  const colors = [
    "#FF5733", // Red
    "#FFBD33", // Orange
    "#FFF233", // Yellow
    "#B8FF33", // Lime
    "#33FF57", // Green
    "#33FFF2", // Cyan
    "#3385FF", // Blue
    "#5733FF", // Purple
    "#BD33FF", // Magenta
    "#FF33A8", // Pink
    "#A8A8A8", // Gray
    "#333333", // Black
  ];

  // State to hold the selected color
  const [selectedColor, setSelectedColor] = useState("#FF5733");

  // Function to handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="color-picker">
      <h3>Select Marker Color</h3>
      <div className="color-options">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-option ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          ></div>
        ))}
      </div>
      <p>Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span></p>
    </div>
  );
};

export default ColorPicker;