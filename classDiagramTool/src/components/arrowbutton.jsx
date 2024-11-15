// src/components/ArrowButton.jsx
import React, { useState, useRef } from "react";
import "./ArrowButton.css";

const ArrowButton = () => {
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const canvasRef = useRef(null);

  // Toggle arrow drawing mode
  const toggleArrow = () => {
    setIsArrowActive(!isArrowActive);
    if (!isArrowActive) {
      document.body.style.cursor = "crosshair"; // Change cursor to crosshair for drawing
    } else {
      document.body.style.cursor = "default"; // Reset cursor
    }
  };

  // Start drawing the arrow
  const startDrawing = (e) => {
    if (!isArrowActive) return; // Only draw if arrow mode is active
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });
    setDrawing(true);
  };

  // Stop drawing the arrow and draw it
  const stopDrawing = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    // Draw arrow from start to end point
    drawArrow(ctx, startPos.x, startPos.y, endX, endY);
    setDrawing(false);
    setStartPos(null);
  };

  // Draw arrow on the canvas
  const drawArrow = (ctx, startX, startY, endX, endY) => {
    const arrowLength = 15; // Length of the arrowhead
    const arrowAngle = Math.atan2(endY - startY, endX - startX); // Calculate angle of the arrow

    // Draw the line (shaft of the arrow)
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "#000"; // Set line color
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the arrowhead (triangle)
    const arrowHeadAngle1 = arrowAngle + Math.PI / 6;
    const arrowHeadAngle2 = arrowAngle - Math.PI / 6;

    const arrowHeadX1 = endX - arrowLength * Math.cos(arrowHeadAngle1);
    const arrowHeadY1 = endY - arrowLength * Math.sin(arrowHeadAngle1);

    const arrowHeadX2 = endX - arrowLength * Math.cos(arrowHeadAngle2);
    const arrowHeadY2 = endY - arrowLength * Math.sin(arrowHeadAngle2);

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(arrowHeadX1, arrowHeadY1);
    ctx.lineTo(arrowHeadX2, arrowHeadY2);
    ctx.lineTo(endX, endY);
    ctx.fillStyle = "#000"; // Arrowhead color
    ctx.fill();
  };

  return (
    <div className="arrow-button-container">
      <h3>Arrow Button</h3>
      <div className="button-container">
        <button onClick={toggleArrow}>
          {isArrowActive ? "Deactivate Arrow" : "Activate Arrow"}
        </button>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          style={{ border: "1px solid #333" }}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        ></canvas>
      </div>
    </div>
  );
};

export default ArrowButton;

// src/App.jsx
import React from "react";
import ArrowButton from "./components/ArrowButton";

const App = () => {
  return (
    <div>
      <h1>ClassItUp - Arrow Drawing</h1>
      <ArrowButton />
    </div>
  );
};

export default App;
