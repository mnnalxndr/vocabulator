import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './theme.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// apply persisted theme (avoids flash-of-unstyled-theme where possible)
const storedTheme = window.localStorage && window.localStorage.getItem && window.localStorage.getItem('theme');
const initialTheme = storedTheme || 'dark';
document.documentElement.setAttribute('data-theme', initialTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
