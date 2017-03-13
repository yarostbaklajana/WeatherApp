import React from 'react';

class InputWithAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisibleHints: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.fillInputWithCheckedHint = this.fillInputWithCheckedHint.bind(this);
        this.closeHints = this.closeHints.bind(this);
        this.findHints = this.findHints.bind(this);
    }

    handleChange(event) {
        let inputValue = event.target.value;

        this.setState({
            isVisibleHints: this.findHints(inputValue).length !== 0
        });

        this.props.onChange(inputValue);
    }

    findHints(part) {
        let hints = (part === '') ? [] : this.props.locations.filter((location) => location.name.toUpperCase().startsWith(part.toUpperCase())).slice(0, 10);
        return hints;
    }

    fillInputWithCheckedHint(hint) {
        let checkedValue = hint.name;

        this.setState({
            isVisibleHints: false
        });

        this.props.onChange(checkedValue);
    }

    closeHints() {
        this.setState({
            isVisibleHints: false
        });
    }

    render() {
        let hintsList = this.state.isVisibleHints ? this.findHints(this.props.value).map((hint) => <li className='locations-hints_hint' onClick={() => this.fillInputWithCheckedHint(hint)} name={hint.name} key={hint.id}>{hint.name}</li>) : null;
        const backdrop = this.state.isVisibleHints ? <div className='backdrop' onClick={this.closeHints}></div> : null;
        
        return (
            <div>
                {backdrop}
                <div className='input-container'>
                    <input className='input-with-autocomplete' type="text" value={this.props.value} onChange={this.handleChange} />
                    <ul className='locations-hints'>{hintsList}</ul>
                </div>
            </div>
        );
    }
}

export default InputWithAutocomplete;
