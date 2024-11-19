import React, { useState } from 'react';
import './TextButton.css';

const TextButton = ({ onToolSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleTextClick = () => {
    setSelected(true);
    onToolSelect('text');
  };

  return (
    <button
      className={`tool-button ${selected ? 'selected' : ''}`}
      onClick={handleTextClick}
    >
      Add Text
    </button>
  );
};

export default TextButton;
