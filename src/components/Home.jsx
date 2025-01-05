import React, { useState, useEffect, useContext } from 'react';
import Loading from './Loading';
import { DateTime } from 'luxon';
import MainComp from './Weather box/MainComp';
import { ContextTempUnit, ContextFormCity } from './context/context';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { setSearch } from '../redux/location/location';

export const fixTo0 = (value) => value.toFixed(0);

export const convertToF = (celsius) => (celsius * 9 / 5) + 32;

export const convertUnit = (celsius) => {
    const { changeTempUnit } = useContext(ContextTempUnit);
    return `${changeTempUnit ? convertToF(celsius.toFixed(0)).toFixed(0) + " °F" : celsius.toFixed(0) + " °C"}`;
};

export const convertUnixToTime = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC').plus({ seconds: timezoneOffset });
    return localDateTime.toFormat('EEE, dd MMM yyyy | hh:mm a');
};

export const convertUnixToString = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC').plus({ seconds: timezoneOffset });
    return localDateTime.toFormat('hh:mm a');
};

export const convertUnixToDate = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC').plus({ seconds: timezoneOffset });
    return localDateTime.toFormat('EEE, dd MMM yyyy');
};

export const convertWindDirection = (deg) => {
    const directions = [
        "North", "North-NE", "Northeast", "East-NE",
        "East", "East-SE", "Southeast", "South-SE",
        "South", "South-SW", "Southwest", "West-SW",
        "West", "West-NW", "Northwest", "North-NW"
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
};

export const convertTimezone = (timezoneOffset) => {
    const offsetHours = Math.floor(timezoneOffset / 3600);
    const offsetMinutes = Math.abs(timezoneOffset % 3600 / 60);
    const sign = offsetHours >= 0 ? ' +' : ' -';
    return `UTC${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
};

export const formatVisibility = (visibility) => (visibility / 10000).toFixed(2) + ' km';

const Home = () => {
    const [CurrentWeather, setCurrentWeather] = useState({});
    const [weatherForecast, setWeatherForest] = useState({});
    const [fixCurrenWeather, setFixCurrentWeather] = useState({});
    const [locationCheck, setLocationCheck] = useState(false)
    console.log(CurrentWeather)
    // console.log(locationCheck)
    // const { form, setform } = useContext(ContextFormCity);
    // const search = useSelector((state) => state.location);
    // const dispatch = useDispatch()
    // console.log("before", search)

    const getWeather = async (lat, lon, search) => {
        try {
            // dispatch(setSearch(false))
            const API_KEY = import.meta.env.VITE_API_KEY;
            const url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            const res_weather = await fetch(url_weather);
            if (!res_weather.ok) {
                const errorData = await res_weather.json();
                throw new Error(errorData.message);
            }
            // console.log("after", search)
            const data_weather = await res_weather.json();
            // search will be undefined for every refresh as data will be set according to user location after getting co-ordinates details from navigator.geolocation
            { search !== undefined ? setCurrentWeather({ ...data_weather, name: search.city, region: search.region, sys: { ...data_weather.sys, country: search.countryCode }, label: search.label }) : setCurrentWeather(data_weather) }

            const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            const res_forecast = await fetch(url_forecast);
            const data_forecast = await res_forecast.json();
            setWeatherForest(data_forecast);
        } catch (error) {
            console.log(error);
            alert(`${error.message}`);
        }
    };

    // useEffect(() => {
    //     setLocationCheck(!locationCheck)
    // }, [CurrentWeather])

    // console.log("wait")

    const askUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
            }, (error) => {
                alert(error.message);
            });
            return;
        }
        alert("Geolocation is not supported by this browser!");
    };

    useEffect(() => {
        askUser();
    }, []);
    const getWeatherCity = async (city) => {
        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            const res = await fetch(url);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            const data = await res.json();
            setCurrentWeather(data);
        } catch (error) {
            alert(`${error.message}`);
        }
    };

    const showWeatherCity = () => {
        if (form.city === "") {
            alert('all fields required!');
            return;
        }
        getWeatherCity(form.city);
        setform({ city: "" });
    };

    return (
        <>
            <div className='flex justify-center px-3 mt-24 min-w-[430px]'>
                {CurrentWeather.main && (
                    <MainComp weather={CurrentWeather} showWeatherCity={showWeatherCity} askUser={askUser} getWeatherCity={getWeatherCity} getWeather={getWeather} forecast={weatherForecast} locationCheck={locationCheck} />
                )}
            </div>
            {!CurrentWeather.main && <div className='min-w-96 flex justify-center'><Loading type="spinningBubbles" color="red" /></div>}
        </>
    );
};

export default Home;
