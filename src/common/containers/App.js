import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { initEnvironment } from '../actions/actions';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Navbar from '../components/Navbar';

class App extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(initEnvironment());
  }

  render() {
    const {screenHeight, screenWidth} = this.props.environment;
    return (
      <div style={{height: '100%'}} >
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    environment: state.environment
  }
}

export default connect(mapStateToProps)(App)
