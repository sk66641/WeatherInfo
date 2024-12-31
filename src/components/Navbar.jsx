import React from 'react'
import LiveClock from './LiveClock'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='bg-orange-500 py-3 min-w-72 flex justify-between items-center content-center px-5 gap-9'>
            <div className='flex items-center gap-9 flex-wrap'>
                <LiveClock />
                <span className='text-white text-xl font-serif font-bold'>WeatherInfo</span>
            </div>
            <ul className='navbar flex gap-4 text-black md:'>
                <li><Link className='hover:font-semibold' to="/">Home</Link></li>
                <li><Link className='hover:font-semibold' to="/mylocation">My Location</Link></li>
                <li><Link className='hover:font-semibold' to="/city">City</Link></li>
                <li><Link className='hover:font-semibold' to="/coordinates">Co-odinates</Link></li>
                <li><Link className='hover:font-semibold' to="/weatherlogs">Weather logs</Link></li>
                <li><Link className='hover:font-semibold' to="https://github.com/sk66641">About Us</Link></li>
            </ul>
            <Dropdown />
        </nav>
    )
}

export default Navbar
