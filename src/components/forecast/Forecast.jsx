import React from 'react'
import { convertUnit, convertUnixToString } from '../Home'
import { convertUnixToTime } from '../Home'
import { convertUnixToDate } from '../Home'
import { Accordion, AccordionItemHeading, AccordionItem, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css';
import { MdArrowDropDown } from 'react-icons/md'
// import { ContextTempUnit } from '../context/context'
const Forecast = ({ forecast, getWeatherStyle }) => {


    /* 
        Object.entries():
            The groupByTimestamp function returns an object, so we use Object.entries() to convert it into an array of [key, value] pairs, where:
                key is the date (the timestamp or date string).
                value is the items (the array of forecast data for that date).
        Mapping Over Entries:
            After transforming the object to an array, we map over it with Object.entries(). Each [date, items] pair is destructured, where date is used as the key for the outer div, and items contains the forecast data for that date.
        Rendering the Data:
            For each date, we render the forecast items, and each item’s details like time, weather, temperature, and an image icon.
    */

    const groupByTimestamp = (list, timezone) => {
        return list.reduce((accumulator, current) => {
            const date = convertUnixToDate(current.dt, timezone)
            if (!accumulator[date]) {
                accumulator[date] = []; // Initialize a new group if it doesn't exist
            }
            accumulator[date].push(current); // Add the item to the corresponding group
            return accumulator;
        }, {});
    };
    // { forecast.list && console.log(Object.entries(groupByTimestamp(forecast.list, forecast.city.timezone))) }
    // { forecast.list && console.log(forecast) }
    return (
        // <div className="py-5 px-5 rounded-xl shadow-xl shadow-gray-500 mb-9 bg-gradient-to-br from-gray-200 to-gray-400 text-black flex flex-wrap items-center justify-center max-w-[900px] gap-2 text-center text-wrap">

        // <Accordion allowZeroExpanded>
        //     {forecast.list && Object.entries(groupByTimestamp(forecast.list, forecast.city.timezone)).map(([date, items], index) => (
        //         <AccordionItem key={index}>
        //             <AccordionItemHeading>
        //                 <AccordionItemButton>
        //                     {/* <div className='flex w-full justify-start'> */}

        //                     {date}
        //                     {/* </div> */}
        //                 </AccordionItemButton>
        //             </AccordionItemHeading>
        //             {items.map((item, index) => (
        //                 // <span>
        //                 <AccordionItemPanel key={index}>
        //                     <p className="text-md font-light">
        //                         {convertUnixToString(item.dt, item.timezone)}
        //                     </p>
        //                     <p className='text-md capitalize'>{item.weather[0].main}</p>
        //                     <div className='flex flex-col justify-center items-center'>
        //                         <img width={35} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="img" />
        //                         <p className="text-md text-center">{convertUnit(item.main.temp)}</p>
        //                     </div>
        //                     {/* {time.dt} */}
        //                 </AccordionItemPanel>
        //                 // </span>

        //             ))}

        //         </AccordionItem>
        //     ))}
        // </Accordion>
        <div className='flex justify-center mb-6'>
            <Accordion allowZeroExpanded className='w-[786px] max-md:w-[400px] shadow-xl shadow-gray-500 rounded-xl'>
                {forecast.list &&
                    Object.entries(groupByTimestamp(forecast.list, forecast.city.timezone)).map(([date, items], index) => (
                        <AccordionItem key={index} >
                            <AccordionItemHeading>
                                <AccordionItemButton className={`${getWeatherStyle().bg} ${getWeatherStyle().text} font-bold py-2 px-4 flex justify-between items-center rounded-xl m-2 transition ease-in-out`}>

                                    {/* <div className='w-[500px]'> */}
                                    {date}
                                    <MdArrowDropDown/>
                                    {/* </div> */}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>

                                <div className="flex flex-wrap gap-4 justify-center items-center">
                                    {items.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col justify-center items-center ${getWeatherStyle().bg} ${getWeatherStyle().text} p-4 rounded-xl shadow-sm w-40`}
                                        >
                                            <p className="text-sm font-light text-center">{convertUnixToString(item.dt, item.timezone)}</p>
                                            <p className="text-sm capitalize text-center">{item.weather[0].main}</p>
                                            <img
                                                width={35}
                                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                alt="Weather Icon"
                                            />
                                            <p className="text-sm text-center">{convertUnit(item.main.temp)}</p>
                                        </div>
                                    ))}
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
            </Accordion>
        </div>

        // </div>
    )
}

export default Forecast

{/* {forecast.list && Object.entries(groupByTimestamp(forecast.list, forecast.city.timezone)).map(([date, items], index) => (

    items.map((time, index)=>(
        <div key={index}>{time.dt}</div>
    ))

))} */}
{/* <div className='border border-white' key={index}>
    
</div> */}