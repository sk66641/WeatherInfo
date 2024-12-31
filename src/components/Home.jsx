import React from 'react'
import FetchingDots from './Dots'

const Home = () => {
  return (
    <>
      <div className='flex min-w-72 px-10 justify-center items-center py-20'>
        <ul className='list-disc'>
          <li className='item-styles'><a className='link-styles' href="/mylocation">Click Here</a> to get your location weather</li>
          <li className='item-styles'><a className='link-styles' href="/city">Click Here</a> to get weather details using city name</li>
          <li className='item-styles'><a className='link-styles' href="/coordinates">Click Here</a> to get weather details using co-ordinates</li>
          <li className='item-styles'><a className='link-styles' href="/weatherlog">Click Here</a> to view the log of weather details for multiple entries using co-ordinates</li>
        </ul>
      </div>
    </>
  )
}

export default Home
