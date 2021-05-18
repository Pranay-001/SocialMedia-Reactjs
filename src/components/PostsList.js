import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PostComments } from './';
import { createComment, likeToggler } from '../actions/posts';
class PostsList extends Component {
  constructor(props) {
    super(props);
    // console.log('sasa');
    this.state = {
      comment: '',
      likes: this.props.post.likes.length,
      liked: false,
    };
  }
  toggleLike = async () => {
    await this.props.dispatch(
      likeToggler(this.props.post._id, 'Post', this.props.searchKey)
    );
    // console.log(this.state);
    // console.log(this.props.post.likes.length);
    if (
      !this.state.liked &&
      (this.state.likes === 0 ||
        this.state.likes > this.props.post.likes.length)
    )
      this.setState({ liked: true });
    else if (this.state.liked) this.setState({ liked: false });
    this.setState({ likes: this.props.post.likes.length });
    // console.log('assa', this.state);
  };
  handleChange = (e) => {
    this.setState({ comment: e.target.value });
  };
  handleComment = () => {
    this.props.dispatch(createComment(this.state.comment, this.props.post._id));
    this.setState({ comment: '' });
  };
  render() {
    const { post, addComment } = this.props;

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
                              <span className="stats-text">
                                {post.likes.length} Likes
                              </span>
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
                            {this.state.liked ? (
                              <Link
                                style={{ color: 'blue' }}
                                to="#"
                                onClick={this.toggleLike}
                                className="m-r-15 text-inverse-lighter"
                              >
                                {/* {this.state.liked ? */}
                                <i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i>
                              </Link>
                            ) : (
                              <Link
                                to="#"
                                onClick={this.toggleLike}
                                className="m-r-15 text-inverse-lighter"
                              >
                                {/* {this.state.liked ? */}
                                <i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i>
                              </Link>
                            )}
                            &nbsp;Like
                            <Link
                              to="#"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-comments fa-fw fa-lg m-r-3"></i>
                            </Link>
                            &nbsp;Comment
                            <Link
                              to="#"
                              className="m-r-15 text-inverse-lighter"
                            >
                              <i className="fa fa-share fa-fw fa-lg m-r-3"></i>
                            </Link>
                            &nbsp;Share
                          </div>
                          <div className="timeline-comment-box">
                            <div className="user">
                              <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
                            </div>
                            <div className="input">
                              <form action="">
                                <div className="input-group">
                                  <input
                                    style={{ zIndex: '0' }}
                                    type="text"
                                    className="form-control rounded-corner"
                                    placeholder="Write a comment..."
                                    onChange={this.handleChange}
                                    // onKeyPress={this.handleComment}
                                    value={this.state.comment}
                                    disabled={addComment}
                                  />
                                  <span className="input-group-btn ">
                                    <button
                                      className="btn btn-primary rounded-corner"
                                      type="button"
                                      onClick={this.handleComment}
                                      disabled={addComment}
                                    >
                                      Comment
                                    </button>
                                  </span>
                                </div>
                              </form>
                            </div>
                            <div className="postsCommentsbox">
                              {post.comments.reverse().map((comment) => {
                                return (
                                  <PostComments
                                    comment={comment}
                                    searchKey={this.props.searchKey}
                                  />
                                );
                              })}
                            </div>
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
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(PostsList);
