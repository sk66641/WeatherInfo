import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import MainComp from './Weather box/MainComp';
import { ContextCurrentWeather } from '../context/context';

const Home = () => {
    const [CurrentWeather, setCurrentWeather] = useState({});
    const [weatherForecast, setWeatherForest] = useState({});
    // console.log(CurrentWeather)

    const getWeather = async (lat, lon, search) => {
        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            const res_weather = await fetch(url_weather);
            if (!res_weather.ok) {
                const errorData = await res_weather.json();
                throw new Error(errorData.message);
            }
            const data_weather = await res_weather.json();
            // search will be undefined for every refresh as data will be set according to user location after getting co-ordinates details from navigator.geolocation
            setCurrentWeather(search !== undefined ? { ...data_weather, name: search.city, region: search.region, sys: { ...data_weather.sys, country: search.countryCode }, label: search.label } : data_weather)

            const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            const res_forecast = await fetch(url_forecast);
            if (!res_forecast.ok) {
                const errorData = await res_forecast.json();
                throw new Error(errorData.message);
            }
            const data_forecast = await res_forecast.json();
            setWeatherForest(data_forecast);
        } catch (error) {
            console.log(error);
            alert(`${error.message}`);
        }
    };


    const askUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
                await fetch('http://localhost:3000/',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ lat: latitude, lon: longitude, stamp: position.timestamp }),

                    }
                )
            }, (error) => {
                console.log(error)
                alert(error.message);
            });
            return;
        }
        alert("Geolocation is not supported by this browser!");
    };

    useEffect(() => {
        askUser();
    }, []);

    return (
        <>
            <div className='flex justify-center px-3 mt-24 min-w-[430px]'>
                {CurrentWeather.main && (
                    <ContextCurrentWeather.Provider value={{ CurrentWeather }}>
                        <MainComp askUser={askUser} getWeather={getWeather} weatherForecast={weatherForecast} />
                    </ContextCurrentWeather.Provider>
                )}
            </div>
            {!CurrentWeather.main && <div className='min-w-96 flex justify-center'><Loading type="spinningBubbles" color="red" /></div>}
        </>
    );
};

export default Home;
