import { ContextTempUnit } from './context/context'
import { DateTime } from 'luxon';
import { useContext } from 'react';

export const fixTo0 = (value) => value.toFixed(0);

export const convertToF = (celsius) => (celsius * 9 / 5) + 32;

export const convertUnit = (celsius) => {
    const { changeTempUnit } = useContext(ContextTempUnit);
    return `${changeTempUnit ? convertToF(celsius.toFixed(0)).toFixed(0) + " °F" : celsius.toFixed(0) + " °C"}`;
};

export const convertUnixToTime = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC').plus({ seconds: timezoneOffset });
    return localDateTime.toFormat('EEE, dd MMM yyyy | hh:mm a');
};

export const convertUnixToString = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC');
    return localDateTime.toFormat('hh:mm a');
};

export const convertUnixToDate = (unixTimestamp, timezoneOffset) => {
    const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC');
    return localDateTime.toFormat('ZZZZ | EEE, dd MMM yyyy');
};

export const convertTimezone = (timezoneOffset) => {
    const offsetHours = Math.floor(timezoneOffset / 3600);
    const offsetMinutes = Math.abs(timezoneOffset % 3600 / 60);
    const sign = offsetHours >= 0 ? ' +' : ' -';
    return `UTC${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
};

export const convertWindDirection = (deg) => {
    const directions = [
        "North", "North-NE", "Northeast", "East-NE",
        "East", "East-SE", "Southeast", "South-SE",
        "South", "South-SW", "Southwest", "West-SW",
        "West", "West-NW", "Northwest", "North-NW"
    ];
    const index = Math.round(deg / 22.5);
    return directions[index];
};


export const formatVisibility = (visibility) => (visibility / 10000).toFixed(2) + ' km';




