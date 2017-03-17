import React from 'react';
import InputWithAutocomplete from './inputWithAutocomplete';
import * as locationsMap from '../../locations/ukraine.json';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            isSubmitable: false,
            wasChanged: false,
            locationsNames: Object.keys(locationsMap)
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value) {
        this.setState({
            inputText: value,
            isSubmitable: this.isSubmitable(value),
            wasChanged: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('Submitted');
    }

    isSubmitable(part) {
        return locationsMap.hasOwnProperty(part);
    }

    render() {
        return (
            <form className='search-form'>
                <InputWithAutocomplete onChange={this.handleChange} value={this.state.inputText} options={this.state.locationsNames} />
                <button onClick={this.handleSubmit} className='search-button' type='submit' disabled={!this.state.isSubmitable}>Show Weather</button>
                {!this.state.isSubmitable && this.state.wasChanged && <p className='validation-message'>The Input value is not a correct Ukrainian location</p>}
            </form>)
    }


}

export default SearchForm;
