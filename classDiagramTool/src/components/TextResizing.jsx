import React, { useState } from 'react';
import './ResizableText.css';

// The ResizableText functional component is defined.
// A state variable textSize is initialized with the default value of 16.
// setTextSize is a function to update the font size.

const ResizableText = () => {
  const [textSize, setTextSize] = useState(16);

//   handleIncrease is a function to increment the font size by 2 pixels.
// It uses the previous state (prev) and adds 2 to it.

  const handleIncrease = () => setTextSize(prev => prev + 2);

//   handleDecrease decrements the font size by 2 pixels.
// The Math.max function ensures that the font size does not go below 12.

  const handleDecrease = () => setTextSize(prev => Math.max(12, prev - 2));


//   A container <div> wraps the component elements.
// Text Area:
// The <textarea> element dynamically applies the font size from textSize.
// The placeholder provides initial guidance to the user.
// Buttons:
// Two <button> elements allow the user to increase or decrease the font size by 
// triggering the respective functions (handleIncrease and handleDecrease).

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

// The ResizableText component is exported for use in other parts of the application.
export default ResizableText;
