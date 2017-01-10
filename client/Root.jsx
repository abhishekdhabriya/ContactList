import React, {Component} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Index from './components/Index';
import ContactDetail from './components/ContactDetail';

import App from './components/App';


class Root extends Component {


  // we will define the routes here

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}></IndexRoute>
        </Route>
        <Route path="/contact/:id" component={ContactDetail}></Route>
      </Router>
    );
  }
}

export default Root;
