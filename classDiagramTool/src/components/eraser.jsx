// src/components/EraserButton.jsx
import React, { useState, useRef } from "react";
import "./EraserButton.css";

const EraserButton = () => {
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [objects, setObjects] = useState([]); // Store objects that can be erased
  const canvasRef = useRef(null);

  // Toggle eraser mode
  const toggleEraser = () => {
    setIsEraserActive(!isEraserActive);
    if (!isEraserActive) {
      document.body.style.cursor = "url('eraser-cursor.png'), auto"; // Change cursor to eraser icon
    } else {
      document.body.style.cursor = "default"; // Reset cursor
    }
  };

  // Add an object to the canvas (for testing purposes)
  const addObject = () => {
    const newObject = {
      id: objects.length + 1,
      type: "circle", // You can add different types (circle, rectangle, etc.)
      x: Math.random() * 400,
      y: Math.random() * 400,
      radius: 30,
    };
    setObjects([...objects, newObject]);
  };

  // Handle erasing object
  const eraseObject = (e) => {
    if (!isEraserActive) return; // Only erase if eraser is active
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if any object is clicked
    const objectIndex = objects.findIndex((obj) => {
      if (obj.type === "circle") {
        const distance = Math.sqrt(
          Math.pow(mouseX - obj.x, 2) + Math.pow(mouseY - obj.y, 2)
        );
        return distance <= obj.radius; // If clicked within the radius of the circle
      }
      // Add other object types if necessary (e.g., rectangle)
      return false;
    });

    if (objectIndex !== -1) {
      // Remove the object from the state
      const updatedObjects = objects.filter((_, index) => index !== objectIndex);
      setObjects(updatedObjects);
    }
  };

  return (
    <div className="eraser-button-container">
      <h3>Eraser Button</h3>
      <div className="button-container">
        <button onClick={toggleEraser}>
          {isEraserActive ? "Deactivate Eraser" : "Activate Eraser"}
        </button>
        <button onClick={addObject}>Add Object</button>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          style={{ border: "1px solid #333" }}
          onClick={eraseObject}
        ></canvas>
      </div>

      <div>
        <h4>Objects:</h4>
        <ul>
          {objects.map((obj, index) => (
            <li key={index}>
              Object {obj.id} - Type: {obj.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EraserButton;
