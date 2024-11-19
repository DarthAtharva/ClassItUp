// src/components/LineDrawer.jsx
import React, { useState, useRef, useEffect } from "react";
import "./LineDrawer.css";

const LineDrawer = () => {
  const [lineType, setLineType] = useState("normal");
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  // Handle line type change
  const handleLineTypeChange = (type) => {
    setLineType(type);
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

    // Apply the line type
    if (lineType === "dotted") {
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
    } else if (lineType === "circular") {
      ctx.setLineDash([15, 5]); // Create circular pattern
      ctx.lineWidth = 3;
    } else if (lineType === "narrowWide") {
      ctx.setLineDash([]);
      ctx.lineWidth = 15;
    } else {
      ctx.setLineDash([]);
      ctx.lineWidth = 5;
    }

    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas on render
  }, [lineType]);

  return (
    <div className="line-drawer">
      <h3>Select Line Type</h3>
      <div className="line-type-options">
        <button onClick={() => handleLineTypeChange("normal")}>Normal Line</button>
        <button onClick={() => handleLineTypeChange("dotted")}>Dotted Line</button>
        <button onClick={() => handleLineTypeChange("circular")}>Circular Line</button>
        <button onClick={() => handleLineTypeChange("narrowWide")}>Narrow/Wide Line</button>
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

export default LineDrawer;

// src/App.jsx
import React from "react";
import LineDrawer from "./components/LineDrawer";

const App = () => {
  return (
    <div>
      <h1>ClassItUp - Line Drawing Tool</h1>
      <LineDrawer />
    </div>
  );
};

export default App;
