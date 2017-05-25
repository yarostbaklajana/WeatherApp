import axios from 'axios';

const { CancelToken } = axios;


class OpenWeatherClient {

    constructor() {
        this.cancelRequest = null;
        this.CACHE = new Map();

    }

    async getWeather(locationId) {

        const cachedForecasts = this.CACHE.get(locationId);

        if (cachedForecasts && !this.isExpiredRequest(cachedForecasts.requestedTime)) {
            return cachedForecasts.forecasts;
        } else {
            try {
                if (this.cancelRequest !== null) {
                    this.cancelRequest();
                }
                let requestedTime = new Date();
                let forecasts = await this.getForecast(locationId);

                this.CACHE.set(locationId, {
                    forecasts: forecasts,
                    requestedTime: requestedTime
                });

                return forecasts;

            } catch (err) {
                throw err;
            }
        }

    }

    async getForecast(locationId) {

        try {
            const fiveDayForecast = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    id: locationId,
                    APPID: process.env.OPENWEATHER_API_KEY,
                    units: 'metric'
                },

                cancelToken: new CancelToken((c) => {
                    this.cancelRequest = c;
                })
            });

            const threeDayForecastList = fiveDayForecast.data.list.slice(0, 24);

            return threeDayForecastList;
        } catch (err) {
            throw err;
        }
    }

    isExpiredRequest(date) {
        return new Date().getTime() - date.getTime() > 300000;
    }

}

export default OpenWeatherClient = new OpenWeatherClient();