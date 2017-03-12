import React from 'react';

class InputWithAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            hints: [],
            isVisibleHints: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.fillInputWithCheckedHint = this.fillInputWithCheckedHint.bind(this);
        this.closeHints = this.closeHints.bind(this);
    }

    handleChange(event) {
        let inputValue = event.target.value;
        this.setState({
            value: inputValue,
            hints: this.findHints(inputValue),
            isVisibleHints: this.state.hints !== 0
        });

        this.props.onChange(event.target.value);
    }

    findHints(part) {
        let hints = (part === '') ? [] : this.props.locations.filter((location) => location.name.toUpperCase().startsWith(part.toUpperCase())).slice(0, 10);
        return hints;
    }

    fillInputWithCheckedHint(hint, event) {
        let checkedValue = hint.name;

        this.setState({
            value: checkedValue,
            hints: [],
            isVisibleHints: false
        });

        this.props.onChange(checkedValue);


        var callEvent = new Event('onChange', { bubbles: true });
        event.target.dispatchEvent(callEvent);
    }

    closeHints() {
        this.setState({
            hints: [],
            isVisibleHints: false
        });
    }

    render() {
        let hintsList = this.state.hints.map((hint) => <li className='locations-hints_hint' onClick={(evt) => this.fillInputWithCheckedHint(hint, evt)} name={hint.name} key={hint.id}>{hint.name}</li>);
        const backdrop = this.state.isVisibleHints ? <div className='backdrop' onClick={this.closeHints}></div> : null;
        return (
            <div>
                {backdrop}
                <div className='input-container'>
                    <input className='input-with-autocomplete' type="text" value={this.state.value} onChange={this.handleChange} />
                    <ul className='locations-hints'>{hintsList}</ul>
                </div>
            </div>
        );
    }
}

export default InputWithAutocomplete;
