import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {welcomePage} from '../actions/actions';
import { connect } from 'react-redux';
import { Input, Button } from 'react-bootstrap';
import Login from './Login';

class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: ''
    };
  }
  componentDidMount() {
    this.refs.usernameInput.getInputDOMNode().focus();
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
  }
  handleSubmit() {
    const { dispatch } = this.props;
    const username = this.state.username;
    dispatch(welcomePage(username));
    this.setState({ username: '' });
  }
  render() {
    const {screenWidth} = this.props;

    return (
      <div className="loginPage">
        <div className="loginBox">
          <h1 className="loginTitle">Login to Bidding Platform</h1>
          <main>
            <form>
              <div>
                <Input ref="usernameInput"
                       type="text"
                       name="username"
                       value={this.state.username}
                       placeholder="Enter username"
                       onChange={::this.handleChange}
                       className="loginTextBox" />
              </div>
              <section>
                <Link to="/signup">
                  <Button type="submit"
                          className="successBtn"
                          onClick={::this.handleSubmit}>
                    Signup
                  </Button>
                </Link>
                <span className="orDiv"> or </span>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                </section>
            </form>
          </main>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    screenWidth: state.environment.screenWidth
  }
}

export default connect(mapStateToProps)(HomePage);
