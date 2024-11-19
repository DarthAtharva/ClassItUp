// src/components/ColorFillPicker.jsx
import React, { useState } from "react";
import "./ColorFillPicker.css";

const ColorFillPicker = () => {
  const [selectedColor, setSelectedColor] = useState("#FF5733");
  const [fillType, setFillType] = useState("none");

  // List of color options (based on your UI design)
  const colors = [
    "#FF5733", "#FFBD33", "#FFF233", "#B8FF33", "#33FF57",
    "#33FFF2", "#3385FF", "#5733FF", "#BD33FF", "#FF33A8",
    "#A8A8A8", "#333333"
  ];

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Handle fill type change
  const handleFillTypeChange = (type) => {
    setFillType(type);
  };

  return (
    <div className="color-fill-picker">
      <h3>Select Fill Type and Color</h3>

      {/* Fill Type Selection */}
      <div className="fill-type-options">
        <label>
          <input
            type="radio"
            value="none"
            checked={fillType === "none"}
            onChange={(e) => handleFillTypeChange(e.target.value)}
          />
          None
        </label>
        <label>
          <input
            type="radio"
            value="semi"
            checked={fillType === "semi"}
            onChange={(e) => handleFillTypeChange(e.target.value)}
          />
          Semi
        </label>
        <label>
          <input
            type="radio"
            value="full"
            checked={fillType === "full"}
            onChange={(e) => handleFillTypeChange(e.target.value)}
          />
          Full
        </label>
        <label>
          <input
            type="radio"
            value="pattern"
            checked={fillType === "pattern"}
            onChange={(e) => handleFillTypeChange(e.target.value)}
          />
          Pattern
        </label>
      </div>

      {/* Color Selection */}
      <div className="color-options">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
          ></div>
        ))}
      </div>

      {/* Example Marker with Fill */}
      <div
        className={`example-marker ${fillType}`}
        style={{ backgroundColor: fillType !== "none" ? selectedColor : "transparent" }}
      >
        Example Marker
      </div>
    </div>
  );
};

export default ColorFillPicker;
