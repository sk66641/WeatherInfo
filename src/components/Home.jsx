import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Loading from './Loading'
import { DateTime } from 'luxon'
import MainComp from './Weather box/MainComp'
import { ContextTempUnit } from './context/context'
import { ContextFormCity } from './context/context'

export const fixTo0 = (value) => {
    return value.toFixed(0);
}
export const convertToF = (celsius) => {
    return (celsius * 9 / 5) + 32;
}
export const convertUnit = (celsius) => {
    const { changeTempUnit, setChangeTempUnit } = useContext(ContextTempUnit)
    return `${changeTempUnit ? convertToF(celsius.toFixed(0)).toFixed(0) + " °F" : celsius.toFixed(0) + " °C"}`;
}
export const convertUnixToTime = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC').plus({ seconds: timezoneOffset });
    return localDateTime.toFormat('EEE, dd MMM yyyy | hh:mm a');
}
export const convertUnixToString = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC').plus({ seconds: timezoneOffset });
    return localDateTime.toFormat('hh:mm a');
}

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

export const formatVisibility = (visibility) => {
    return (visibility / 10000).toFixed(2) + ' km';
};



const Home = () => {
    const [CurrentWeather, setCurrentWeather] = useState({})
    // const [error, setError] = useState(null)
    const { form, setform } = useContext(ContextFormCity)

    const getWeather = async (lat, lon) => {
        try {
            const API_KEY = import.meta.env.VITE_API_KEY
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            const res = await fetch(url)

            if (!res.ok) {  // Check if the response is successful
                const errorData = await res.json()
                throw new Error(errorData.message)  // Throw error if response is not ok
            }

            const data = await res.json()
            // console.log("data", data)
            setCurrentWeather(data)

        } catch (error) {
            // setError(`${error.message}`)
            alert(`${error.message}`)  // Catch both network and API errors
        }
    }


    const askUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                getWeather(latitude, longitude)
                // setError(null)
            }, (error) => {
                // setError(error.message)
                alert(error.message)
            })
            return;
        }
        alert("Geolocation is not supported by this browser!")
    }

    useEffect(() => {
        askUser()
    }, [])

    const getWeatherCity = async (city) => {

        try {
            const API_KEY = import.meta.env.VITE_API_KEY
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            const res = await fetch(url)

            if (!res.ok) {  // Check if the response is successful
                const errorData = await res.json()
                throw new Error(errorData.message)  // Throw error if response is not ok
            }

            const data = await res.json()

            // console.log("data", data)
            setCurrentWeather(data)
        } catch (error) {
            // setError(`${error.message}`)
            alert(`${error.message}`)  // Catch both network and API errors
        }
    }

    const showWeatherCity = () => {
        if (form.city === "") {
            alert('all fields required!')
            return;
        }
        
        getWeatherCity(form.city)
        setform({ city: "" })
        // setError(null)
    }

    // useEffect(() => {
    //     if (error !== null) {
    //         setCurrentWeather({})
    //     }
    // }, [error])

    return (
        <>
            {/* {error !== null && (<div className='flex justify-center items-center text-lg h-20 font-medium text-center 
            '>
                {error}</div>)} */}
            <div className='flex justify-center px-3 mt-24 min-w-[430px]'>
                {CurrentWeather.main && (
                    <MainComp weather={CurrentWeather} showWeatherCity={showWeatherCity} askUser={askUser} getWeatherCity={getWeatherCity} getWeather={getWeather}/>
                )}
            </div>
            {/* {!CurrentWeather.main && error === null && <div className='min-w-96 flex justify-center'><Loading type="spinningBubbles" color="red" /></div>} */}
            {!CurrentWeather.main && <div className='min-w-96 flex justify-center'><Loading type="spinningBubbles" color="red" /></div>}
        </>

    )
}

export default Home
