// src/components/UndoRedo.jsx
import React, { useRef, useState } from "react";
import "./UndoRedo.css";

const UndoRedo = () => {
  const canvasRef = useRef(null);
  const history = useRef([]); // History stack
  const redoStack = useRef([]); // Redo stack
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  // Initialize canvas context
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);

    // Set up canvas dimensions
    canvas.width = 500;
    canvas.height = 500;
    context.fillStyle = "#fff"; // White background
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Save the current canvas state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    history.current.push(canvas.toDataURL());
    if (history.current.length > 20) {
      history.current.shift(); // Limit history to 20 actions
    }
    redoStack.current = []; // Clear redo stack on new action
  };

  // Handle undo action
  const undo = () => {
    if (history.current.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Save current state to redo stack
    redoStack.current.push(canvas.toDataURL());

    // Restore the last saved state from history
    const previousState = history.current.pop();
    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  };

  // Handle redo action
  const redo = () => {
    if (redoStack.current.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Save current state to history stack
    history.current.push(canvas.toDataURL());

    // Restore the last saved state from redo stack
    const nextState = redoStack.current.pop();
    const img = new Image();
    img.src = nextState;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  };

  // Handle drawing start
  const startDrawing = (e) => {
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  // Handle drawing in progress
  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#000"; // Black color for drawing
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Handle drawing end
  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    ctx.closePath();
    saveToHistory(); // Save state to history after drawing
  };

  return (
    <div className="undo-redo-container">
      <h3>Undo & Redo</h3>
      <div className="button-container">
        <button onClick={undo} disabled={history.current.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={redoStack.current.length === 0}>
          Redo
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="canvas"
      ></canvas>
      <button onClick={initializeCanvas} className="initialize-button">
        Initialize Canvas
      </button>
    </div>
  );
};

export default UndoRedo;
