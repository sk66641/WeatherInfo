import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "./api";

const Search = ({ onSearchChange }) => {

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            lat: `${city.latitude}`,
                            lon: `${city.longitude}`,
                            label: `${city.name}, ${city.region}, ${city.countryCode}`,
                            city: `${city.name}`,
                            region: `${city.region}`,
                            countryCode: `${city.countryCode}`,
                        };
                    }),
                };
            });
    };


    const handleOnChange = async (searchData) => {
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={""}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            styles={{
                control: (base) => ({
                    ...base,
                    border: "none",
                    boxShadow: "none",
                    borderRadius: "0.75rem",
                }),
            }}
            className="text-gray-500 text-xl font-light w-3/4"
        />
    );
};

export default Search;
