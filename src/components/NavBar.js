import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { searchUserPosts } from '../actions/posts';
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
    };
  }
  logOut = (e) => {
    e.preventDefault();
    this.setState({ searchKey: '' });
    this.props.dispatch(searchUserPosts(''));
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  searchUser = (e) => {
    this.setState({
      searchKey: e.target.value,
    });
    // console.log(this.state.searchKey);
    this.props.dispatch(searchUserPosts(e.target.value));
  };
  render() {
    const { auth } = this.props;
    const { error, inProgress, isLoggedIn, user } = this.props.auth;
    // console.log(user);
    return (
      <div className="navigation">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              BUZZ_ME
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">
                    <i class="fa fa-home"></i>Home
                  </a>
                </li>
              </ul>

              {isLoggedIn ? (
                <div class="d-flex justify-content-left w-50">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.searchUser}
                    value={this.state.searchKey}
                  />
                </div>
              ) : (
                <div class="d-flex justify-content-left w-50">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value=""
                    disabled
                  />
                </div>
              )}

              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                {!isLoggedIn ? (
                  <li class="nav-item">
                    <a class="nav-link" href="/login">
                      <i class="fa fa-sign-out"></i>Login
                    </a>
                  </li>
                ) : (
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li>
                      <img
                        src="https://img.icons8.com/fluent/344/user-male-circle.png"
                        alt="user"
                        height="50"
                        width="50"
                      />
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/settings">
                        {user.name}
                      </a>
                    </li>
                  </ul>
                )}
                {!isLoggedIn ? (
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/register">
                      <i class="fa fa-user-plus"></i>Singup
                    </a>
                  </li>
                ) : (
                  <li class="nav-item">
                    <a class="nav-link" onClick={this.logOut} href="/logout">
                      <i class="fa fa-sign-out"></i>Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(NavBar);
