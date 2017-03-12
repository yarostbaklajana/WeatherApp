import React from 'react';
import SearchForm from './searchForm';
import * as locationsArr from '../../locations/ukraine.json';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='app-container'>
                <SearchForm locations={locationsArr} />
            </div>
        )
    }

}

export default App;

