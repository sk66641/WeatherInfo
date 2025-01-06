import React, { useContext } from 'react';
import { ContextTempUnit } from '../../context/context';
import Search from './search';

const InputDetails = (props) => {
  const { setChangeTempUnit } = useContext(ContextTempUnit);

  const handleOnSearchChange = async (searchData) => {
    props.getWeather(searchData.lat, searchData.lon, searchData);
  };

  return (
    <div className="flex flex-row flex-wrap text-wrap justify-center my-6">
      <div className="flex w-3/4 items-center justify-center">
        <Search onSearchChange={handleOnSearchChange} />
      </div>

      <div className="flex flex-row w-1/5 items-center justify-start">
        <button
          onClick={() => setChangeTempUnit(false)}
          className="text-2xl font-medium transition ease-out hover:scale-125"
        >
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          onClick={() => setChangeTempUnit(true)}
          className="text-2xl font-medium transition ease-out hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default InputDetails;
