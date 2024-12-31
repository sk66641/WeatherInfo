import React from 'react'
import { useState, useEffect } from 'react'
import FetchingDots from './Dots'

const MyLocation = () => {
    const [CurrentWeather, setCurrentWeather] = useState({})

    const getWeather = async (lat, lon) => {
        const API_KEY = import.meta.env.VITE_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        const res = await fetch(url)
        const data = await res.json()
        console.log("data", data)
        setCurrentWeather(data)
    }

    const askUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                getWeather(latitude, longitude)
            }, (error) => {
                console.log("error " + error.message)
            })
            return;
        }
        alert("Geolocation is not supported by this browser!")
    }

    useEffect(() => {
        askUser()
    }, [])

    return (
        <>
            <div className='flex justify-center h-20 items-center text-lg font-medium text-center min-w-72'>
                {/* <button className='rounded-md bg-orange-400 px-2 py-1 text-xl font-medium' onClick={askUser}>My Location</button> */}
                Your Location details
            </div>
            <div className='tableContainer flex justify-center min-w-72 px-3'>
                {CurrentWeather.main ? (
                    <table className='text-center rounded-md overflow-hidden'>
                        <tbody>
                            <tr>
                                <td>Place</td>
                                <td>{CurrentWeather.name ? CurrentWeather.name + ", " + CurrentWeather.sys.country : CurrentWeather.country}</td>
                            </tr>
                            <tr>
                                <td>Latitude</td>
                                <td>{CurrentWeather.coord.lat}</td>
                            </tr>
                            <tr>
                                <td>Longitude</td>
                                <td>{CurrentWeather.coord.lon}</td>
                            </tr>
                            <tr>
                                <td>Temperature (°C)</td>
                                <td>{CurrentWeather.main.temp}</td>
                            </tr>
                            <tr>
                                <td>Feels like (°C)</td>
                                <td>{CurrentWeather.main.feels_like}</td>
                            </tr>
                            <tr>
                                <td>Time Stamp</td>
                                <td>{new Date(CurrentWeather.dt * 1000).toString()}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : <FetchingDots />}

            </div>
        </>
    )
}

export default MyLocation
