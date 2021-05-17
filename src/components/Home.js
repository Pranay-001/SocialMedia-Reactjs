import React, { Component } from 'react';
import { PostsList, FriendList } from './';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { fetchFriends } from '../actions/friends';
class Home extends Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchFriends());
  }
  render() {
    const { isLoggedIn } = this.props.auth;
    // console.log('userss', this.props.auth);
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home d-flex justify-content-right">
        <div className="posts ">
          <PostsList />
        </div>
        <FriendList />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Home);
