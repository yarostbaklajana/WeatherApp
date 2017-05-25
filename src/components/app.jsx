import React from 'react';
import SearchForm from './searchForm';
import WeatherResults from './weatherResults';
import Spinner from './spinner';
import OpenWeatherClient from '../client/openWeatherClient';
import moment from 'moment';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecasts: [],
            error: null,
            isLoading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(cityId) {

        this.setState({
            isLoading: true,
            forecasts: [],
            error: null
        });

        OpenWeatherClient.getWeather(cityId).then(
            (allForecastedDataArray) => {
                this.setState({
                    forecasts: this.getForecastCards(allForecastedDataArray),
                    isLoading: false
                });
            },
            (error) => {
                this.setState({
                    error: error.message,
                    isLoading: false
                });
            });
    }

    getForecastCards(allForecastedDataArray) {
        const forecastCards = [];
        allForecastedDataArray.forEach((singleForecast) => {
            forecastCards.push({
                dateTime: this.convertToLocaleDateTime(singleForecast.dt),
                weather: singleForecast.weather[0].description,
                weatherIconUrl: `http://openweathermap.org/img/w/${singleForecast.weather[0].icon}.png`,
                temperature: Math.round(singleForecast.main.temp),
                humidity: singleForecast.main.humidity,
                pressure: this.convertHectopascalsToMmHg(singleForecast.main.pressure),
                wind: {
                    direction: this.convertToCompassDirection(singleForecast.wind.deg),
                    speed: singleForecast.wind.speed.toFixed(1)
                }
            })
        });
        return forecastCards;
    }

    convertToLocaleDateTime(utc) {
        const dateTime = moment.unix(utc);
        return dateTime.format('DD/MM/YYYY - HH:mm');
    }

    convertHectopascalsToMmHg(hPa) {
        return Math.round(hPa * 0.75);
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
                <header className='main-header'><h1 className='main-header_heading'>Weather</h1></header>
                <SearchForm handleSubmit={this.handleSubmit} />

                <div className='weather-cards-container'>{this.state.isLoading && <Spinner />}{this.state.error ? <div className='error-message'>{this.state.error}</div> : <WeatherResults forecasts={this.state.forecasts} />}</div>
            </div>
        )
    }
}

export default App;
