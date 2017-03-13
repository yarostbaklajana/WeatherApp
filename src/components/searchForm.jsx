import React from 'react';
import InputWithAutocomplete from './inputWithAutocomplete';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            isSubmitable: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            inputText: value,
            isSubmitable: this.isValid(value)
        });
    }

    isValid(part) {
        var validValues = (part === '') ? [] : this.props.locations.filter((location) => location.name.toUpperCase().startsWith(part.toUpperCase())).slice(0, 10).find((hint) => hint.name === part);
        return validValues !== undefined;
    }

    render() {
        let validationMessage = (this.state.isSubmitable || this.state.inputText === '') ? null : <p className='validation-message'>Input value is no Valid</p>

        return (
            <form className='search-form'>
                <InputWithAutocomplete onChange={this.handleChange} value={this.state.inputText} locations={this.props.locations} />

                <button className='search-button' type='submit' disabled={!this.state.isSubmitable}>Show Weather</button>
                {validationMessage}
            </form>)
    }
}

export default SearchForm;
