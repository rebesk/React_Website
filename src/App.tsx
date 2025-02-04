// filepath: /c:/Users/Rebec/react_website/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import CV from './CV';
import { Workouts } from './workouts';

const App: React.FC = () => {
  return (
    <Router>
      <header className="App-header">
        <img src="/images/Logo1.png" alt="Logo" className="header-logo" />
         <nav>
           <Link to="/">Home</Link>
           <Link to="/about">About</Link>
           <Link to="/cv">CV</Link>
           <Link to="/workouts">Workout Project</Link>
         </nav>
       </header> 
        <body>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </body>
    </Router>
  );
};

export default App;
