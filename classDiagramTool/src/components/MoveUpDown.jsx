// src/components/PageOrder.jsx
import React, { useState } from "react";

const PageOrder = () => {
  // Initial list of pages
  const [pages, setPages] = useState([
    { id: 1, name: "Home" },
    { id: 2, name: "About" },
    { id: 3, name: "Services" },
    { id: 4, name: "Contact" },
  ]);

  // Function to move a page up in the list
  const moveUp = (index) => {
    if (index === 0) return; // Cannot move the first item up
    const newPages = [...pages];
    [newPages[index], newPages[index - 1]] = [newPages[index - 1], newPages[index]];
    setPages(newPages);
  };

  // Function to move a page down in the list
  const moveDown = (index) => {
    if (index === pages.length - 1) return; // Cannot move the last item down
    const newPages = [...pages];
    [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    setPages(newPages);
  };

  return (
    <div>
      <h2>Page Preference Order</h2>
      <ul>
        {pages.map((page, index) => (
          <li key={page.id}>
            {page.name}
            <button onClick={() => moveUp(index)} disabled={index === 0}>
              Move Up
            </button>
            <button onClick={() => moveDown(index)} disabled={index === pages.length - 1}>
              Move Down
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageOrder;
// src/App.jsx
import React from "react";
import PageOrder from "./components/PageOrder";

const App = () => {
  return (
    <div>
      <h1>ClassItUp</h1>
      <PageOrder />
    </div>
  );
};

export default App;
