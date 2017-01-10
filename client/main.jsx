import 'styles/main.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import Root from './Root';

// we are rendering a component called Root, which is passed a prop called browserHistory.
ReactDOM.render(<Root history={browserHistory} />, document.getElementById('react-main'));
