
import { Line } from 'react-chartjs-2';


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
                            },
                            scales: {
                                x: [
                                    {
                                        type: 'linear', // Use 'linear' for numeric data on the x-axis
                                        position: 'bottom',
                                    },
                                ],
                            },
                        }
                    }}
                />
            </div>

        </>
    )
}
export default ForecastGraph