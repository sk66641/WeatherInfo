import React, { useState, useRef, useEffect } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown relative text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={toggleDropdown}
      >
        Options
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-semibold" href="/">Home</a>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-semibold" href="/coordinates">Co-ordinates</a>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-semibold" href="/weatherlogs">Weather logs</a>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-semibold" href="https://github.com/sk66641">Contact</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
