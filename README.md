# WeatherInfo

### How It Works

1. The application requests permission from the user to access their location coordinates using `navigator.geolocation`.
2. These coordinates are passed to the OpenWeather API to fetch weather data, which is then displayed to the user.
3. After successfully loading the initial data, the user can use the search option to find weather information for other locations. This search uses the RapidAPI to get the coordinates of the specified location.
4. The coordinates are then passed to the OpenWeather API, and the fetched data is displayed.
5. Meanwhile, the fetched data from the RapidAPI is stored in an array and saved to the user's localStorage. This allows recent searches to be displayed at the top, even after a page refresh.

