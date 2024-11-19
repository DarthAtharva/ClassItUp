// src/components/CursorSelector.jsx
import React, { useState } from "react";
import "./CursorSelector.css";

const CursorSelector = () => {
  const [cursorStyle, setCursorStyle] = useState("default");

  // Handle cursor style change
  const handleCursorChange = (style) => {
    setCursorStyle(style);
  };

  // Apply the selected cursor style to the body or canvas
  const setCursor = (style) => {
    document.body.style.cursor = style;
  };

  return (
    <div className="cursor-selector">
      <h3>Select Cursor Style</h3>
      <div className="cursor-options">
        <button
          onClick={() => {
            handleCursorChange("pointer");
            setCursor("pointer");
          }}
        >
          Pointer
        </button>
        <button
          onClick={() => {
            handleCursorChange("crosshair");
            setCursor("crosshair");
          }}
        >
          Crosshair
        </button>
        <button
          onClick={() => {
            handleCursorChange("grab");
            setCursor("grab");
          }}
        >
          Grab
        </button>
        <button
          onClick={() => {
            handleCursorChange("move");
            setCursor("move");
          }}
        >
          Move
        </button>
        <button
          onClick={() => {
            handleCursorChange("wait");
            setCursor("wait");
          }}
        >
          Wait
        </button>
        <button
          onClick={() => {
            handleCursorChange("default");
            setCursor("default");
          }}
        >
          Default
        </button>
      </div>

      <div className="canvas-container">
        <h4>Cursor Example Area</h4>
        <div
          className="canvas-example"
          style={{ cursor: cursorStyle }}
        >
          Hover here to see the selected cursor
        </div>
      </div>
    </div>
  );
};

export default CursorSelector;
// src/App.jsx
import React from "react";
import CursorSelector from "./components/CursorSelector";

const App = () => {
  return (
    <div>
      <h1>ClassItUp - Cursor Selector</h1>
      <CursorSelector />
    </div>
  );
};

export default App;
