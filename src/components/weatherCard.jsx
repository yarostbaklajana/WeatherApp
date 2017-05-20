import React from 'react';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
    }
render() {
    return (
        <div className='weather-card'>
            <p className='weather-card_property'>{this.props.forecast.dateTime}</p>
            <img src={this.props.forecast.weatherIconUrl} className='weather-icon' /> 
            <p className='weather-card_property'>{this.props.forecast.weather}</p>
            <p className='weather-card_property'>temperature: {this.props.forecast.temperature} &#8451;</p>
            <p className='weather-card_property'>humidity: {this.props.forecast.humidity} &#37;</p>
            <p className='weather-card_property'>wind: {this.props.forecast.direction} {this.props.windSpeed} m/s</p>
            <p className='weather-card_property'>pressure: {this.props.forecast.pressure} mmHg</p>
        </div>
    )
}


}

export default WeatherCard;