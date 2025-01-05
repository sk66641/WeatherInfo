import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import CoOrdinates from "./components/CoOrdinates";
import Home from './components/Home';
import './App.css';
import WeatherLog from "./components/WeatherLog";
import { ContextFormCity } from "./components/context/context";

function App() {
  const [form, setForm] = useState({ city: "" });

  return (
    <BrowserRouter>
      <Navbar />
      <ContextFormCity.Provider value={{ form, setForm }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coordinates" element={<CoOrdinates />} />
          <Route path="/weatherlogs" element={<WeatherLog />} />
        </Routes>
      </ContextFormCity.Provider>
    </BrowserRouter>
  );
}

export default App;
