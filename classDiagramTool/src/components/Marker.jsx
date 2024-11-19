// src/components/MarkerButton.jsx
import React, { useState, useRef } from "react";
import "./MarkerButton.css";

const MarkerButton = () => {
  const [isMarkerActive, setIsMarkerActive] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // Handle the marker button click
  const toggleMarker = () => {
    setIsMarkerActive(!isMarkerActive);
    if (!isMarkerActive) {
      document.body.style.cursor = "url('marker-cursor.png'), auto"; // Change cursor to marker (pen/pencil)
    } else {
      document.body.style.cursor = "default"; // Reset cursor
    }
  };

  // Start drawing
  const startDrawing = (e) => {
    if (!isMarkerActive) return; // Only draw if marker is active
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
    setDrawing(true);
  };

  // Stop drawing
  const stopDrawing = () => {
    setDrawing(false);
  };

  // Draw on the canvas
  const draw = (e) => {
    if (!drawing || !isMarkerActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    setLastX(currentX);
    setLastY(currentY);
  };

  return (
    <div className="marker-button-container">
      <h3>Marker Button</h3>
      <div className="button-container">
        <button onClick={toggleMarker}>
          {isMarkerActive ? "Deactivate Marker" : "Activate Marker"}
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
          onMouseMove={draw}
        ></canvas>
      </div>
    </div>
  );
};

export default MarkerButton;
