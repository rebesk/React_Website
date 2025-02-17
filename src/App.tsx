import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import AddRecipe from "./RecipePage/AddRecipe";
import { Spicea } from "./spicea";

const App: React.FC = () => {
  return (
    <Router>
      {/* Fixed Header */}
      <header className="header">
        <img src="/images/greens_spicea.png" className="header-logo" alt="Logo" />
      </header>

      {/* Sidebar + Content Layout */}
      <div className="container">
      <img src="/images/spicealogo.png" className="green-logo"/>
        {/* Fixed Sidebar */}
        <nav className="sidebar">
        
          <Link to="/">Home</Link>
          <Link to="/spicea">Spicea project</Link>
          <Link to="/add-recipe">Add Recipe</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spicea" element={<Spicea />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
