const RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${RapidAPI_Key}`,// enter your rapid api key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";