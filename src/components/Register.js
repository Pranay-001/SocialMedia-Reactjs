import React, { Component } from 'react';
import { clearAuthState, signup } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="login-field">
          <div className="form-floating">
            <input
              type="text"
              onChange={this.handelNameChange}
              placeholder="abc"
              value={this.state.name}
              className="form-control login-input"
              id="floatingInput"
              required
            />
            <label for="floatingInput">Name</label>
          </div>
        </div>
        <div className="login-field">
          <div className="form-floating">
            <input
              type="email"
              onChange={this.handelEmailChange}
              placeholder="abc@gmail.com"
              value={this.state.email}
              className="form-control login-input"
              id="floatingInput"
              required
            />
            <label for="floatingInput">Email</label>
          </div>
        </div>
        <div className="login-field">
          <div className="form-floating">
            <input
              type="password"
              onChange={this.handelPasswordChange}
              placeholder="*****"
              value={this.state.password}
              className="form-control login-input"
              id="floatingPassword"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
        </div>
        <div className="login-field">
          <div className="form-floating">
            <input
              type="password"
              onChange={this.handelConfirmPasswordChange}
              value={this.state.cpassword}
              placeholder="*****"
              className="form-control login-input"
              id="floatingPassword"
              required
            />
            <label for="floatingPassword">Confirm Password</label>
          </div>
        </div>
        <div className="m-3 form-check ms-0">
          Already Have an account?
          <Link to="/login">login</Link>
        </div>
        <div className="login-field">
          <div className="form-floating">
            {inProgress ? (
              <button
                className="btn btn-primary disable-cursor"
                disabled={inProgress}
              >
                Signin in&nbsp;&nbsp;<i className="fa fa-spinner"></i>
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={this.handelFormSubmit}
              >
                Signup&nbsp;&nbsp;<i className="fa fa-user-plus"></i>
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
