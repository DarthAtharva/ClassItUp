import React, { useState } from 'react';
import './TextButton.css';

// The TextButton component is declared. It receives onToolSelect as a prop, 
// which will be invoked when the text tool is selected.


//   A state variable selected is initialized to false.
// This state tracks whether the button is currently selected.
// setSelected is the function to update this state.


const TextButton = ({ onToolSelect }) => {
  const [selected, setSelected] = useState(false);


// The handleTextClick function is triggered when the button is clicked.
// Actions:
// The state selected is set to true to indicate that the button is now selected.
// The onToolSelect function is invoked with 'text' as the argument to notify the 
// parent component that the "text" tool is selected.


  const handleTextClick = () => {
    setSelected(true);
    onToolSelect('text');
  };

//   A button element is rendered.
// Dynamic Classes:
// The class name tool-button is always applied. If selected is true, the selected class is also added.
// Click Handling:
// When the button is clicked, the handleTextClick function is executed.
// Text:
// The button label is "Add Text."

  return (
    <button
      className={`tool-button ${selected ? 'selected' : ''}`}
      onClick={handleTextClick}
    >
      Add Text
    </button>
  );
};

// The TextButton component is exported, making it usable in other parts of the application.
export default TextButton;
