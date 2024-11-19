// The React library is imported to define a React functional component.
// useState is imported from React to manage the button's state.
// The CSS file ArrowButton.css is imported to style the button.

import React, { useState } from 'react';
import './ArrowButton.css';

// The ArrowButton component is declared. It accepts onToolSelect as a prop, 
// which is a function that will be called when the tool (arrow) is selected.


//   A state variable selected is initialized to false using the useState hook.
// setSelected is used to update the state. This state determines if the button is "selected."

const ArrowButton = ({ onToolSelect }) => {
  const [selected, setSelected] = useState(false);



// The handleArrowClick function is executed when the button is clicked.
// Actions:
// The state selected is set to true using setSelected.
// The onToolSelect function is called with the argument 'arrow', 
// notifying the parent component that the "arrow" tool is selected.

  const handleArrowClick = () => {
    setSelected(true);
    onToolSelect('arrow');
  };


//  A button element is rendered on the screen.
// Dynamic Classes:
// The button's class name includes tool-button always, and selected is conditionally added if the selected state is true.
// Click Handling:
// When clicked, the handleArrowClick function is triggered.
// Text:
// The button's label is "Draw Arrow."
  return (
    <button
      className={`tool-button ${selected ? 'selected' : ''}`}
      onClick={handleArrowClick}
    >
      Draw Arrow
    </button>
  );
};

export default ArrowButton;
