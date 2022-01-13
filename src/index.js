import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const rootElement = document.querySelector('#root')

const element = (
  <div>
    <div>Hello!</div>
    <h2>World</h2>
  </div>
)

ReactDOM.render(
  element, rootElement
);

