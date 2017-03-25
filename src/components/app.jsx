import React from 'react';
import SearchForm from './searchForm';
import axios from 'axios';
import moment from 'moment';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(cityID) {
        try {
            console.log(await this.getForecasts(cityID));
        } catch (err) {
            console.error(err);
        }
        
    }

    async getForecasts(cityID) {
        try {
            const fiveDayForecast = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    id: cityID,
                    APPID: process.env.OPENWEATHER_API_KEY,
                    units: 'metric'
                }
            });
            
            const threeDayForecastList = fiveDayForecast.data.list.slice(0, 21);

            return this.getForecastCards(threeDayForecastList);
        } catch (err) {
            throw err.message;
        }
    }

    getForecastCards(allForecastedDataArray) {
        let forecastCards = [];
        allForecastedDataArray.forEach((singleForecast) => { forecastCards.push({
                dateTime: this.convertToLocaleDateTime(singleForecast.dt),
                weather: singleForecast.weather[0].description,
                weatherIconId: singleForecast.weather[0].id,
                temperature: singleForecast.main.temp,
                humidity: singleForecast.main.humidity,
                pressure: singleForecast.main.pressure,
                wind: {
                    direction: this.convertToCompassDirection(singleForecast.wind.deg),
                    speed: singleForecast.wind.speed.toFixed(1)
                }
            }) });
            return forecastCards;
    }

    convertToLocaleDateTime(utc) {
        const dateTime = moment.unix(utc);
        return dateTime.format('DD/MM/YYYY - HH:mm'); 
    }

    convertHectopascalsToMmHg(hPa) {
        return hpa * 0,75;
    }

    convertToCompassDirection(directionInDeg) {
        if (directionInDeg >= 337.2 && directionInDeg <= 22.5) {
            return 'N';
        } else if (directionInDeg > 22.5 && directionInDeg < 67.5) {
            return 'NE';
        } else if (directionInDeg >= 67.5 && directionInDeg <= 112.5) {
            return 'E';
        } else if (directionInDeg > 112.5 && directionInDeg < 157.5) {
            return 'SE';
        } else if (directionInDeg >= 157.5 && directionInDeg <= 202.5) {
            return 'S';
        } else if (directionInDeg > 202.5 && directionInDeg < 247.5) {
            return 'SW';
        } else if (directionInDeg >= 247.5 && directionInDeg <= 292.5) {
            return 'W';
        } else {
            return 'NW';
        }
    }

    render() {
        return (
            <div className='app-container'>
                <SearchForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default App;
