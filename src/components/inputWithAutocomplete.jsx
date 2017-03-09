import React from 'react';
import * as locationsArr from '../../locations/ukraine.json';

class InputWithAutocomplete extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            coincidenses: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        let inputValue = event.target.value;
        this.setState({
            value: inputValue,
            coincidenses: this.findCoincidence(inputValue)
        });
        console.log(this.state.coincidenses);
    }

    findCoincidence(part) {
        let coincidenses = locationsArr.filter((location) => location.name.startsWith(part));
        return coincidenses;
    }

    render() {
        let coincidensesList = this.state.coincidenses.map((coincidense) => <li key={coincidense.id}>{coincidense.name}</li>);
        return (
            <div className='input-container'>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <ul>{coincidensesList}</ul>
            </div>
        );
    }

}

export default InputWithAutocomplete;