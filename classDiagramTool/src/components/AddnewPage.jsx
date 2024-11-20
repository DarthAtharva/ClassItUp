// src/pages/NewPage.jsx
import React from "react";

const NewPage = () => {
  return (
    <div>
      <h1>New Page</h1>
      <p>Welcome to the new page of ClassItUp!</p>
    </div>
  );
};

export default NewPage;


// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewPage from "./pages/NewPage";
import HomePage from "./pages/HomePage"; // Assuming you have a homepage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-page" element={<NewPage />} />
      </Routes>
    </Router>
  );
};

export default App;


// Example in Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/new-page">New Page</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

