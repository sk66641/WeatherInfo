import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { convertUnit } from "../../FunctionStore";
import { ContextCurrentWeather } from "../../context/context";
import { useContext } from "react";
import { useSelector } from "react-redux";

const TempAndDetails = () => {

    const { CurrentWeather } = useContext(ContextCurrentWeather)
    const isFarenheit = useSelector((state) => state.tempUnit)
    // console.log("from tempAndDetails.jsx", isFarenheit)

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Feels like",
            value: convertUnit(CurrentWeather.main.feels_like, isFarenheit),
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${CurrentWeather.main.humidity} % `,
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${(CurrentWeather.wind.speed * 3.6).toFixed(2)} km/h`,
        },
    ];


    return (
        <div>
            <div className="flex flex-wrap text-wrap items-center justify-center text-center text-xl font-light">
                <p className="capitalize">{CurrentWeather.weather[0].description}</p>
            </div>

            <div className="flex flex-wrap text-wrap text-center flex-row items-center justify-between py-6">
                <div className="flex flex-wrap text-wrap text-center items-center justify-center w-1/2">
                    <img
                        src={`http://openweathermap.org/img/wn/${CurrentWeather.weather[0].icon}@2x.png`}
                        alt="WeatherIcon"
                        className="w-20"
                    />
                    {/* if true F, else C */}
                    <p className="text-5xl text-center">{convertUnit(CurrentWeather.main.temp, isFarenheit)}</p>
                </div>
                <div className="flex flex-wrap text-wrap text-center flex-col gap-2 items-start w-1/4">
                    {verticalDetails.map(({ id, Icon, title, value }) => (
                        <div
                            key={id}
                            className="flex flex-wrap text-wrap text-center font-light text-sm items-center justify-center"
                        >
                            <Icon size={18} />
                            <p className="font-light ml-1">
                                {`${title}: `}
                                <span className="font-medium ml-1">{value}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TempAndDetails
