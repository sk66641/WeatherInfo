import React from 'react'
import { convertTimezone, convertUnixToTime } from '../Home'

const TimeAndLocation = (props) => {
    return (
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-xl font-light">
                    {convertUnixToTime(props.weather.dt, props.weather.timezone)} | {convertTimezone(props.weather.timezone)}
                </p>
            </div>

            <div className="flex flex-col items-center justify-center my-3">
                <p className="text-3xl font-medium">{props.weather.name}, {props.weather.sys.country}</p>
                <p>Lat: {props.weather.coord.lat}, Lon: {props.weather.coord.lon}</p>
            </div>
        </div>
    )
}

export default TimeAndLocation
