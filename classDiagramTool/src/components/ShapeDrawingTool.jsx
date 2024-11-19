import React, { useState } from "react";
import "./ShapeDrawingTool.css";

const ShapeDrawingTool = () => {
  const [tool, setTool] = useState("rectangle"); // Default tool is rectangle
  const [color, setColor] = useState("#FF5733");
  const [lineWidth, setLineWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);

  // To store the starting coordinates of the drawing
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });

  // Handle tool selection
  const handleToolChange = (e) => {
    setTool(e.target.value);
  };

  // Handle color selection
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Handle line width change
  const handleLineWidthChange = (e) => {
    setLineWidth(Number(e.target.value));
  };

  // Start drawing
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setStart({ x: e.clientX, y: e.clientY });
    setEnd({ x: e.clientX, y: e.clientY });
  };

  // Draw the shape or line
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    setEnd({ x: e.clientX, y: e.clientY });
  };

  // Finish drawing
  const handleMouseUp = () => {
    if (tool !== "line" && tool !== "laser") {
      setShapes([
        ...shapes,
        { tool, start, end, color, lineWidth, key: Date.now() },
      ]);
    }
    setIsDrawing(false);
  };

  // Draw shapes dynamically
  const drawShape = (shape) => {
    const { tool, start, end, color, lineWidth } = shape;

    let width = end.x - start.x;
    let height = end.y - start.y;

    if (tool === "rectangle" || tool === "frame") {
      return (
        <div
          key={shape.key}
          className="drawn-shape"
          style={{
            left: start.x,
            top: start.y,
            width: Math.abs(width),
            height: Math.abs(height),
            border: tool === "frame" ? `${lineWidth}px solid ${color}` : "none",
            backgroundColor: tool === "frame" ? "transparent" : color,
          }}
        />
      );
    } else if (tool === "circle") {
      const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;
      return (
        <div
          key={shape.key}
          className="drawn-shape"
          style={{
            left: start.x - radius,
            top: start.y - radius,
            width: radius * 2,
            height: radius * 2,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      );
    } else if (tool === "line" || tool === "laser") {
      const lineLength = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      return (
        <div
          key={shape.key}
          className="drawn-line"
          style={{
            width: lineLength,
            height: lineWidth,
            backgroundColor: tool === "laser" ? "red" : color,
            transform: `rotate(${angle}rad)`,
            transformOrigin: "0% 0%",
            position: "absolute",
            left: start.x,
            top: start.y,
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="shape-drawing-tool">
      <h3>Shape Drawing Tool</h3>

      {/* Tool Selection */}
      <div className="tools">
        <label>
          Tool:
          <select value={tool} onChange={handleToolChange}>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="line">Line</option>
            <option value="laser">Laser Line</option>
            <option value="frame">Frame</option>
          </select>
        </label>
        <label>
          Color:
          <input type="color" value={color} onChange={handleColorChange} />
        </label>
        <label>
          Line Width:
          <input
            type="number"
            min="1"
            max="10"
            value={lineWidth}
            onChange={handleLineWidthChange}
          />
        </label>
      </div>

      {/* Canvas to draw */}
      <div
        className="drawing-area"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {shapes.map(drawShape)}
        {isDrawing && drawShape({ tool, start, end, color, lineWidth })}
      </div>
    </div>
  );
};

export default ShapeDrawingTool;
