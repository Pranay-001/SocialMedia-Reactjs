import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostComments } from './';
class PostsList extends Component {
  render() {
    const { posts } = this.props;
    // console.log(posts);
    if (posts.length == 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="m-5 bg-light p-4">No Posts Found..!!😪</h1>
            </div>
          </div>
        </div>
      );
    }
    return posts.map((post) => {
      console.log(post);
      return (
        <div className="container post-wrapper p-0" key={post._id}>
          <div className="row p-0">
            <div className="p-0">
              <div id="content" className="p-0 content content-full-width">
                <div className="col-md-12 profile-content p-0 pt-5">
                  <div className="col-md-12 tab-content p-0">
                    <div
                      className="col-md-12 tab-pane fade active show"
                      id="profile-post"
                    >
                      <ul className="p-0 timeline">
                        <li>
                          <div className="timeline-time">
                            <span className="date">
                              {post.updatedAt.substring(0, 4)}
                            </span>
                            <span className="time">
                              {post.updatedAt.substring(5, 10)}
                            </span>
                          </div>
                          <div className="timeline-icon-outer">
                            <div className="timeline-icon">
                              <a href="javascript:;">&nbsp;</a>
                            </div>
                          </div>
                          <div className="timeline-body">
                            <div className="timeline-header">
                              <span className="userimage">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                  alt=""
                                />
                              </span>
                              <span className="username">
                                <a href="javascript:;">{post.user.name}</a>{' '}
                                <small></small>
                              </span>
                              <span className="pull-right text-muted">
                                18 Views
                              </span>
                            </div>
                            <div className="timeline-content">
                              <p>{post.content}</p>
                            </div>
                            <div className="timeline-likes">
                              <div className="stats-right">
                                <span className="stats-text">259 Shares</span>
                                <span className="stats-text">
                                  {post.comments.length} Comments
                                </span>
                              </div>
                              <div className="stats">
                                <span className="fa-stack fa-fw stats-icon">
                                  <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                  <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                </span>
                                <span className="fa-stack fa-fw stats-icon">
                                  <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                  <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                </span>
                                <span className="stats-total">
                                  {post.likes.length}
                                </span>
                              </div>
                            </div>
                            <div className="timeline-footer">
                              <a
                                href="javascript:;"
                                className="m-r-15 text-inverse-lighter"
                              >
                                <i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i>{' '}
                                Like
                              </a>
                              <a
                                href="javascript:;"
                                className="m-r-15 text-inverse-lighter"
                              >
                                <i className="fa fa-comments fa-fw fa-lg m-r-3"></i>{' '}
                                Comment
                              </a>
                              <a
                                href="javascript:;"
                                className="m-r-15 text-inverse-lighter"
                              >
                                <i className="fa fa-share fa-fw fa-lg m-r-3"></i>{' '}
                                Share
                              </a>
                            </div>
                            <div className="timeline-comment-box">
                              <div className="user">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
                              </div>
                              <div className="input">
                                <form action="">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control rounded-corner"
                                      placeholder="Write a comment..."
                                    />
                                    <span className="input-group-btn ">
                                      <button
                                        className="btn btn-primary rounded-corner"
                                        type="button"
                                      >
                                        Comment
                                      </button>
                                    </span>
                                  </div>
                                </form>
                              </div>
                              <PostComments comments={post.comments} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
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
function mapStateToProps(state) {
  return {
    posts: state.posts.postList,
  };
}
export default connect(mapStateToProps)(PostsList);
