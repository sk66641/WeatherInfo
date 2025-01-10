import React, { useState, useEffect, useRef } from 'react'
import Popup from 'reactjs-popup';
import Loading from './Loading';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { convertTimezone, convertUnixToTime, formatVisibility, convertWindDirection } from './FunctionStore';

const WeatherLog = () => {
  const [weatherList, setWeatherList] = useState([]) // weatherList is an array
  const [currentWeather, setCurrentWeather] = useState({}) // only to check if currentweather.main
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
      // console.log("data", data)
      setCurrentWeather(data)
      setWeatherList(prevWeatherList => [...prevWeatherList, { ...data, application: "WeatherInfo" }]) // it's a method to update the `weatherList` state by adding the new weather data (`data`) to the existing list (`prevWeatherList`), a custom key-value pair has been added

    } catch (error) {
      setError(`${error.message}`)
      alert(`${error.message}`)
    }
  }

  useEffect(() => {
    let getLocalWeather = localStorage.getItem('weatherList')
    if (getLocalWeather) {
      setWeatherList(JSON.parse(getLocalWeather))
    }
  }, [])


  useEffect(() => {
    if (weatherList.length > 0) {
      // console.log("weatherList", weatherList)
      localStorage.setItem('weatherList', JSON.stringify(weatherList))
    }
  }, [weatherList])


  // Related concept here: file:///home/sanu/Documents/Web%20Deployment/WeatherInfo/async_react.md

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
    if (weatherList.length > 0) {
      // console.log(weatherList[weatherList.length - 1].coord.lon)
      const checkValues = weatherList.find((item) => item.coord.lat === parseFloat(form.lat) && item.coord.lon === parseFloat(form.lon))
      if (checkValues) {
        alert("values already exists for lat " + checkValues.coord.lat + " and lon " + checkValues.coord.lon + " with temp " + checkValues.main.temp + " °C")
        return;
      }
    }
    setLoader(true)
    getWeather(form.lat, form.lon)
    setform({ lat: "", lon: "" })
    setCurrentWeather({})
    setError("")
  }

  const handleChange = (event) => {
    // handles changes in the input value
    setform({ ...form, [event.target.name]: event.target.value })
  }

  const deleteData = (temp) => {
    const confirmUser = confirm("are you sure you want to delete the data?")
    if (confirmUser) {
      const updatedWeatherList = weatherList.filter(item => item.main.temp !== temp);
      setWeatherList(updatedWeatherList);
      localStorage.setItem('weatherList', JSON.stringify(updatedWeatherList));
      toast.warn('Data deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const clearLocalStorage = () => {
    if (weatherList.length === 0) {
      toast.warning('There is no data to be deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    const confirmUser = confirm("are you sure you want to reset whole data?")
    if (confirmUser) {
      localStorage.removeItem('weatherList'); // Remove 'weatherList' from localStorage
      setWeatherList([]); // Reset the state to an empty array
      toast.success('Data reset successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <p className='flex justify-center pt-3 items-center text-center min-w-96 px-2 font-medium'>Here, you can log weather details for multiple entries through coordinate-based searches.</p>
      <div className='flex justify-center items-center text-center flex-wrap min-w-96 p-3 gap-2'>
        <input value={form.lat} name='lat' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter lattitude' />
        <input value={form.lon} name='lon' onChange={handleChange} className='border border-black rounded-md p-1' type="number" placeholder='Enter longitude' />
      </div>
      <div className='flex justify-center min-w-96'>
        <button className='bg-blue-500 font-bold border text-xl text-white py-1 px-2 rounded-md' onClick={showWeather}>Update</button>
        <button className='bg-blue-500 font-bold border text-xl text-white py-1 px-2 rounded-md' onClick={clearLocalStorage}>Reset</button>
      </div>

      {error !== "" && <div className='flex justify-center h-20 items-center text-lg font-medium text-center min-w-96'>{error}</div>}
      {loader && !currentWeather.main && error === "" && <div className='min-w-96 flex justify-center h-36 items-center'><Loading type="spinningBubbles" color="red" /></div>}
      <div className='flex justify-center p-3 min-w-96'>
        {weatherList.length > 0 &&
          (
            <table className='weatherlog w-1/2 text-center rounded-md overflow-hidden mb-20'>
              <thead className='bg-orange-400'>
                <tr>
                  <th>Temperature (°C)</th>
                  <th>Location</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody className='bg-orange-200'>
                {weatherList.map((weather, index) => (
                  <tr key={index}>
                    <td>{weather.main.temp}</td>
                    <td>{weather.name ? weather.name + "," + weather.sys.country : weather.sys.country}</td>
                    <td>
                      <div className='flex justify-center gap-3'>
                        <Popup trigger={<button title='details' onClick={() => toggleDropdown(weather)} > <img src="/list.png" alt="img" width={20} /></button>} position="left center">
                          {/* popup content here */}
                          <table className='weatherLogDetails text-center rounded-md overflow-hidden absolute right-0'>
                            <tbody>
                              <tr>
                                <td>Location</td>
                                <td>{weather.name ? weather.name + ", " + weather.sys.country : weather.country}</td>
                              </tr>
                              <tr>
                                <td>TimeZone</td>
                                <td>{convertTimezone(weather.timezone)} </td>
                              </tr>
                              <tr>
                                <td>Latitude</td>
                                <td>{weather.coord.lat}</td>
                              </tr>
                              <tr>
                                <td>Longitude</td>
                                <td>{weather.coord.lon}</td>
                              </tr>
                              <tr>
                                <td>Weather</td>
                                <td className='flex justify-center items-center gap-1 flex-wrap'>
                                  <img width={35} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather_image" />
                                  <span className='capitalize'>{weather.weather[0].description}</span>
                                </td>
                              </tr>
                              <tr>
                                <td>Temperature</td>
                                <td>{weather.main.temp + " °C"}</td>
                              </tr>
                              <tr>
                                <td>Feels like</td>
                                <td>{weather.main.feels_like + " °C"}</td>
                              </tr>
                              <tr>
                                <td>Humidity</td>
                                <td>{weather.main.humidity + " %"}</td>
                              </tr>
                              <tr>
                                <td>Max Temp</td>
                                <td>{weather.main.temp_max + " °C"}</td>
                              </tr>
                              <tr>
                                <td>Min Temp</td>
                                <td>{weather.main.temp_min + " °C"}</td>
                              </tr>
                              <tr>
                                <td>Wind Speed</td>
                                <td>{weather.wind.speed ? (weather.wind.speed * 3.6).toFixed(2) + " km/h" : "N/A"}</td>
                              </tr>
                              <tr>
                                <td>Pressure</td>
                                <td>{weather.main.pressure + " hPa"}</td>
                              </tr>
                              <tr>
                                <td>Wind Direction</td>
                                <td>{weather.wind.deg ? convertWindDirection(weather.wind.deg) : "N/A"}</td>
                              </tr>
                              <tr>
                                <td>Wind Gust Speed</td>
                                <td>{weather.wind.gust ? (weather.wind.gust * 3.6).toFixed(2) + " km/h" : "N/A"}</td>
                              </tr>
                              <tr>
                                <td>Visibility</td>
                                <td>{formatVisibility(weather.visibility)} </td>
                              </tr>
                              <tr>
                                <td>Sunrise</td>
                                <td>{convertUnixToTime(weather.sys.sunrise, weather.timezone)} </td>
                              </tr>
                              <tr>
                                <td>Sunset</td>
                                <td>{convertUnixToTime(weather.sys.sunset, weather.timezone)} </td>
                              </tr>
                              <tr>
                                <td>Time Stamp</td>
                                <td>{convertUnixToTime(weather.dt, weather.timezone)}</td>
                              </tr>
                              <tr></tr>
                            </tbody>
                          </table>
                        </Popup>
                        <button title='delete' onClick={() => { deleteData(weather.main.temp) }}>
                          <img width={20} src="/trash.png" alt="" />
                        </button>
                      </div>
                    </td>
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
