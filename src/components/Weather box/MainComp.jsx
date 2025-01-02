import React from 'react'
import { useState } from 'react'
import Topbuttons from './Topbuttons'
import InputDetails from './InputDetails'
import TimeAndLocation from './TimeAndLocation'
import TempAndDetails from './TempAndDetails'
import HorizontalDetails from './HorizontalDetails'
import { ContextTempUnit } from '../context/context'
const MainComp = (props) => {
  const [changeTempUnit, setChangeTempUnit] = useState(false)
  return (
    <div className='py-5 px-20 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700  shadow-xl shadow-gray-500 mb-9'>
      <ContextTempUnit.Provider value={{ changeTempUnit, setChangeTempUnit }}>
        <Topbuttons weather={props.weather} askUser={props.askUser} />
        <InputDetails weather={props.weather} show={props.showWeatherCity} />
        <TimeAndLocation weather={props.weather} />
        <TempAndDetails weather={props.weather} />
        <HorizontalDetails weather={props.weather} />
      </ContextTempUnit.Provider>
    </div>
  )
}

export default MainComp
