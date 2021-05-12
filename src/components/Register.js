import React, { Component } from 'react';
import { clearAuthState, signup } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      cpassword: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handelNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handelEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handelPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handelConfirmPasswordChange = (e) => {
    this.setState({
      cpassword: e.target.value,
    });
  };
  handelFormSubmit = (e) => {
    e.preventDefault();
    // console.log("password= ",this.state.password);
    const { name, email, password, cpassword } = this.state;
    if (name && email && password && cpassword) {
      this.props.dispatch(signup(name, email, password, cpassword));
    }
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <div className="login-header">Sign Up</div>
        {error && <div className="alert error">{error}</div>}
        <div className="login-field">
          <input
            type="text"
            onChange={this.handelNameChange}
            placeholder="Name"
            value={this.state.name}
            required
          />
        </div>
        <div className="login-field">
          <input
            type="email"
            onChange={this.handelEmailChange}
            placeholder="Email"
            value={this.state.email}
            required
          />
        </div>
        <div className="login-field">
          <input
            type="password"
            onChange={this.handelPasswordChange}
            placeholder="Password"
            value={this.state.password}
            required
          />
        </div>
        <div className="login-field">
          <input
            type="password"
            onChange={this.handelConfirmPasswordChange}
            placeholder="Confirm Password"
            value={this.state.cpassword}
            required
          />
        </div>
        <div className="login-field">
          {inProgress ? (
            <button disabled={true}>Signin in...</button>
          ) : (
            <button className="loginIn" onClick={this.handelFormSubmit}>
              Sign up
            </button>
          )}
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    // dispatch:state
  };
}
export default connect(mapStateToProps)(Login);
