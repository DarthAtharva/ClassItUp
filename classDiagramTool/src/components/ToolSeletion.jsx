import React, { useState } from 'react';

// The ToolSelector functional component is defined. 
// It provides the logic for managing and selecting tools.

// A state variable activeTool is initialized to null.
// This state keeps track of the currently selected tool.
// setActiveTool is used to update the active tool when a selection is made.
const ToolSelector = () => {
  const [activeTool, setActiveTool] = useState(null);

//   The handleToolSelect function is called when a tool is selected.
// Actions:
// The activeTool state is updated with the selected tool's name.
// A message is logged to the console, confirming the selected tool.

  const handleToolSelect = tool => {
    setActiveTool(tool);
    console.log(`Selected tool: ${tool}`);
  };


//   The component renders the following:
// ArrowButton and TextButton Components:
// These components are passed the handleToolSelect function as a prop (onToolSelect).
// Clicking these buttons triggers the tool selection logic.
// Current Tool Display:
// A paragraph (<p>) dynamically displays the name of the currently active tool using the activeTool state.

  return (
    <div>
      <ArrowButton onToolSelect={handleToolSelect} />
      <TextButton onToolSelect={handleToolSelect} />
      <p>Current Tool: {activeTool}</p>
    </div>
  );
};
// The ToolSelector component is exported, 
// allowing it to be imported and used in other parts of the application.

export default ToolSelector;
