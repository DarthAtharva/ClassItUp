// src/components/HandCursorButton.jsx
import React, { useState } from "react";
import "./HandCursorButton.css";

const HandCursorButton = () => {
  const [cursorStyle, setCursorStyle] = useState("default");

  // Handle hand cursor style change
  const handleHandCursorChange = () => {
    setCursorStyle("grab"); // Change to "grab" cursor for hand-like behavior
    document.body.style.cursor = "grab"; // Set cursor globally to "grab"
  };

  // Reset cursor to default
  const resetCursor = () => {
    setCursorStyle("default");
    document.body.style.cursor = "default"; // Reset to default cursor
  };

  return (
    <div className="hand-cursor-container">
      <h3>Select Hand Cursor</h3>
      <div className="cursor-options">
        <button onClick={handleHandCursorChange}>Hand</button>
        <button onClick={resetCursor}>Reset Cursor</button>
      </div>

      <div className="canvas-container">
        <h4>Example Area</h4>
        <div
          className="canvas-example"
          style={{ cursor: cursorStyle }}
        >
          Hover here to see the hand cursor
        </div>
      </div>
    </div>
  );
};

export default HandCursorButton;
