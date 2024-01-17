
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weeather/current-weather';
import { weather_api_url, weather_api_key } from './api';
import { useState } from 'react';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${weather_api_url}/weather?lat=${lat}lon=${lon}&appid=${weather_api_key}`)
    const forecastFetch = fetch(`${weather_api_url}/forecast?lat=${lat}lon=${lon}&appid=${weather_api_key}`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err))
  }

  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather data={currentWeather} />
    </div>
  );
}

export default App;
