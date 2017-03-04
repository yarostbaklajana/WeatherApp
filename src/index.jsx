import ReactDom from 'react-dom';
import React from 'react';

function Congratulator() {
    return ( <h1>Hello World</h1> );
}

ReactDom.render(
    <Congratulator />,
    document.getElementById('container')
)