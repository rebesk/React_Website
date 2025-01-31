// filepath: /c:/Users/Rebec/react_website/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import About from './About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer>
          <p>2025 | Made by: Rebecca M. E.</p>
        </footer>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <div>
       <img src="/images/Logo1.png" alt="Logo" className="App-logo" />
       <h1>Rebecca</h1>
      <p>Welcome to my website!</p>
    </div>
  );
};

export default App;