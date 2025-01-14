import React from 'react'
import { CgArrowDown, CgArrowUp } from 'react-icons/cg';
import { FiWind } from 'react-icons/fi';
import { MdVisibility } from "react-icons/md";
import { WiBarometer, WiSunrise, WiSunset, WiWindy } from 'react-icons/wi';
import { convertUnit, convertWindDirection, formatVisibility, convertUnixToTime } from '../../FunctionStore';
import { ContextCurrentWeather } from '../../context/context';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

const HorizontalDetails = () => {

    const { CurrentWeather } = useContext(ContextCurrentWeather)
    const isFarenheit = useSelector((state) => state.tempUnit)

    const HorizontalDetails = [
        {
            id: 1,
            Icon: CgArrowUp,
            title: "Max Temp",
            value: convertUnit(CurrentWeather.main.temp_max, isFarenheit),
        },
        {
            id: 2,
            Icon: CgArrowDown,
            title: "Min Temp",
            value: convertUnit(CurrentWeather.main.temp_min, isFarenheit),
        },
        {
            id: 3,
            Icon: WiSunrise,
            title: "Sunrise",
            value: convertUnixToTime(CurrentWeather.sys.sunrise, CurrentWeather.timezone),
        },
        {
            id: 4,
            Icon: WiSunset,
            title: "Sunset",
            value: convertUnixToTime(CurrentWeather.sys.sunset, CurrentWeather.timezone),
        },
        {
            id: 5,
            Icon: WiBarometer,
            title: "Pressure",
            value: CurrentWeather.main.pressure + " hPa",
        },
        {
            id: 6,
            Icon: WiWindy,
            title: "Wind Direction",
            value: convertWindDirection(CurrentWeather.wind.deg),
        },
        {
            id: 7,
            Icon: FiWind,
            title: "Wind Gust",
            value: `${CurrentWeather.wind.gust ? (CurrentWeather.wind.gust * 3.6).toFixed(2) + " km/h" : "NA"}`

        },
        {
            id: 8,
            Icon: MdVisibility,
            title: "Visibility",
            value: formatVisibility(CurrentWeather.visibility),
        },
    ];

    return (
        <div className="py-3">
            <div className="flex flex-wrap text-wrap text-center flex-row items-center justify-center gap-10 text-sm py-3">
                {HorizontalDetails.filter((item) => (item.id <= 4)).map(({ id, Icon, title, value }) => (
                    <div key={id} className="flex flex-wrap text-wrap flex-row items-center justify-center">
                        <Icon size={30} />
                        <p className="font-light ml-1">
                            {`${title}: `}
                            <span className="font-medium ml-1">{value}</span>
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap text-wrap text-center flex-row items-center justify-center gap-10 text-sm mt-6">
                {HorizontalDetails.filter((item) => (item.id > 4)).map(({ id, Icon, title, value }) => (
                    <div key={id} className="flex flex-wrap text-wrap flex-row items-center justify-center">
                        <Icon size={30} />
                        <p className="font-light ml-1">
                            {`${title}: `}
                            <span className="font-medium ml-1">{value}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HorizontalDetails
