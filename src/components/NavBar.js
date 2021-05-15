import React, { Component } from 'react';
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
    const { isLoggedIn, user } = this.props.auth;
    // console.log(user);
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              BUZZ_ME
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {isLoggedIn && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      <i className="fa fa-home"></i>Home
                    </a>
                  </li>
                </ul>
              )}
              {isLoggedIn && (
                <div className="d-flex justify-content-left w-50">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.searchUser}
                    value={this.state.searchKey}
                  />
                </div>
              )}

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!isLoggedIn ? (
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      <i className="fa fa-sign-out"></i>Login
                    </a>
                  </li>
                ) : (
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li>
                      <img
                        src="https://img.icons8.com/fluent/344/user-male-circle.png"
                        alt="user"
                        height="50"
                        width="50"
                      />
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/settings">
                        {user.name}
                      </a>
                    </li>
                  </ul>
                )}
                {!isLoggedIn ? (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/register"
                    >
                      <i className="fa fa-user-plus"></i>Singup
                    </a>
                  </li>
                ) : (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={this.logOut}
                      href="/logout"
                    >
                      <i className="fa fa-sign-out"></i>Logout
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
