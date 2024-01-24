import { Accordion, AccordionItemHeading, AccordionItemPanel, AccordionItem, AccordionItemButton } from "react-accessible-accordion"
import './forecast.css'
import { Line } from 'react-chartjs-2';

const week_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = week_days.slice(dayInAWeek, week_days.length).concat(week_days.slice(0, dayInAWeek))

    let forecastArr = []

    for (let i = 0; i < 7; i++) {
        forecastArr.push(data.list[i].main.temp)
    }

    const weatherData = {
        labels: forecastDays,
        datasets:
            [
                {
                    label: "This Week's Temps",
                    data: forecastArr,
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
    };




    return (
        <>
            <div className="forecastChart">
                <h1>Line Chart Example</h1>
                <Line
                    data={weatherData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "This Week's Weather"
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>

            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="information-button">
                                <h2>This Week's Forecast</h2><p>(Click to expand)</p>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <Accordion allowZeroExpanded>
                            {data.list.slice(0, 7).map((item, idx) => (
                                <AccordionItem key={idx}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <div className="daily-item">
                                                <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`} />
                                                <label className="day">{forecastDays[idx]}</label>
                                                <label className="description">{item.weather[0].description}</label>
                                                <label className="min-max">{Math.round(item.main.temp)}°F</label>
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <div className="daily-details-grid">
                                            <div className="daily-details-grid-item">
                                                <label>Feels like:</label>
                                                <label>{Math.round(item.main.feels_like)}°F</label>
                                            </div>
                                        </div>
                                        <div className="daily-details-grid">
                                            <div className="daily-details-grid-item">
                                                <label>Wind speed:</label>
                                                <label>{item.wind.speed} mph</label>
                                            </div>
                                        </div>
                                        <div className="daily-details-grid">
                                            <div className="daily-details-grid-item">
                                                <label>Humidity</label>
                                                <label>{item.main.humidity}%</label>
                                            </div>
                                        </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>

        </>
    )
}
export default Forecast