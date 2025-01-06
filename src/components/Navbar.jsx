import React from 'react'
import LiveClock from './LiveClock'
import Dropdown from './weatherLog/Dropdown'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='bg-gradient-to-br from-teal-500 to-blue-800  py-3 min-w-96 flex w-full justify-between items-center content-center px-5 gap-9 fixed top-0 shadow-xl shadow-gray-400 text-purple-100 z-[10]'>
            <div className='navTitle flex items-center gap-9 flex-wrap'>
                <LiveClock />
                <span className='text-white text-xl font-serif font-bold'><a href="https://github.com/sk66641/">WeatherInfo</a></span>
            </div>
            <ul className='navbar flex gap-4 text-white md:'>
                <li><Link className='hover:font-semibold' to="/">Home</Link></li>
                <li><Link className='hover:font-semibold' to="/coordinates">Co-ordinates</Link></li>
                <li><Link className='hover:font-semibold' to="/weatherlogs">Weather logs</Link></li>
                <li><Link className='hover:font-semibold' to="https://github.com/sk66641">About Us</Link></li>
            </ul>
            <Dropdown />
        </nav>
    )
}

export default Navbar
