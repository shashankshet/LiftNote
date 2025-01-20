import React from 'react';
import { Hero } from './components/Hero';
import Trackworkout from './components/Trackworkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chest from './components/Chest';
import Cardio from './components/Cardio';
import Back from './components/Back';
import Biceps from './components/Biceps';
import Triceps from './components/Triceps';
import Abs from './components/Abs';
import Legs from './components/Legs';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Trackworkout" element={<Trackworkout />} />
        <Route path="/chest" element={<Chest />} />
        <Route path="/cardio" element={<Cardio />} />
        <Route path="/back" element={<Back />} />
        <Route path="/biceps" element={<Biceps />} />
        <Route path="/triceps" element={<Triceps />} />
        <Route path="/abs" element={<Abs />} />
        <Route path="/legs" element={<Legs />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;