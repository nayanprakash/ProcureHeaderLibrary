import React from 'react';
import ReactDOM from 'react-dom';
//import jquery from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import App from './config/App';
import './utilities/prototypes.js';
import './App.scss';
import '../node_modules/react-toggle-switch/dist/css/switch.min.css';

/*************** Render App ********/
ReactDOM.render(<App />, document.getElementById('core'));
