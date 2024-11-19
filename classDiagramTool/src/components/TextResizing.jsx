import React, { useState } from 'react';
import './ResizableText.css';

const ResizableText = () => {
  const [textSize, setTextSize] = useState(16);

  const handleIncrease = () => setTextSize(prev => prev + 2);
  const handleDecrease = () => setTextSize(prev => Math.max(12, prev - 2));

  return (
    <div className="resizable-text">
      <textarea style={{ fontSize: `${textSize}px` }} placeholder="Enter text here" />
      <div className="resize-buttons">
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
      </div>
    </div>
  );
};

export default ResizableText;
