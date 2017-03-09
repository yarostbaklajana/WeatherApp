import ReactDom from 'react-dom';
import React from 'react';
import InputWithAutocomplete from './components/inputWithAutocomplete';
import './styles.css';

ReactDom.render(
    <InputWithAutocomplete  />,
    document.getElementById('container')
)