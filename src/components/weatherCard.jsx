import React from 'react';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
    }
render() {
    return (
        <div className='weather-card'>
            <p className='weather-card_property'>{this.props.time}</p>
            <img src={this.props.iconUrl} className='weather-icon' /> 
            <p className='weather-card_property'>{this.props.weatherDescription}</p>
            <p className='weather-card_property'>temperature: {this.props.temperature} &#8451;</p>
            <p className='weather-card_property'>humidity: {this.props.humidity} &#37;</p>
            <p className='weather-card_property'>wind: {this.props.windDirection} {this.props.windSpeed} m/s</p>
            <p className='weather-card_property'>pressure: {this.props.pressure} mmHg</p>
        </div>
    )
}


}

export default WeatherCard;