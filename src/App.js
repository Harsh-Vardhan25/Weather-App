import './App.css';
import Search from './search';
import CurrentWeather from './weather';
import Forecast from './forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from 'react';

function App() {
    const [currWeather, setCurrWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        // const currWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=44.34&lon=10.99&appid=${WEATHER_API_KEY}&units=metric`);
        // const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=44.34&lon=10.99&appid=${WEATHER_API_KEY}&units=metric`);

        Promise.all([currWeatherFetch, forecastFetch])
        .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();

            setCurrWeather({ city : searchData.label, ...weatherResponse });
            setForecast({ city : searchData.label, ...forecastResponse });
        })
        .catch(err => {console.log(err)});
        // console.log(searchData);
    }

    console.log(currWeather);
    console.log(forecast);


    return (
        <div className='container'>
            <Search onSearchChange={handleOnSearchChange} />
            {/* <CurrentWeather /> */}
            {currWeather && <CurrentWeather data={currWeather}/>}
            {forecast && <Forecast data={forecast} />}
        </div>
    );
}

export default App;