import React, { useState, useEffect } from 'react'

const WeatherLog = () => {

  const [weatherList, setWeatherList] = useState([])
  const [currentWeather, setCurrentWeather] = useState({}) // only to check if currentweather.main
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
    setWeatherList(prevWeatherList => [...prevWeatherList, data])
  }

  useEffect(() => {
    console.log("weatherList", weatherList)
  }, [weatherList])


  // Related concept here: file:///home/sanu/Documents/Web%20Deployment/weather-web/weather%20web/public/async_react.md

  const showWeather = () => {
    if (form.lat === "" || form.lon === "") {
      alert('all fields required!')
      return;
    }
    if (weatherList.length > 0) {
      // console.log(weatherList[weatherList.length - 1].coord.lon)
      const checkValues = weatherList.some((item) => item.coord.lat === parseFloat(form.lat) && item.coord.lon === parseFloat(form.lon))
      if (checkValues) {
        alert("values already exists")
        return;
      }
    }
    getWeather(form.lat, form.lon)
    setform({ lat: "", lon: "" })

  }

  const getTimeStamp = (event) => {
    let currentDate = new Date(event * 1000);
    return currentDate.toTimeString();
  }


  const handleChange = (event) => {
    setform({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='flex justify-center items-center text-center flex-wrap min-w-72 p-3 gap-2'>
        <input value={form.lat} name='lat' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter lattitude' />
        <input value={form.lon} name='lon' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter longitude' />
      </div>
      <div className='flex justify-center min-w-72'>
        <button className='bg-blue-500 font-bold border text-xl text-white py-1 px-2 rounded-md' onClick={showWeather}>Update</button>
      </div>
      <div className='flex justify-center p-3 min-w-72'>
        {currentWeather.main && weatherList.length > 0 &&
          (
            <table className='weatherlog w-3/4 text-center rounded-md overflow-hidden'>
              <thead className='bg-orange-400'>
                <tr>
                  <th>lat</th>
                  <th>lon</th>
                  <th>Temp (°C)</th>
                  <th>Feel (°C)</th>
                  <th>Place</th>
                  <th>TimeStamp</th>
                </tr>
              </thead>
              <tbody className='bg-orange-200'>
                {weatherList.map((weather, index) => (
                  <tr key={index}>
                    <td>{weather.coord.lat}</td>
                    <td>{weather.coord.lon}</td>
                    <td>{weather.main.temp}</td>
                    <td>{weather.main.feels_like}</td>
                    <td>{weather.name ? weather.name + "," + weather.sys.country : weather.sys.country}</td>
                    <td>{new Date(weather.dt * 1000).toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>

    </>
  )
}

export default WeatherLog
