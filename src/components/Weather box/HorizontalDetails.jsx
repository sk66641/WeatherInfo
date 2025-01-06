import React from 'react'
import { CgArrowDown, CgArrowUp } from 'react-icons/cg';
import { FiWind } from 'react-icons/fi';
import { MdVisibility } from "react-icons/md";
import { WiBarometer, WiSunrise, WiSunset, WiWindy } from 'react-icons/wi';
import { convertUnit, convertWindDirection, formatVisibility } from '../Home';
import { convertUnixToString } from '../Home';

const HorizontalDetails = (props) => {

    const HorizontalDetails = [
        {
            id: 1,
            Icon: CgArrowUp,
            title: "Max Temp",
            value: convertUnit(props.weather.main.temp_max),
        },
        {
            id: 2,
            Icon: CgArrowDown,
            title: "Min Temp",
            value: convertUnit(props.weather.main.temp_min),
        },
        {
            id: 3,
            Icon: WiSunrise,
            title: "Sunrise",
            value: convertUnixToString(props.weather.sys.sunrise, props.weather.timezone),
        },
        {
            id: 4,
            Icon: WiSunset,
            title: "Sunset",
            value: convertUnixToString(props.weather.sys.sunset, props.weather.timezone),
        },
        {
            id: 5,
            Icon: WiBarometer,
            title: "Pressure",
            value: props.weather.main.pressure + " hPa",
        },
        {
            id: 6,
            Icon: WiWindy,
            title: "Wind Direction",
            value: convertWindDirection(props.weather.wind.deg),
        },
        {
            id: 7,
            Icon: FiWind,
            title: "Wind Gust",
            value: `${props.weather.wind.gust ? (props.weather.wind.gust * 3.6).toFixed(2) + " km/h" : "NA"}`

        },
        {
            id: 8,
            Icon: MdVisibility,
            title: "Visibility",
            value: formatVisibility(props.weather.visibility),
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
