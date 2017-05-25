import axios from 'axios';

const { CancelToken } = axios;


class OpenWeatherClient {

    constructor() {
        this.cancelRequest = null;
        this.CACHE = new Map();

    }

    getWeather(cityId) {

        const cachedForecasts = this.CACHE.get(cityId);

        return new Promise((resolve, reject) => {
            if (cachedForecasts && !this.isExpiredRequest(cachedForecasts.requestedTime)) {
                resolve(cachedForecasts.forecasts);
            } else {
                try {
                    if (this.cancelRequest !== null) {
                        this.cancelRequest();
                    }
                    let requestedTime = new Date();
                    let forecasts = this.getForecast(cityId);

                    this.CACHE.set(cityId, {
                        forecasts: forecasts,
                        requestedTime: requestedTime
                    });

                    resolve(forecasts);

                } catch (err) {
                    reject(err);

                }
            }

        });

    }

    async getForecast(cityId) {

        try {
            const fiveDayForecast = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    id: cityId,
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