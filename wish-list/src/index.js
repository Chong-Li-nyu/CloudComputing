import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

var wishListApp = React.createElement(App, {className : "wishListApp"})
ReactDOM.render(wishListApp, document.getElementById('root'));
registerServiceWorker();
