import React from 'react';
import SearchForm from './searchForm';
import axios from 'axios';
import moment from 'moment';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(cityId) {
        try {
            console.log(await this.getForecast(cityId));
        } catch (err) {
            console.error(err);
        }
        
    }

    async getForecast(cityId) {
        try {
            const fiveDayForecast = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    id: cityId,
                    APPID: process.env.OPENWEATHER_API_KEY,
                    units: 'metric'
                }
            });
            
            const threeDayForecastList = fiveDayForecast.data.list.slice(0, 25);

            return this.getForecastCards(threeDayForecastList);
        } catch (err) {
            throw err.message;
        }
    }

    getForecastCards(allForecastedDataArray) {
        const forecastCards = [];
        allForecastedDataArray.forEach((singleForecast) => { forecastCards.push({
                dateTime: this.convertToLocaleDateTime(singleForecast.dt),
                weather: singleForecast.weather[0].description,
                weatherIconUrl: `http://openweathermap.org/img/w/${singleForecast.weather[0].id}.png`,
                temperature: singleForecast.main.temp,
                humidity: singleForecast.main.humidity,
                pressure: this.convertHectopascalsToMmHg(singleForecast.main.pressure),
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
        return (hPa * 0.75).toFixed(0);
    }

    convertToCompassDirection(directionInDeg) {
        if (directionInDeg >= 337.5 && directionInDeg <= 22.5) {
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
