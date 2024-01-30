
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Colors } from 'chart.js/auto';


const week_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const ForecastGraph = ({ data }) => {
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
                },
            ],
    };


    return (
        <>
            <div className="forecastChart">
                <h2>This Week's Forecast</h2>
                <div className="forecastChartBackdrop">
                    <Line
                        data={weatherData}
                        options={{
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                </div>
            </div>

        </>
    )
}
export default ForecastGraph