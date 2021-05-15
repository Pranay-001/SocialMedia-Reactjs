import React, { Component } from 'react';
import { clearAuthState, login } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
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
  handelFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
      // this.props.dispatch({email,password})
    }
  };

  render() {
    // console.log("this",this.props);
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <div className="login-header">Login</div>
        {error && <div className="alert error">{error}</div>}
        <div className="login-field">
          <div className="form-floating">
            <input
              type="email"
              className="form-control login-input"
              id="floatingInput"
              onChange={this.handelEmailChange}
              placeholder="name@example.com"
              value={this.state.email}
              required
            />
            <label for="floatingInput">Email address</label>
          </div>
        </div>
        <div className="login-field">
          <div className="form-floating">
            <input
              type="password"
              className="form-control login-input"
              id="floatingPassword"
              placeholder="Password"
              onChange={this.handelPasswordChange}
              value={this.state.password}
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
        </div>
        <div className="m-3 form-check ms-0">
          Forgot Password?
          <a href="/register">Reset</a>
        </div>
        <div className="login-field">
          <div className="form-floating">
            {inProgress ? (
              <button className="btn btn-primary" disabled={true}>
                Loggin in&nbsp;&nbsp;<i className="fa fa-spinner"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handelFormSubmit}
              >
                Login&nbsp;&nbsp;<i className="fa fa-sign-in"></i>
              </button>
            )}
          </div>
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
