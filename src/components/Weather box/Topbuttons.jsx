import { BiCurrentLocation } from 'react-icons/bi'
import { useState, useEffect } from 'react'
// import { loadOptions } from '../search/search'
const Topbuttons = (props) => {
    const [searchedCityList, setSearchedCityList] = useState(["London","Berlin","Moscow", "Delhi"])

    useEffect(() => {
        if (props.weather.name) {
            setSearchedCityList((prevSearchedCityList) => {
                // Remove duplicates and add the new city to the top
                const filteredList = prevSearchedCityList.filter(
                    (city) => city !== props.weather.name
                );
                const updatedList = [props.weather.name, ...filteredList]; // adding the new city to the start of the list
                return updatedList.slice(0, 4); // Keep the list size to a max of 5
            });
        }
    }, [props.weather.name]);

    useEffect(() => {
        if (searchedCityList.length > 0) {
            localStorage.setItem('searchedCityList', JSON.stringify(searchedCityList))
        }
    }, [searchedCityList])
    const cities = [
        {
            id: 1,
            name: searchedCityList[0]
        },
        {
            id: 2,
            name: searchedCityList[1]
        },
        {
            id: 3,
            name: searchedCityList[2]
        },
        {
            id: 4,
            name: searchedCityList[3]
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
                    props.getWeatherCity(city.name);
                }

                } className='text-lg font-medium text-center hover:font-bold px-3 py-2 rounded-md transition ease-in'>
                    {city.name}
                </button>
            ))}

        </div>
    )
}

export default Topbuttons
