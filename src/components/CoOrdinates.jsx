import React, { useState, useEffect } from 'react'

const CoOrdinates = () => {

    const [CurrentWeather, setCurrentWeather] = useState({})
    const [form, setform] = useState({ lat: "", lon: "" })

    const getWeather = async (lat, lon) => {
        if (lat > 90 || lat < -90) {
            alert("invalid value of lattitude!\nlattitude varies from -90 to 90 degrees!")
            return;
        }
        else if (lon > 180 || lon < -180) {
            alert("invalid value of longitude!\nlongitude varies from -180 to 180 degrees!")
            return;
        }
        const API_KEY = import.meta.env.VITE_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        const res = await fetch(url)
        const data = await res.json()
        console.log("data", data)
        setCurrentWeather(data)
    }

    const showWeather = () => {
        if (form.lat === "" || form.lon === "") {
            alert('all fields required!')
            return;
        }
        getWeather(form.lat, form.lon)
        setform({ lat: "", lon: "" })
    }

    const getTime = (event) => {
        let currentDate = new Date(event * 1000);
        return currentDate.toTimeString();
    }


    const handleChange = (event) => {
        setform({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className='flex justify-center items-center p-3 text-center flex-wrap min-w-72 gap-2'>
                <input value={form.lat} name='lat' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter lattitude' />
                <input value={form.lon} name='lon' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter longitude' />
            </div>
            <div className='flex justify-center min-w-72'>
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

export default CoOrdinates
