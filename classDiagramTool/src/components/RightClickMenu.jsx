import React, { useState, useRef } from "react";
import "./RightClickMenu.css";

const RightClickMenu = () => {
  const [contextMenu, setContextMenu] = useState(null); // Store context menu position
  const [selectedObject, setSelectedObject] = useState(null); // Object that is right-clicked
  const [objects, setObjects] = useState([]); // List of drawn objects

  const canvasRef = useRef(null);

  // Create an object to add on the canvas
  const addObject = (x, y) => {
    setObjects([
      ...objects,
      { id: Date.now(), x, y, type: "rectangle", width: 100, height: 100, color: "#FF5733" },
    ]);
  };

  // Handle right-click to show the context menu
  const handleRightClick = (e, obj) => {
    e.preventDefault(); // Prevent default context menu
    setSelectedObject(obj); // Set the object that is clicked
    setContextMenu({ x: e.clientX, y: e.clientY }); // Position context menu at mouse position
  };

  // Close context menu when clicking outside
  const handleClickOutside = (e) => {
    if (canvasRef.current && !canvasRef.current.contains(e.target)) {
      setContextMenu(null);
    }
  };

  // Handle paste action
  const handlePaste = () => {
    if (selectedObject) {
      addObject(selectedObject.x + 20, selectedObject.y + 20);
    }
    setContextMenu(null);
  };

  // Handle cut action
  const handleCut = () => {
    if (selectedObject) {
      setObjects(objects.filter((obj) => obj.id !== selectedObject.id));
    }
    setContextMenu(null);
  };

  // Handle copy action
  const handleCopy = () => {
    if (selectedObject) {
      const copiedObj = { ...selectedObject, id: Date.now(), x: selectedObject.x + 20, y: selectedObject.y + 20 };
      setObjects([...objects, copiedObj]);
    }
    setContextMenu(null);
  };

  // Handle delete action
  const handleDelete = () => {
    if (selectedObject) {
      setObjects(objects.filter((obj) => obj.id !== selectedObject.id));
    }
    setContextMenu(null);
  };

  // Handle duplicate action
  const handleDuplicate = () => {
    if (selectedObject) {
      const duplicateObj = { ...selectedObject, id: Date.now(), x: selectedObject.x + 20, y: selectedObject.y + 20 };
      setObjects([...objects, duplicateObj]);
    }
    setContextMenu(null);
  };

  // Export object as SVG, PNG, or JSON
  const exportObject = (format) => {
    if (selectedObject) {
      if (format === "svg") {
        // Export as SVG (this is a simple example; you can improve it)
        console.log("Exporting as SVG");
      } else if (format === "png") {
        // Export as PNG
        console.log("Exporting as PNG");
      } else if (format === "json") {
        // Export as JSON
        console.log("Exporting as JSON:", selectedObject);
      }
    }
    setContextMenu(null);
  };

  // Render the context menu
  const renderContextMenu = () => {
    if (!contextMenu) return null;
    return (
      <ul className="context-menu" style={{ left: contextMenu.x, top: contextMenu.y }}>
        <li onClick={handlePaste}>Paste</li>
        <li onClick={handleCut}>Cut</li>
        <li onClick={handleCopy}>Copy</li>
        <li onClick={handleDelete}>Delete</li>
        <li onClick={handleDuplicate}>Duplicate</li>
        <li onClick={() => exportObject("svg")}>Export as SVG</li>
        <li onClick={() => exportObject("png")}>Export as PNG</li>
        <li onClick={() => exportObject("json")}>Export as JSON</li>
      </ul>
    );
  };

  return (
    <div className="canvas-container" ref={canvasRef} onClick={handleClickOutside}>
      <h3>Right Click Menu Example</h3>
      <div className="drawing-area">
        {objects.map((obj) => (
          <div
            key={obj.id}
            className="object"
            style={{
              left: obj.x,
              top: obj.y,
              width: obj.width,
              height: obj.height,
              backgroundColor: obj.color,
            }}
            onContextMenu={(e) => handleRightClick(e, obj)}
          />
        ))}
      </div>
      {renderContextMenu()}
    </div>
  );
};

export default RightClickMenu;
