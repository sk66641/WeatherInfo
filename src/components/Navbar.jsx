import React from 'react'
import LiveClock from './LiveClock'
import Dropdown from './Dropdown'

const Navbar = () => {
    return (
        <nav className='bg-orange-500 py-3 min-w-72 flex justify-between items-center content-center px-5 gap-9'>
            <div className='flex items-center gap-9 flex-wrap'>
                <LiveClock />
                <span className='text-white text-xl font-serif font-bold'>WeatherInfo</span>
            </div>
            <ul className='navbar flex gap-4 text-black md:'>
                <li><a className='hover:font-semibold' href="/WeatherInfo/">Home</a></li>
                <li><a className='hover:font-semibold' href="/WeatherInfo/mylocation">My Location</a></li>
                <li><a className='hover:font-semibold' href="/WeatherInfo/city">City</a></li>
                <li><a className='hover:font-semibold' href="/WeatherInfo/coordinates">Co-odinates</a></li>
                <li><a className='hover:font-semibold' href="/WeatherInfo/weatherlogs">Weather logs</a></li>
                <li><a className='hover:font-semibold' href="https://github.com/sk66641">About Us</a></li>
            </ul>
            <Dropdown />
        </nav>
    )
}

export default Navbar
