import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editProfileFailure,
  editUserProfile,
  clearAuthState,
} from '../actions/auth';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
      tname: props.auth.user.name,
    };
  }
  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };
  changeMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
    const name = this.state.tname;
    this.setState({
      name,
      password: '',
      confirmPassword: '',
    });
    this.props.dispatch(clearAuthState());
  };
  handleSave = () => {
    const { name, password, confirmPassword } = this.state;
    if (password !== confirmPassword) this.props.dispatch(editProfileFailure());
    else {
      const { user } = this.props.auth;
      this.props.dispatch(
        editUserProfile(name, password, confirmPassword, user._id)
      );
    }
    this.setState({ tname: name });
  };
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  render() {
    const { user, error } = this.props.auth;
    const editMode = this.state.editMode;
    console.log('error', this.props.auth);
    return (
      <div className="settings login-form">
        <div className="img-container">
          <img
            src="https://www.flaticon.com/premium-icon/icons/svg/666/666201.svg"
            alt="dp"
          />
          <div className="update-dp">Update Picture</div>
        </div>
        {editMode && error && (
          <div align="center" className="alert alert-danger  p-1" role="alert">
            Update Failed!!
          </div>
        )}
        {editMode && error === false && (
          <div align="center" className="alert alert-success  p-1" role="alert">
            Update Successfull!!
          </div>
        )}
        <div className="login-field">
          <div className="form-floating">
            <input
              className="form-control"
              id="floatingInput"
              type="email"
              value={user.email}
              disabled
            />
            <label for="floatingInput">Email</label>
          </div>
        </div>
        <div>
          {editMode ? (
            <div className="login-field">
              <div className="form-floating">
                <input
                  className="form-control"
                  id="floatingInput"
                  type="text"
                  onChange={(e) => this.handleChange('name', e.target.value)}
                  value={this.state.name}
                />
                <label for="floatingInput">Name</label>
              </div>
            </div>
          ) : (
            <div className="login-field">
              <div className="form-floating">
                <input
                  className="form-control"
                  id="floatingInput"
                  type="text"
                  value={this.state.name}
                  disabled
                />
                <label for="floatingInput">Name</label>
              </div>
            </div>
          )}
          {editMode && (
            <div>
              <div className="login-field">
                <div className="form-floating">
                  <input
                    className="form-control"
                    id="floatingInput"
                    type="password"
                    onChange={(e) =>
                      this.handleChange('password', e.target.value)
                    }
                    value={this.state.password}
                  />
                  <label for="floatingInput">New Password</label>
                </div>
              </div>
              <div className="login-field">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingInput"
                    onChange={(e) =>
                      this.handleChange('confirmPassword', e.target.value)
                    }
                    value={this.state.confirmPassword}
                  />
                  <label for="floatingInput">Confirm Password</label>
                </div>
              </div>
            </div>
          )}
          <div className="btn-grp">
            {editMode && (
              <button
                className="btn btn-outline-secondary m-auto"
                onClick={() => this.changeMode()}
              >
                Back
              </button>
            )}
            {editMode ? (
              <button
                className="btn btn-success m-auto"
                onClick={this.handleSave}
              >
                Save&nbsp;<i className="fa fa-pencil"></i>
              </button>
            ) : (
              <button
                className="btn btn-success ms-auto"
                onClick={() => this.changeMode()}
              >
                Edit&nbsp;<i class="fa fa-pencil"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Settings);
