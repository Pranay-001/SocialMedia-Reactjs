import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PostsList, FriendList, CreatePost } from './';
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
    const { postList: posts, addComment, searchKey } = this.props.posts;
    // console.log('userss', this.props.auth);
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home d-flex justify-content-right">
        <div className="posts ">
          <CreatePost />
          {posts.length == 0 ? (
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="m-5 bg-light p-4">No Posts Found..!!😪</h1>
                </div>
              </div>
            </div>
          ) : (
            posts.map((post) => {
              return (
                <PostsList
                  post={post}
                  addComment={addComment}
                  searchKey={searchKey}
                />
              );
            })
          )}
        </div>
        <FriendList />
      </div>
    );
  }
}
// Home.protoTypes = {
//   posts: PropTypes.array.isRequired,
// };
function mapStateToProps(state) {
  return {
    auth: state.auth,
    posts: state.posts,
  };
}
export default connect(mapStateToProps)(Home);
