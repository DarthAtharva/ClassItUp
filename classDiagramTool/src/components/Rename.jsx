// src/pages/OldPage.jsx
import React from "react";

const OldPage = () => {
  return (
    <div>
      <h1>Old Page</h1>
      <p>This is the old page content.</p>
    </div>
  );
};

export default OldPage;

// src/pages/RenamedPage.jsx
import React from "react";

const RenamedPage = () => {
  return (
    <div>
      <h1>Renamed Page</h1>
      <p>This is the renamed page content.</p>
    </div>
  );
};

export default RenamedPage;


// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OldPage from "./pages/OldPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/old-page" element={<OldPage />} />
      </Routes>
    </Router>
  );
};

export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RenamedPage from "./pages/RenamedPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/renamed-page" element={<RenamedPage />} />
      </Routes>
    </Router>
  );
};

export default App;

// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/renamed-page">Renamed Page</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


