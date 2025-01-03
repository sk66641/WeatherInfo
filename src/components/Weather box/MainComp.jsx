import React from 'react'
import { useState } from 'react'
import Topbuttons from './Topbuttons'
import InputDetails from './InputDetails'
import TimeAndLocation from './TimeAndLocation'
import TempAndDetails from './TempAndDetails'
import HorizontalDetails from './HorizontalDetails'
import { ContextTempUnit } from '../context/context'
const MainComp = (props) => {
  const [changeTempUnit, setChangeTempUnit] = useState(false)

  const weatherStyles = {
    "01n": { bg: "bg-gradient-to-br from-yellow-500 to-orange-500", text: "text-yellow-100" }, // Clear sky
    "02d": { bg: "bg-gradient-to-br from-gray-400 to-blue-400", text: "text-gray-800" }, // Few clouds (day)
    "02n": { bg: "bg-gradient-to-br from-gray-500 to-blue-500", text: "text-gray-200" }, // Few clouds (night)
    "03d": { bg: "bg-gradient-to-br from-gray-300 to-gray-500", text: "text-gray-900" }, // Scattered clouds (day)
    "03n": { bg: "bg-gradient-to-br from-gray-600 to-gray-800", text: "text-gray-100" }, // Scattered clouds (night)
    "04d": { bg: "bg-gradient-to-br from-gray-700 to-gray-900", text: "text-gray-300" }, // Broken clouds (day)
    "04n": { bg: "bg-gradient-to-br from-gray-800 to-black", text: "text-gray-400" }, // Broken clouds (night)
    "09d": { bg: "bg-gradient-to-br from-blue-700 to-blue-900", text: "text-blue-100" }, // Shower rain (day)
    "09n": { bg: "bg-gradient-to-br from-blue-800 to-black", text: "text-blue-200" }, // Shower rain (night)
    "10d": { bg: "bg-gradient-to-br from-teal-400 to-blue-700", text: "text-teal-100" }, // Rain (day)
    "10n": { bg: "bg-gradient-to-br from-teal-500 to-blue-800", text: "text-teal-200" }, // Rain (night)
    "11d": { bg: "bg-gradient-to-br from-purple-500 to-indigo-700", text: "text-purple-100" }, // Thunderstorm (day)
    "11n": { bg: "bg-gradient-to-br from-purple-700 to-black", text: "text-purple-200" }, // Thunderstorm (night)
    "13d": { bg: "bg-gradient-to-br from-white to-gray-300", text: "text-gray-800" }, // Snow (day)
    "13n": { bg: "bg-gradient-to-br from-gray-200 to-gray-500", text: "text-gray-900" }, // Snow (night)
    "50d": { bg: "bg-gradient-to-br from-gray-400 to-gray-600", text: "text-gray-100" }, // Mist (day)
    "50n": { bg: "bg-gradient-to-br from-gray-500 to-gray-800", text: "text-gray-200" }, // Mist (night)
  };

  const getWeatherStyle = () => {
    const icon = props.weather.weather[0].icon;
    return weatherStyles[icon] || { bg: "bg-gradient-to-br from-gray-200 to-gray-400", text: "text-black" };
  };

  return (
    <div className={`py-5 px-20 rounded-xl shadow-xl shadow-gray-500 mb-9 ${getWeatherStyle().bg} ${getWeatherStyle().text}`}>
      <ContextTempUnit.Provider value={{ changeTempUnit, setChangeTempUnit }}>
        <Topbuttons weather={props.weather} askUser={props.askUser} getWeatherCity={props.getWeatherCity} />
        <InputDetails weather={props.weather} show={props.showWeatherCity} />
        <TimeAndLocation weather={props.weather} />
        <TempAndDetails weather={props.weather} />
        <HorizontalDetails weather={props.weather} />
      </ContextTempUnit.Provider>
    </div>
  )
}

export default MainComp
