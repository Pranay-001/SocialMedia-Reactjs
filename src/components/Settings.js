import React, { Component } from 'react';
import { connect } from 'react-redux';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
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
  };
  render() {
    const { user } = this.props.auth;
    const editMode = this.state.editMode;
    return (
      <div className="settings login-form">
        <div className="img-container">
          <img
            src="https://www.flaticon.com/premium-icon/icons/svg/666/666201.svg"
            alt="dp"
          />
          <div className="update-dp">Update Picture</div>
        </div>
        <div className="login-field">
          <div class="form-floating">
            <input
              class="form-control"
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
              <div class="form-floating">
                <input
                  class="form-control"
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
              <div class="form-floating">
                <input
                  class="form-control"
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
                <div class="form-floating">
                  <input
                    class="form-control"
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
                <div class="form-floating">
                  <input
                    class="form-control"
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
          <div class="btn-grp">
            {editMode && (
              <button
                className="btn btn-outline-success m-auto"
                onClick={() => this.changeMode()}
              >
                Back
              </button>
            )}
            {editMode ? (
              <button className="btn btn-success m-auto">Save</button>
            ) : (
              <button
                className="btn btn-success ms-auto"
                onClick={() => this.changeMode()}
              >
                Edit
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
