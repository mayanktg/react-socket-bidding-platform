import '../common/css/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import DevTools from '../common/containers/DevTools';
import routes from '../common/routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('react');

ReactDOM.render(
  <Provider store={store}>
    <div style={{height: '100%'}}>
      <Router children={routes} history={browserHistory} />
    </div>
  </Provider>,
  rootElement
);
