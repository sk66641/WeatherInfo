import React, { useState, useEffect } from 'react'

const City = () => {

    const [CurrentWeather, setCurrentWeather] = useState({})
    const [form, setform] = useState({ city: "" })

    const getWeather = async (city) => {
        const API_KEY = import.meta.env.VITE_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        const res = await fetch(url)
        const data = await res.json()
        console.log("data", data)
        setCurrentWeather(data)
    }

    const showWeather = () => {
        if (form.city === "") {
            alert('all fields required!')
            return;
        }
        getWeather(form.city)
        setform({ city: "" })
    }

    const handleChange = (event) => {
        setform({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className='flex justify-center items-center py-3 min-w-72'>
                <input value={form.city} name='city' onChange={handleChange} className='border border-black rounded-md py-1 px-2' type="text" placeholder='Enter City name' />
            </div>
            <div className='flex justify-center items-center text-center min-w-72'>
                <button className='bg-blue-500 font-bold border text-xl text-white py-1 px-2 rounded-md' onClick={showWeather}>SeeWeather</button>
            </div>
            <div className='tableContainer flex justify-center p-3 min-w-72'>
                {CurrentWeather.main &&
                    (
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
                    )
                }
            </div>
        </>
    )
}

export default City
