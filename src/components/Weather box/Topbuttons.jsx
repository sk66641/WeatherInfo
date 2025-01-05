import { BiCurrentLocation } from 'react-icons/bi'
import { useState, useEffect } from 'react'
// import { searchForWorkspaceRoot } from 'vite';
// import { loadOptions } from '../search/search'
const Topbuttons = (props) => {
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

            label: "Delhi, Delhi, IN", // From the `label` property
            city: "Delhi",
            region: "Delhi",
            countryCode: "IN",         // From the `name` property
            lat: 28.6667,            // From `coord.lat`
            lon: 77.2167,            // From `coord.lon`

        },
        {

            label: "Moscow, Moscow, RU", // From the `label` property
            city: "Moscow",
            region: "Moscow",
            countryCode: "RU",         // From the `name` property
            lat: 55.7506,               // From `coord.lat`
            lon: 37.6175,               // From `coord.lon`

        },
        {

            label: "Berlin, Berlin, DE", // From the `label` property
            city: "Berlin",
            region: "Berlin",
            countryCode: "DEcity",         // From the `name` property
            lat: 52.5167,               // From `coord.lat`
            lon: 13.3833,               // From `coord.lon`

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
        if (props.weather.name) {
            setSearchedCityList((prevSearchedCityList) => {
                // Remove duplicates and add the new city to the top
                const filteredList = prevSearchedCityList.filter(
                    (city) => city.city !== props.weather.name
                );
                const updatedList = [{ label: props.weather.label, city: props.weather.name, lat: props.weather.coord.lat, lon: props.weather.coord.lon, region: props.weather.region, countryCode: props.weather.sys.country }, ...filteredList]; // adding the new city to the start of the list
                return updatedList.slice(0, 4); // Keep the list size to a max of 5
            });
        }
    }, [props.weather.name]);


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
            <BiCurrentLocation onClick={props.askUser}
                size={25}
                className="cursor-pointer transition ease-out hover:scale-125"
            />
            {cities.map((city) => (
                <button key={city.id} onClick={() => {
                    props.getWeather(city.lat, city.lon, searchedCityList[city.id - 1]);
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
