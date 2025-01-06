import { BiCurrentLocation } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { ContextCurrentWeather } from '../../context/context'
import { useContext } from 'react'

const Topbuttons = ({ askUser, getWeather }) => {
    const { CurrentWeather } = useContext(ContextCurrentWeather)

    const [searchedCityList, setSearchedCityList] = useState([
        {

            label: "Tokyo, Tokyo, JP",
            city: "Tokyo",
            region: "Tokyo",
            countryCode: "JP",
            lat: 35.6895,
            lon: 139.6917,
        },
        {

            label: "Delhi, Delhi, IN",
            city: "Delhi",
            region: "Delhi",
            countryCode: "IN",
            lat: 28.6667,
            lon: 77.2167,

        },
        {

            label: "Moscow, Moscow, RU",
            city: "Moscow",
            region: "Moscow",
            countryCode: "RU",
            lat: 55.7506,
            lon: 37.6175,

        },
        {

            label: "Berlin, Berlin, DE",
            city: "Berlin",
            region: "Berlin",
            countryCode: "DEcity",
            lat: 52.5167,
            lon: 13.3833,

        }])


    useEffect(() => {
        const getLocalStorage = localStorage.getItem('searchedCityList')
        if (getLocalStorage) {
            setSearchedCityList(JSON.parse(getLocalStorage))
        }
    }, [])

    useEffect(() => {
        if (searchedCityList.length > 0) {
            localStorage.setItem('searchedCityList', JSON.stringify(searchedCityList))
        }
    }, [searchedCityList])

    useEffect(() => {
        // why if condition? because there could be a case when name is empty in openweather api response for user location 
        if (CurrentWeather.name) {
            setSearchedCityList((prevSearchedCityList) => {
                // Remove duplicates and add the new city to the top
                const filteredList = prevSearchedCityList.filter(
                    (city) => city.city !== CurrentWeather.name
                );
                const updatedList = [{ label: CurrentWeather.label, city: CurrentWeather.name, lat: CurrentWeather.coord.lat, lon: CurrentWeather.coord.lon, region: CurrentWeather.region, countryCode: CurrentWeather.sys.country }, ...filteredList]; // adding the new city to the start of the list
                return updatedList.slice(0, 4); // Keep the list size to a max of 5
            });
        }
    }, [CurrentWeather.name]);


    const cities = [
        {
            id: 1,
            name: searchedCityList[0].city,
            lat: searchedCityList[0].lat,
            lon: searchedCityList[0].lon,
        },
        {
            id: 2,
            name: searchedCityList[1].city,
            lat: searchedCityList[1].lat,
            lon: searchedCityList[1].lon,
        },
        {
            id: 3,
            name: searchedCityList[2].city,
            lat: searchedCityList[2].lat,
            lon: searchedCityList[2].lon,
        },
        {
            id: 4,
            name: searchedCityList[3].city,
            lat: searchedCityList[3].lat,
            lon: searchedCityList[3].lon,
        }
    ]



    return (
        <div className='flex items-center flex-wrap justify-around my-6'>
            <BiCurrentLocation onClick={askUser}
                size={25}
                className="cursor-pointer transition ease-out hover:scale-125"
            />
            {cities.map((city) => (
                <button key={city.id} onClick={() => {
                    getWeather(city.lat, city.lon, searchedCityList[city.id - 1]);
                    // console.log()
                }

                } className='text-lg font-medium text-center hover:font-bold px-3 py-2 rounded-md transition ease-in'>
                    {city.name}
                </button>
            ))}

        </div>
    )
}

export default Topbuttons
