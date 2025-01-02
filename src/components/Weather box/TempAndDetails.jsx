import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { convertUnit } from "../Home";
const TempAndDetails = (props) => {

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Feels like",
            value: convertUnit(props.weather.main.feels_like),
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${props.weather.main.humidity} % `,
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${(props.weather.wind.speed * 3.6).toFixed(2)} km/h`,
        },
    ];


    return (
        <div>
            <div className="flex items-center justify-center text-xl font-light text-gray-300">
                <p>{props.weather.weather[0].main}</p>
            </div>

            <div className="flex flex-row items-center justify-between py-6">
                <div className="flex items-center justify-center w-1/2">
                    <img
                        src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
                        alt="WeatherIcon"
                        className="w-20"
                    />
                    {/* if true F, else C */}
                    <p className="text-5xl">{convertUnit(props.weather.main.temp)}</p>
                </div>
                <div className="flex flex-col gap-2 items-start w-1/4">
                    {verticalDetails.map(({ id, Icon, title, value }) => (
                        <div
                            key={id}
                            className="flex font-light text-sm items-center justify-center"
                        >
                            <Icon size={18} className="mr-1" />
                            {title}: <span className="font-medium ml-1">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TempAndDetails
