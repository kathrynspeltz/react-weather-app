import "./current-weather.css"

const CurrentWeather = ({ data, airData }) => {
    let airQualityValue = airData.list[0].main.aqi
    let airQualityNames = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]

    return (
        <>
            <h2>Current Weather</h2>
            <div className="weather">
                <div className="top">
                    <div className="headers">
                        <p className="city">{data.city}</p>
                        <p className="weather-description">{data.weather[0].description}</p>
                        <p className="temperature">{Math.round(data.main.temp)}°F</p>
                    </div>
                    <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
                </div>
                <div className="bottom">

                    <div className="details">
                        <div className="parameter-row">
                            <span className="parameter-label">Feels like</span>
                            <span className="parameter-value">{Math.round(data.main.feels_like)}°F</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Wind</span>
                            <span className="parameter-value">{Math.round(data.wind.speed)} mph</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Humidity</span>
                            <span className="parameter-value">{data.main.humidity} %</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Air Quality Index</span>
                            <span className="parameter-value">{airQualityNames[airQualityValue - 1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentWeather