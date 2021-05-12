import React, { Component } from 'react';
import PropTypes from 'prop-types';
class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return posts.map((post) => {
      return (
        <div className="post-wrapper" key={post._id}>
          <div className="post">
            <div className="post-header">
              <div className="post-avatar">
                <img
                  src="https://img.icons8.com/fluent/344/user-male-circle.png"
                  alt="user"
                />
              </div>
              <div className="post-author">
                <div>{post.user.name}</div>
                <div className="post-time">a minute ago</div>
              </div>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-actions">
              <div className="post-like">
                <img
                  src="https://img.icons8.com/ios/344/good-quality--v1.png"
                  alt="like"
                />
                <span className="post-numberOfLikes">{post.likes.length}</span>
              </div>
              <div className="post-comment">
                <img
                  src="https://img.icons8.com/carbon-copy/344/edit-chat-history.png"
                  alt="comment"
                />
                <span className="post-numberOfComments">
                  {post.comments.length}
                </span>
              </div>
            </div>
            <div className="post-comment-box">
              <div className="write-comment">
                <textarea type="text" placeholder="Start typing a comment" />
              </div>
              <div className="post-comments-list">
                <div className="post-comment-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Bill</span>
                    &nbsp;&nbsp;
                    <span className="post-comment-time">a minute ago</span>
                    &nbsp;&nbsp;
                    <span className="post-comment-likes">2</span>
                  </div>
                  <div className="post-comment-content">Random comment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}
PostsList.protoTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
