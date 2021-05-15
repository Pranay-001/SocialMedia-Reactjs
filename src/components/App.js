import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { fetchPosts } from '../actions/posts';
import { Home, NavBar, Login, Page404, Register, Settings, Spinner } from './';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// const Settings=()=> <div>Settings</div>

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
const PrivateRouteHome = (privateRouteProps) => {
  const { path, component: Component, auth, loading } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return auth.isLoggedIn ? (
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
  constructor(props) {
    super(props);
    this.loading = true;
  }
  async componentDidMount() {
    await this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
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
    this.loading = false;
  }
  render() {
    const { auth } = this.props;
    const loading = this.loading;
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <PrivateRouteHome
              exact
              path="/"
              component={Home}
              auth={auth}
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
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
