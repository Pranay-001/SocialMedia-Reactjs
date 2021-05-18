import React, { Component } from 'react';
import { createPost } from '../actions/posts';
import { connect } from 'react-redux';
import { func } from 'prop-types';
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };
  handlePost = (e) => {
    this.props.dispatch(createPost(this.state.content));
    this.setState({ content: '' });
  };
  render() {
    return (
      <div className="container post-wrapper p-0">
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
                            {/* {post.updatedAt.substring(0, 4)} */}
                          </span>
                          <span className="time">
                            {/* {post.updatedAt.substring(5, 10)} */}
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
                              <a href="javascript:;">
                                {this.props.auth.user.name}
                              </a>
                            </span>
                          </div>
                          <div className="timeline-content">
                            <div class="m-0 p-0 form-group">
                              <textarea
                                style={{
                                  border: 'none',
                                  background: '#f2f3f4',
                                }}
                                class="form-control rounded-corner"
                                rows="5"
                                placeholder="Enter Post Content"
                                onChange={this.handleChange}
                                value={this.state.content}
                                disabled={this.props.posts.createPost}
                              ></textarea>
                            </div>
                          </div>
                          <div
                            style={{
                              // background: '#f2f3f4',
                              textAlign: 'right',
                            }}
                            className="p-3 timeline-footer rounded-corner"
                          >
                            <button
                              className="btn btn-primary rounded-corner"
                              type="button"
                              onClick={this.handlePost}
                              disabled={this.props.posts.createPost}
                            >
                              Post
                            </button>
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
    posts: state.posts,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(CreatePost);
