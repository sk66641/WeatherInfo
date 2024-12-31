import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from "./components/Navbar"
import City from "./components/City";
import CoOrdinates from "./components/CoOrdinates";
import Home from "./components/Home";
import MyLocation from "./components/MyLocation";
import './App.css'
import WeatherLog from "./components/WeatherLog";

const router = createBrowserRouter(
  [
    { path: "/WeatherInfo/", element: <Home /> },
    { path: "/WeatherInfo/mylocation", element: <MyLocation /> },
    { path: "/WeatherInfo/city", element: <City /> },
    { path: "/WeatherInfo/coordinates", element: <CoOrdinates /> },
    { path: "/WeatherInfo/weatherlogs", element: <WeatherLog /> },
  ]
)
function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

export default App;