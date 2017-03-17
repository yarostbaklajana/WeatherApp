import React from 'react';
import SearchForm from './searchForm';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='app-container'>
                <SearchForm />
            </div>
        )
    }

}

export default App;

