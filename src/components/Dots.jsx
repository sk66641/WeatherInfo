import React, { useState, useEffect } from 'react';

function FetchingDots() {
    const [dots, setDots] = useState('');

    // Working:
    // useEffect: Runs after the component mounts.
    // setInterval: Sets up a timer that runs every 500 milliseconds (0.5 seconds).
    // setDots: Updates the dots state:
    // If dots has fewer than 3 dots, it adds one more dot.
    // If dots has 3 dots, it resets to an empty string.
    // clearInterval: Cleans up the interval when the component unmounts to prevent memory leaks.
    // []: The dependency array ensures this effect runs only once after the initial render.

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <div className='h-96 flex justify-center w-1/2 text-center items-center'>Please allow location access and check your internet connectivity to fetch location information {dots}</div>;
}

export default FetchingDots;