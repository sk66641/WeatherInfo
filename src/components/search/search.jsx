import React, { useState, useContext } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "./api";

const Search = ({ onSearchChange }) => {
    const loadOptions = async (inputValue) => {
        return await fetch(
            `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(async (response) => await response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            lat: `${city.latitude}`,
                            lon: `${city.longitude}`,
                            label: `${city.name}, ${city.region}, ${city.countryCode}`,
                        };
                    }),
                };
            });
    };
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        // setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate

            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            styles={{
                control: (base) => ({
                    ...base,
                    border: "none", // Remove default border
                    boxShadow: "none", // Remove default box shadow
                    borderRadius: "0.75rem", // Tailwind equivalent: `rounded-xl`
                }),
            }}
            className="text-gray-500 text-xl font-light w-3/4"
        />
    );
};

export default Search;