import React from 'react';
import SearchForm from './searchForm';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(cityID) {
        console.log(await this.getForecasts(cityID));
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
            return err.message;
        }
    }

    getForecastCards(allForecastedDataArray) {
        let forecastCards = [];
        allForecastedDataArray.forEach((singleForecast) => { forecastCards.push({
                date_time: this.convertToLocaleDateTime(singleForecast.dt),
                weather: singleForecast.weather[0].description,
                weather_icon_id: singleForecast.weather[0].id,
                temperature: singleForecast.main.temp,
                humidity: singleForecast.main.humidity,
                pressure: singleForecast.main.pressure,
                wind: {
                    direction: singleForecast.wind.deg,
                    speed: singleForecast.wind.speed
                }
            }) });
            return forecastCards;
    }

    convertToLocaleDateTime(utc) {
        let date = new Date(0);
        date.setUTCSeconds(utc);
        const yy = date.getFullYear();
        const mm = date.getMonth();
        const dd = date.getDay();
        return dd + '/' + mm + '/' + yy  + ' ' + date.toLocaleTimeString({ hour12: false });
    }

    convertToCompassDirection(directionInPercents) {
        
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
