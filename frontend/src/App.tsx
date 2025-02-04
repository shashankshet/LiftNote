import React from 'react';
import { Hero } from './components/Hero';
import Trackworkout from './components/Trackworkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}></div>
        <div className="relative bg-black bg-opacity-75 min-h-screen">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Trackworkout" element={<Trackworkout />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;