import React from 'react';
import Search from './search';
import { useDispatch } from 'react-redux';
import { setChangeTempUnitRedux } from '../../../redux/changeTempUnit/changeTempUnitRedux';

const InputDetails = ({ getWeather }) => {

  const dispatch = useDispatch()

  const handleOnSearchChange = async (searchData) => {
    getWeather(searchData.lat, searchData.lon, searchData);
  };

  return (
    <div className="flex flex-row flex-wrap text-wrap justify-center my-6">
      <div className="flex w-3/4 items-center justify-center">
        <Search onSearchChange={handleOnSearchChange} />
      </div>

      <div className="flex flex-row w-1/5 items-center justify-start">
        <button
          onClick={() => dispatch(setChangeTempUnitRedux(false))}
          className="text-2xl font-medium transition ease-out hover:scale-125"
        >
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          onClick={() => dispatch(setChangeTempUnitRedux(true))}
          className="text-2xl font-medium transition ease-out hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default InputDetails;
