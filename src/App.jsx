import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import City from "./components/City";
import CoOrdinates from "./components/CoOrdinates";
import Home from "./components/Home";
import MyLocation from "./components/MyLocation";
import './App.css'
import WeatherLog from "./components/WeatherLog";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mylocation" element={<MyLocation />} />
          <Route path="/city" element={<City />} />
          <Route path="/coordinates" element={<CoOrdinates />} />
          <Route path="/weatherlogs" element={<WeatherLog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;