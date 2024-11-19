import React, { useState } from 'react';

const ToolSelector = () => {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolSelect = tool => {
    setActiveTool(tool);
    console.log(`Selected tool: ${tool}`);
  };

  return (
    <div>
      <ArrowButton onToolSelect={handleToolSelect} />
      <TextButton onToolSelect={handleToolSelect} />
      <p>Current Tool: {activeTool}</p>
    </div>
  );
};

export default ToolSelector;
