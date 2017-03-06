import ReactDom from 'react-dom';
import React from 'react';
import './styles.css';

function Congratulator(props) {
    return ( <h1 className='congratulations'>Hello World</h1> );
}

ReactDom.render(
    <Congratulator />,
    document.getElementById('container')
)