import React from 'react';
import { convertTimezone, convertUnixToTime } from '../../FunctionStore';
import { TbWorldLatitude, TbWorldLongitude } from 'react-icons/tb';

const TimeAndLocation = ({CurrentWeather}) => {

    return (
        <div>
            <div className="flex flex-wrap text-wrap text-center items-center justify-center my-6">
                <p className="text-xl font-light">
                    {convertUnixToTime(CurrentWeather.dt, CurrentWeather.timezone)} | {convertTimezone(CurrentWeather.timezone)}
                </p>
            </div>

            <div className="flex flex-wrap text-wrap text-center flex-col items-center justify-center my-3">
                <p className="text-3xl font-medium">{CurrentWeather.region ? CurrentWeather.label : `${CurrentWeather.name},  ${CurrentWeather.sys.country}`}</p>
                <p className='flex justify-center items-center text-center'>
                    <TbWorldLatitude className='mr-1' /> {CurrentWeather.coord.lat}, <TbWorldLongitude className='mr-1 ml-1' /> {CurrentWeather.coord.lon}
                </p>
            </div>
        </div>
    );
}

export default TimeAndLocation;
