import React from 'react';
import WeatherCard from './weatherCard';

class WeatherResults extends React.Component {
    constructor(props) {
        super(props);

        this.getCards = this.getCards.bind(this);
    }

    getCards(forecasts) {
        let cardsList = [];
        if (forecasts) {
            cardsList = forecasts.map((singleForecast) => <WeatherCard
                key={singleForecast.dateTime}
                forecast={singleForecast}
            />);
        }

        return cardsList;
    }

    render() {
        return (
            <div>{this.getCards(this.props.forecasts)}</div>
        )
    }
}

export default WeatherResults;
