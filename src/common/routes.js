import { Redirect, Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import BidContainerHome from './containers/BidContainerHome';
import BidCreateContainer from './containers/BidCreateContainer';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import App from './containers/App';
import { checkAuth } from './actions/authActions';

const requireAuth = (nextState, replace) => {
  if(!checkAuth()) {
    return replace(null, '/login')
  }
}
const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/home" component={HomePage} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/bid/home" component={BidContainerHome} />
    <Route path="/bid/create" component={BidCreateContainer} />
    <Route path="/bid/view/:bid_id" component={BidCreateContainer} />
  </Route>
);

export default Routes;
