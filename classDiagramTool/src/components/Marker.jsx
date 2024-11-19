// src/components/MarkerSizeAdjuster.jsx
import React, { useState, useRef, useEffect } from "react";
import "./MarkerSizeAdjuster.css";

const MarkerSizeAdjuster = () => {
  const [markerSize, setMarkerSize] = useState("normal");
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  // Handle size change
  const handleSizeChange = (size) => {
    setMarkerSize(size);
  };

  // Line width based on selected size
  const getLineWidth = () => {
    switch (markerSize) {
      case "small":
        return 2;
      case "large":
        return 5;
      case "XL":
        return 10;
      default:
        return 3; // Default width
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
    setDrawing(true);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const drawLine = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous lines

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    ctx.lineWidth = getLineWidth(); // Set the line width based on marker size
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas on render
  }, [markerSize]);

  return (
    <div className="marker-size-adjuster">
      <h3>Select Marker Size</h3>
      <div className="size-options">
        <button onClick={() => handleSizeChange("small")}>Small</button>
        <button onClick={() => handleSizeChange("large")}>Large</button>
        <button onClick={() => handleSizeChange("XL")}>XL</button>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          style={{ border: "1px solid #333" }}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={drawLine}
        ></canvas>
      </div>
    </div>
  );
};

export default MarkerSizeAdjuster;
