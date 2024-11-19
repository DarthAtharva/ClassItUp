import React, { useState } from 'react';
import './ArrowButton.css';

const ArrowButton = ({ onToolSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleArrowClick = () => {
    setSelected(true);
    onToolSelect('arrow');
  };

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
