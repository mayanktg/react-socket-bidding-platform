import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Input, Button } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

class Signup extends Component {

  static propTypes = {
    welcomePage: PropTypes.string.isRequired,
    userValidation: PropTypes.array.isrequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.welcomePage || '',
      password: '',
      confirmPassword: ''
    };
  }
  componentWillMount() {
    const { dispatch, userValidation } = this.props;
    if(userValidation.length === 0) {
      dispatch(actions.usernameValidationList());
    }
  }
  componentDidMount() {
    if (this.state.username.length) {
      this.refs.passwordInput.getInputDOMNode().focus();
    } else {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    if (!this.state.username.length) {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
    if (this.state.username.length && !this.state.password.length) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }
    if (this.state.username.length && this.state.password.length && !this.state.confirmPassword.length) {
      this.refs.confirmPasswordInput.getInputDOMNode().focus();
    }
    if (this.state.username.length && this.state.password.length && this.state.confirmPassword.length) {
      const userObj = {
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      dispatch(authActions.signUp(userObj))
      const initLobby = {
        name: "Lobby",
        id: 0,
        private: false
      };
      dispatch(actions.createChannel(initLobby));
      this.setState({ username: '', password: '', confirmPassword: ''});
    }
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
    if (event.target.name === 'confirm-password') {
      this.setState({ confirmPassword: event.target.value });
    }
  }
  validateUsername() {
    const { userValidation } = this.props;
    if (userValidation.filter(user => {
      return user === this.state.username.trim();
    }).length > 0) {
      return 'error';
    }
    return 'success';
  }
  validateConfirmPassword() {
    if (this.state.confirmPassword.length > 0 && this.state.password.length > 0) {
      if (this.state.password === this.state.confirmPassword) {
        return 'success';
      }
      return 'error';
    }
  }
  render() {
    return (
      <div className="loginPage">
        <div className="loginBox">
          <h1 className="loginTitle">Signup to Bidding Platform</h1>
          <main>
            <form onSubmit={::this.handleSubmit}>
              <div>
                <Input ref="usernameInput"
                       type="text"
                       help={this.validateUsername() === 'error' && 'A user with that name already exists!'}
                       bsStyle={this.validateUsername()}
                       hasFeedback
                       name="username"
                       autoFocus="true"
                       placeholder="Enter username"
                       value={this.state.username}
                       onChange={::this.handleChange}
                       className="loginTextBox" />
              </div>
              <div>
                <Input ref="passwordInput"
                       type="password"
                       name="password"
                       value={this.state.password}
                       placeholder="Enter password"
                       onChange={::this.handleChange} 
                       className="loginTextBox" />
              </div>
              <div>
                <Input label="Confirm Password"
                       ref="confirmPasswordInput"
                       help={this.validateConfirmPassword() === 'error' && 'Your password doesn\'t match'}
                       type="password"
                       name="confirm-password"
                       placeholder="Enter password again" value={this.state.confirmPassword}
                       onChange={::this.handleChange}
                       className="loginTextBox" />
              </div>
              <section>
                <Button type="submit" name="submitButton">Signup</Button>
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
    userValidation: state.userValidation.data
  }
}

export default connect(mapStateToProps)(Signup);
