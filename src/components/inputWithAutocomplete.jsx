import React from 'react';

class InputWithAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hints: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.fillInputWithCheckedHint = this.fillInputWithCheckedHint.bind(this);
        this.closeHints = this.closeHints.bind(this);
    }

    handleChange(event) {
        let inputValue = event.target.value;
        this.setState({
            hints: this.findHints(inputValue)
        });
        this.props.onChange(inputValue);
    }

    findHints(part) {
        let hints = [];
        if (part !== '') {
            hints = this.props.options.filter((option) => option.toUpperCase().startsWith(part.toUpperCase())).slice(0, 10);
        }
        return hints;
    }


    fillInputWithCheckedHint(hint) {
        let checkedValue = hint;

        this.setState({
            hints: []
        });

        this.props.onChange(checkedValue);
    }

    closeHints() {
        this.setState({
            hints: []
        });
    }

    render() {
        let hintsList = this.state.hints.map((hint) => <li className='hints_hint' onClick={() => this.fillInputWithCheckedHint(hint)} key={hint}>{hint}</li>);

        return (
            <div>
                {this.state.hints.length > 0 && <div className='backdrop' onClick={this.closeHints}></div>}
                <div className='input-container'>
                    <input className='input-with-autocomplete' type="text" value={this.props.value} onChange={this.handleChange} />
                    <ul className='hints'>{hintsList}</ul>
                </div>
            </div>
        );
    }
}

export default InputWithAutocomplete;
