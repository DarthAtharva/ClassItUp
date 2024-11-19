import React, { useState } from "react";
import "./DrawShapeButton.css";

const DrawShapeButton = () => {
  const [shape, setShape] = useState("square"); // Default shape is square
  const [size, setSize] = useState(100); // Default size of the shape
  const [color, setColor] = useState("#FF5733"); // Default color for the shape

  // Change the shape based on selection
  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  // Change the size based on input value
  const handleSizeChange = (e) => {
    setSize(Number(e.target.value));
  };

  // Change the color based on the selected color
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Define the shape styles
  const shapeStyle = {
    width: shape === "circle" ? size : "auto",
    height: shape === "circle" ? size : size,
    backgroundColor: color,
    borderRadius: shape === "circle" ? "50%" : "0",
    border: "1px solid #ddd",
  };

  return (
    <div className="draw-shape-container">
      <h3>Draw a Shape</h3>

      {/* Shape Selector */}
      <label>
        Select Shape:
        <select value={shape} onChange={handleShapeChange}>
          <option value="square">Square</option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
        </select>
      </label>

      {/* Size Input */}
      <label>
        Size:
        <input
          type="number"
          min="50"
          max="300"
          value={size}
          onChange={handleSizeChange}
        />
      </label>

      {/* Color Picker */}
      <label>
        Color:
        <input type="color" value={color} onChange={handleColorChange} />
      </label>

      {/* Shape Display */}
      <div className="shape-box" style={shapeStyle}></div>
    </div>
  );
};

export default DrawShapeButton;
