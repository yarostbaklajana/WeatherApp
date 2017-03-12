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
         this.showValidationMessage = this.showValidationMessage.bind(this);

    }

    handleChange(value) {
        console.log(value);
        this.setState({
            inputText: value,
            isSubmitable: this.validateValue(value)
        });
    }

     validateValue(part) {
        var validValues = (part === '') ? [] : this.props.locations.filter((location) => location.name.toUpperCase().startsWith(part.toUpperCase())).slice(0, 10).find((hint) => hint.name === part);
        return validValues !== undefined;
    }

    showValidationMessage() {
        return (this.state.isSubmitable || this.state.inputText === '') ? '' : <p className='validation-message'>Input value is no Valid</p>
    }

    render() {
        return (
            <form className='search-form'>
                <InputWithAutocomplete onChange={this.handleChange} locations={this.props.locations} />
                
                <button className='search-button' type='submit' disabled={!this.state.isSubmitable}>Show Weather</button>
                {this.showValidationMessage()}
            </form> )
    }
}

export default SearchForm;
