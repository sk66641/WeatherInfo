import React from 'react';
import { convertTimezone, convertUnixToTime } from '../Home';
import { TbWorldLatitude, TbWorldLongitude } from 'react-icons/tb';
import { useSelector } from 'react-redux';
const TimeAndLocation = (props) => {

    const check = useSelector((state) => state.location)
    // console.log(check)
    return (
        <div>
            <div className="flex flex-wrap text-wrap text-center items-center justify-center my-6">
                <p className="text-xl font-light">
                    {convertUnixToTime(props.weather.dt, props.weather.timezone)} | {convertTimezone(props.weather.timezone)}
                </p>
            </div>

            <div className="flex flex-wrap text-wrap text-center flex-col items-center justify-center my-3">
                <p className="text-3xl font-medium">{props.weather.region ? props.weather.label : `${props.weather.name},  ${props.weather.sys.country}`}</p>
                <p className='flex justify-center items-center text-center'>
                    <TbWorldLatitude className='mr-1' /> {props.weather.coord.lat}, <TbWorldLongitude className='mr-1 ml-1' /> {props.weather.coord.lon}
                </p>
            </div>
        </div>
    );
}

export default TimeAndLocation;
