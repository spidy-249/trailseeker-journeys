import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Treks from './pages/Treks';
import Admin from './pages/Admin'; // <-- Import the new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/treks" element={<Treks />} />
      <Route path="/admin" element={<Admin />} /> {/* <-- Add the route */}
    </Routes>
  );
}

export default App;