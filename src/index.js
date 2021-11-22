import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const rootElement = document.querySelector('#root')

const element = (
  <div>
    <div>Hello!</div>
  </div>
)

ReactDOM.render(
  element, rootElement
);

