import React from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
const Topbuttons = (props) => {
    const cities = [
        {
            id: 1,
            name: 'London'
        },
        {
            id: 2,
            name: 'Tokyo'
        },
        {
            id: 3,
            name: 'New York'
        },
        {
            id: 4,
            name: 'Sydney'
        }
    ]
    return (
        <div className='flex items-center justify-around my-6'>
            <BiCurrentLocation onClick={props.askUser}
                size={25}
                className="cursor-pointer transition ease-out hover:scale-125"
            />
            {cities.map((city) => (
                <button key={city.id} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'>
                    {city.name}
                </button>
            ))}

        </div>
    )
}

export default Topbuttons
