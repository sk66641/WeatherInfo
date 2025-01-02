import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import { convertUnixToTime } from './Home'
import { convertTimezone } from './Home'
import { convertWindDirection } from './Home'
import { formatVisibility } from './Home'

const CoOrdinates = () => {

    const [CurrentWeather, setCurrentWeather] = useState({})
    const [form, setform] = useState({ lat: "", lon: "" })
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)

    const getWeather = async (lat, lon) => {
        try {
            const API_KEY = import.meta.env.VITE_API_KEY
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            const res = await fetch(url)
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message)
            }
            const data = await res.json()
            console.log("data", data)
            setCurrentWeather(data)
        } catch (error) {
            setError(`${error.message}`)
            alert(`${error.message}`)
        }
    }

    const showWeather = () => {
        if (form.lat === "" || form.lon === "") {
            alert('all fields required!')
            return;
        }
        if (form.lat > 90 || form.lat < -90) {
            alert("invalid value of lattitude!\nlattitude varies from -90 to 90 degrees!")
            return;
        }
        if (form.lon > 180 || form.lon < -180) {
            alert("invalid value of longitude!\nlongitude varies from -180 to 180 degrees!")
            return;
        }
        setLoader(true)
        getWeather(form.lat, form.lon)
        setform({ lat: "", lon: "" })
        setCurrentWeather({})
        setError("")
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
            <p className='flex justify-center pt-3 font-medium items-center text-center min-w-96 px-2'>Here, you can search weather details using co-ordinates.</p>
            <div className='flex justify-center items-center p-3 text-center flex-wrap min-w-96 gap-2'>
                <input value={form.lat} name='lat' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter lattitude' />
                <input value={form.lon} name='lon' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter longitude' />
            </div>
            <div className='flex justify-center min-w-96'>
                <button className='bg-blue-500 font-bold border text-xl text-white py-1 px-2 rounded-md' onClick={showWeather}>SeeWeather</button>
            </div>
            {error !== "" && <div className='flex justify-center h-20 items-center text-lg font-medium text-center min-w-96'>{error}</div>}
            <div className='tableContainer flex justify-center p-3 min-w-96'>
                {CurrentWeather.main &&
                    (
                        <table className='text-center rounded-md overflow-hidden'>
                            <tbody>
                                <tr>
                                    <td>Location</td>
                                    <td>{CurrentWeather.name ? CurrentWeather.name + ", " + CurrentWeather.sys.country : CurrentWeather.country}</td>
                                </tr>
                                <tr>
                                    <td>TimeZone</td>
                                    <td>{convertTimezone(CurrentWeather.timezone)} </td>
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
                                    <td>Weather</td>
                                    <td className='flex justify-center items-center gap-1'>
                                        <img width={35} src={`http://openweathermap.org/img/wn/${CurrentWeather.weather[0].icon}@2x.png`} alt="weather_image" />
                                        <span className='capitalize'>{CurrentWeather.weather[0].description}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Temperature</td>
                                    <td>{CurrentWeather.main.temp + " °C"}</td>
                                </tr>
                                <tr>
                                    <td>Feels like</td>
                                    <td>{CurrentWeather.main.feels_like + " °C"}</td>
                                </tr>
                                <tr>
                                    <td>Humidity</td>
                                    <td>{CurrentWeather.main.humidity + " %"}</td>
                                </tr>
                                <tr>
                                    <td>Max Temp</td>
                                    <td>{CurrentWeather.main.temp_max + " °C"}</td>
                                </tr>
                                <tr>
                                    <td>Min Temp</td>
                                    <td>{CurrentWeather.main.temp_min + " °C"}</td>
                                </tr>
                                <tr>
                                    <td>Wind Speed</td>
                                    <td>{CurrentWeather.wind.speed ? (CurrentWeather.wind.speed * 3.6).toFixed(2) + " km/h" : "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Pressure</td>
                                    <td>{CurrentWeather.main.pressure + " hPa"}</td>
                                </tr>
                                <tr>
                                    <td>Wind Direction</td>
                                    <td>{CurrentWeather.wind.deg ? convertWindDirection(CurrentWeather.wind.deg) : "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Wind Gust Speed</td>
                                    <td>{CurrentWeather.wind.gust ? (CurrentWeather.wind.gust * 3.6).toFixed(2) + " km/h" : "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Visibility</td>
                                    <td>{formatVisibility(CurrentWeather.visibility)} </td>
                                </tr>
                                <tr>
                                    <td>Sunrise</td>
                                    <td>{convertUnixToTime(CurrentWeather.sys.sunrise, CurrentWeather.timezone)} </td>
                                </tr>
                                <tr>
                                    <td>Sunset</td>
                                    <td>{convertUnixToTime(CurrentWeather.sys.sunset, CurrentWeather.timezone)} </td>
                                </tr>
                                <tr>
                                    <td>Time Stamp</td>
                                    <td>{convertUnixToTime(CurrentWeather.dt, CurrentWeather.timezone)}</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
            </div>
            {loader && !CurrentWeather.main && error === "" && <div className='flex min-w-96 justify-center'><Loading type="spinningBubbles" color="red" /></div>}
        </>
    )
}

export default CoOrdinates
