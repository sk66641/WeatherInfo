import React, { useState, useEffect } from 'react';

const LiveClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <span>{time.toDateString()}</span>
            <span>{time.toLocaleTimeString()}</span>
        </div>
    );
};

export default LiveClock;
