import React from 'react'
import { BiLogoGithub, BiLogoLinkedin, BiSun } from 'react-icons/bi'
import LiveClock from './LiveClock'
import { redirect } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-gray-700 flex justify-center items-center gap-6 py-1 shadow-xl shadow-gray-400 min-w-[430px] fixed bottom-0 w-full'>
            <a href="https://github.com/sk66641" target='_blank' className='hover:scale-110 transition-transform duration-300'>
                <BiLogoGithub color='lightgreen' size={40} />
            </a>
            <div className='flex justify-center items-center gap-2'>
                <BiSun color='yellow' size={30} />
                <a href="https://weather-info-green.vercel.app/">
                    <span className='text-white text-xl font-serif font-bold'>WeatherInfo</span>
                </a>
            </div>
            <a href="https://www.linkedin.com/in/sanu-kumar-2a9492283/" target='_blank' className='hover:scale-110 transition-transform duration-300'>
                <BiLogoLinkedin color='lightgreen' size={40} />
            </a>
        </footer>
    )
}

export default Footer
