import React, { useState } from "react";
import "./NoteButton.css";

const NoteButton = () => {
  const [noteContent, setNoteContent] = useState("Your Note Here");
  const [color, setColor] = useState("#FF5733");
  const [opacity, setOpacity] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState("Arial");
  const [textAlign, setTextAlign] = useState("left");

  return (
    <div className="note-button">
      <h3>Note Customizer</h3>

      {/* Note Customization Options */}
      <div className="note-controls">
        <label>
          Background Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label>
          Opacity:
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
          />
        </label>
        <label>
          Font Size:
          <input
            type="number"
            min="10"
            max="30"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>
        <label>
          Font Style:
          <select
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>
        </label>
        <label>
          Text Alignment:
          <select
            value={textAlign}
            onChange={(e) => setTextAlign(e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>

      {/* Note Display */}
      <div
        className="note-box"
        style={{
          backgroundColor: color,
          opacity: opacity,
          fontSize: `${fontSize}px`,
          fontFamily: fontStyle,
          textAlign: textAlign,
        }}
        contentEditable
        onInput={(e) => setNoteContent(e.currentTarget.textContent)}
      >
        {noteContent}
      </div>
    </div>
  );
};

export default NoteButton;
