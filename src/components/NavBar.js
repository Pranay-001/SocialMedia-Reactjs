import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
class NavBar extends Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
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
                    Home
                  </a>
                </li>
              </ul>

              {isLoggedIn ? (
                <form class="d-flex justify-content-left w-50">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-dark" type="submit">
                    Search
                  </button>
                </form>
              ) : (
                <form class="d-flex justify-content-left w-50">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    disabled
                  />
                  <button class="btn btn-outline-dark" type="submit" disabled>
                    Search
                  </button>
                </form>
              )}

              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                {!isLoggedIn ? (
                  <li class="nav-item">
                    <a class="nav-link" href="/register">
                      Signup
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
                    <a class="nav-link" aria-current="page" href="/login">
                      Login
                    </a>
                  </li>
                ) : (
                  <li class="nav-item">
                    <a class="nav-link" onClick={this.logOut} href="/logout">
                      Logout
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
