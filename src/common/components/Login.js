import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

class Login extends Component {

  static propTypes = {
    welcomePage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.welcomePage || '',
      password: ''
    };
  }
  componentDidMount() {
    if (this.state.username.length) {
      this.refs.passwordInput.getInputDOMNode().focus();
    } else {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    if (this.state.username.length < 1) {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
    if (this.state.username.length > 0 && this.state.password.length < 1) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      var userObj = {
        username: this.state.username,
        password: this.state.password
      };
      dispatch(authActions.signIn(userObj))
      this.setState({ username: '', password: ''});
    }
  }
  render() {
    return (
      <div className="loginPage">
        <div className="loginBox">
          <h1 className="loginTitle">Login to Bidding Platform</h1>
          <main>
            <form onSubmit={::this.handleSubmit}>
              <div>
                <Input ref="usernameInput"
                       type="text"
                       name="username"
                       value={this.state.username}
                       placeholder="Enter username"
                       onChange={::this.handleChange}
                       className="loginTextBox" />
              </div>
              <div>
                <Input ref="passwordInput"
                       type="password"
                       name="password"
                       placeholder="Enter password"
                       value={this.state.password}
                       onChange={::this.handleChange}
                       className="loginTextBox" />
              </div>
              <section>
                <Button type="submit" name="submitButton">Login</Button>
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
      welcomePage: state.welcomePage,
  }
}
export default connect(mapStateToProps)(Login);
