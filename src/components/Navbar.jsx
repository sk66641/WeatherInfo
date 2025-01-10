import React from 'react'
import LiveClock from './LiveClock'
import Dropdown from './weatherLog/Dropdown'
import { Link } from 'react-router-dom'
import { BiSun } from 'react-icons/bi'

const Navbar = () => {
    return (
        <nav className='bg-gray-700  py-1 flex w-full justify-around items-center content-center px-5 gap-9 fixed top-0 shadow-xl shadow-gray-400 text-purple-100 z-[10]'>
            <div className='navTitle flex items-center gap-7 text-center justify-center'>
                <LiveClock />
                <div className='flex justify-center items-center gap-2'>
                    <BiSun className='text-yellow-400' size={30} />
                    <a href="https://weather-info-green.vercel.app/">
                        <span className='text-whitet text-xl font-serif font-bold'>WeatherInfo</span>
                    </a>
                </div>
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
