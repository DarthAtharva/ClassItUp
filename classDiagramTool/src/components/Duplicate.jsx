import React from "react";

const DuplicatePage = () => {
  return (
    <div>
      <h1>Duplicate Page</h1>
      <p>This is a copy of the original page content.</p>
    </div>
  );
};

export default DuplicatePage;
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OriginalPage from "./pages/OriginalPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/original-page" element={<OriginalPage />} />
      </Routes>
    </Router>
  );
};

export default App;


import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/original-page">Original Page</Link></li>
        <li><Link to="/duplicate-page">Duplicate Page</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


