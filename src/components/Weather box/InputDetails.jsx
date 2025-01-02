import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { useContext } from 'react'
import { ContextTempUnit } from '../context/context'
import { ContextFormCity } from '../context/context'
const InputDetails = (props) => {
  const { setChangeTempUnit } = useContext(ContextTempUnit)
  const { form, setform } = useContext(ContextFormCity)
  const handleChange = (event) => {
    setform({ ...form, [event.target.name]: event.target.value })
  }
  return (
    <div className="flex flex-row justify-center my-6 ">
      <div className="flex flex-row w-3/4 items-center justify-around">
        <input
          type="text"
          value={form.city} name='city' onChange={handleChange}
          placeholder="search by city..."
          className="text-gray-500 text-xl font-light p-2 w-3/4 shadow-xl capitalize focus:outline-none placeholder:lowercase rounded-xl"
        />
        <BiSearch onClick={props.show}
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button onClick={() => setChangeTempUnit(false)} className="text-2xl font-medium transition ease-out hover:scale-125">
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button onClick={() => setChangeTempUnit(true)} className="text-2xl font-medium transition ease-out hover:scale-125">
          °F
        </button>
      </div>
    </div>
  )
}

export default InputDetails
