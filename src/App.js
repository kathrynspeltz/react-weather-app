
import './App.css';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CurrentWeather from './components/current-weeather/current-weather';
import { weather_api_url, weather_api_key } from './api';
import { useState } from 'react';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [currentAirPollution, setAirPollution] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=imperial`)
    const forecastFetch = fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=imperial`)
    const airPollutionFetch = fetch(`${weather_api_url}/air_pollution?lat=${lat}&lon=${lon}&appid=${weather_api_key}`)

    Promise.all([currentWeatherFetch, forecastFetch, airPollutionFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const airPollutionResponse = await response[2].json()

        setCurrentWeather({ city: searchData.label, ...weatherResponse, })
        setForecast({ city: searchData.label, ...forecastResponse });
        setAirPollution({ city: searchData.label, ...airPollutionResponse })
      })
      .catch((err) => console.log(err))
  }
  console.log(currentWeather)
  console.log(forecast)
  console.log(currentAirPollution)

  return (
    <div className="container">
      <h1>Let's Talk About The Weather!</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} airData={currentAirPollution} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
