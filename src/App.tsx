// filepath: /c:/Users/Rebec/react_website/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import CV from './CV';
import { Spicea } from './spicea';

const App: React.FC = () => {
  return (
    <Router>
      <header className="App-header">
        <img src="/images/spicea.png" alt="Logo" className="header-logo" />
         <nav>
           <Link to="/">Home</Link>
             {/* <Link to="/cv">CV</Link> */}
           <Link to="/spicea">Spicea project</Link>
           <Link to="/about">About</Link>
         </nav>
       </header> 
        <body>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/cv" element={<CV />} /> */}
            <Route path="/spicea" element={<Spicea />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </body>
    </Router>
  );
};

export default App;
