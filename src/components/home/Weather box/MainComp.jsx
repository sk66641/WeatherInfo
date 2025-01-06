import React, { useContext } from 'react';
import Topbuttons from './Topbuttons';
import InputDetails from '../search/InputDetails';
import TimeAndLocation from './TimeAndLocation';
import TempAndDetails from './TempAndDetails';
import HorizontalDetails from './HorizontalDetails';
import { ContextCurrentWeather } from '../../context/context';
import Forecast from '../../forecast/Forecast';

const MainComp = ({ askUser, getWeather, weatherForecast }) => {

  const { CurrentWeather } = useContext(ContextCurrentWeather)

  const weatherStyles = {
    "01n": { bg: "bg-gradient-to-br from-yellow-500 to-orange-500", text: "text-yellow-100" },
    "02d": { bg: "bg-gradient-to-br from-gray-400 to-blue-400", text: "text-gray-800" },
    "02n": { bg: "bg-gradient-to-br from-gray-500 to-blue-500", text: "text-gray-200" },
    "03d": { bg: "bg-gradient-to-br from-gray-300 to-gray-500", text: "text-gray-900" },
    "03n": { bg: "bg-gradient-to-br from-gray-600 to-gray-800", text: "text-gray-100" },
    "04d": { bg: "bg-gradient-to-br from-gray-700 to-gray-900", text: "text-gray-300" },
    "04n": { bg: "bg-gradient-to-br from-gray-800 to-black", text: "text-gray-400" },
    "09d": { bg: "bg-gradient-to-br from-blue-700 to-blue-900", text: "text-blue-100" },
    "09n": { bg: "bg-gradient-to-br from-blue-800 to-black", text: "text-blue-200" },
    "10d": { bg: "bg-gradient-to-br from-teal-400 to-blue-700", text: "text-teal-100" },
    "10n": { bg: "bg-gradient-to-br from-teal-500 to-blue-800", text: "text-teal-200" },
    "11d": { bg: "bg-gradient-to-br from-purple-500 to-indigo-700", text: "text-purple-100" },
    "11n": { bg: "bg-gradient-to-br from-purple-700 to-black", text: "text-purple-200" },
    "13d": { bg: "bg-gradient-to-br from-white to-gray-300", text: "text-gray-800" },
    "13n": { bg: "bg-gradient-to-br from-gray-200 to-gray-500", text: "text-gray-900" },
    "50d": { bg: "bg-gradient-to-br from-gray-400 to-gray-600", text: "text-gray-100" },
    "50n": { bg: "bg-gradient-to-br from-gray-500 to-gray-800", text: "text-gray-200" },
  };

  const getWeatherStyle = () => {
    const icon = CurrentWeather.weather[0].icon;
    return weatherStyles[icon] || { bg: "bg-gradient-to-br from-gray-200 to-gray-400", text: "text-black" };
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className={`py-5 px-20 rounded-xl shadow-xl shadow-gray-500 mb-9 ${getWeatherStyle().bg} ${getWeatherStyle().text}`}>
        <Topbuttons askUser={askUser} getWeather={getWeather} />
        <InputDetails getWeather={getWeather} />
        <TimeAndLocation />
        <TempAndDetails />
        <HorizontalDetails />
      </div>
      <Forecast weatherForecast={weatherForecast} getWeatherStyle={getWeatherStyle} />
    </div>
  );
};

export default MainComp;
