import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchPosts } from '../actions/posts';
import { fetchFriends } from '../actions/friends';
import { Home, NavBar, Login, Page404, Register, Settings, Spinner } from './';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
const PrivateRouteWithSpinner = (privateRouteProps) => {
  const { path, component: Component, isLoggedIn, loading } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          loading ? (
            <Spinner />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Login {...props} />
        );
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }
  render() {
    const { auth } = this.props;
    const loading = this.props.posts.isLoading;
    console.log(this.props.friends);
    // console.log(this.props.posts);
    // console.log('isLoading', this.props.posts.isLoading);
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <PrivateRouteWithSpinner
              exact
              path="/"
              component={Home}
              isLoggedIn={auth.isLoggedIn}
              loading={loading}
            />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedIn={auth.isLoggedIn}
            />
            <Route path="/" component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}
App.propTypes = {
  posts: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(App);
