import React from 'react'
import FetchingDots from './Dots'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='flex min-w-72 px-10 justify-center items-center py-20'>
        <ul className='list-disc'>
          <li className='item-styles'><Link className='link-styles' to="/mylocation">Click Here</Link> to get your location weather</li>
          <li className='item-styles'><Link className='link-styles' to="/city">Click Here</Link> to get weather details using city name</li>
          <li className='item-styles'><Link className='link-styles' to="/coordinates">Click Here</Link> to get weather details using co-ordinates</li>
          <li className='item-styles'><Link className='link-styles' to="/weatherlog">Click Here</Link> to view the log of weather details for multiple entries using co-ordinates</li>
        </ul>
      </div>
    </>
  )
}

export default Home
