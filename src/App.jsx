import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import CoOrdinates from "./components/CoOrdinates";
import Home from "./components/home/Home";
import WeatherLog from "./components/WeatherLog";
import './App.css';
import Footer from "./components/Footer";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coordinates" element={<CoOrdinates />} />
        <Route path="/weatherlogs" element={<WeatherLog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
