import React from 'react';
import InputWithAutocomplete from './inputWithAutocomplete';
import * as locationsMap from '../../locations/ukraine.json';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            isValid: false,
            wasChanged: false,
            locationsNames: Object.keys(locationsMap)
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value) {
        this.setState({
            inputText: value,
            isValid: this.isValid(value),
            wasChanged: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.isValid) {
            alert('Submitted');
        }
    }

    isValid(part) {
        return locationsMap.hasOwnProperty(part);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='search-form'>
                <InputWithAutocomplete onChange={this.handleChange} value={this.state.inputText} options={this.state.locationsNames} />
                <button className='search-button' type='submit' disabled={!this.state.isValid}>Show Weather</button>
                {!this.state.isValid && this.state.wasChanged && <p className='validation-message'>The Input value is not a correct Ukrainian location</p>}
            </form>)
    }


}

export default SearchForm;
