import React, { Component } from 'react';
import PropTypes from 'prop-types';
class PostsList extends Component {
  render() {
    const { posts } = this.props;
    // console.log(posts);
    return posts.map((post) => {
      console.log(post);
      return (
        <div className="container post-wrapper p-0" key={post._id}>
          <div class="row p-0">
            <link
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
              rel="stylesheet"
            />
            <div class="p-0">
              <div id="content" class="p-0 content content-full-width">
                <div class="col-md-12 profile-content p-0 pt-5">
                  <div class="col-md-12 tab-content p-0">
                    <div
                      class="col-md-12 tab-pane fade active show"
                      id="profile-post"
                    >
                      <ul class="p-0 timeline">
                        <li>
                          <div class="timeline-time">
                            <span class="date">
                              {post.updatedAt.substring(0, 4)}
                            </span>
                            <span class="time">
                              {post.updatedAt.substring(5, 10)}
                            </span>
                          </div>
                          <div class="timeline-icon">
                            <a href="javascript:;">&nbsp;</a>
                          </div>
                          <div class="timeline-body">
                            <div class="timeline-header">
                              <span class="userimage">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                  alt=""
                                />
                              </span>
                              <span class="username">
                                <a href="javascript:;">{post.user.name}</a>{' '}
                                <small></small>
                              </span>
                              <span class="pull-right text-muted">
                                18 Views
                              </span>
                            </div>
                            <div class="timeline-content">
                              <p>{post.content}</p>
                            </div>
                            <div class="timeline-likes">
                              <div class="stats-right">
                                <span class="stats-text">259 Shares</span>
                                <span class="stats-text">
                                  {post.comments.length} Comments
                                </span>
                              </div>
                              <div class="stats">
                                <span class="fa-stack fa-fw stats-icon">
                                  <i class="fa fa-circle fa-stack-2x text-danger"></i>
                                  <i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                </span>
                                <span class="fa-stack fa-fw stats-icon">
                                  <i class="fa fa-circle fa-stack-2x text-primary"></i>
                                  <i class="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                </span>
                                <span class="stats-total">
                                  {post.likes.length}
                                </span>
                              </div>
                            </div>
                            <div class="timeline-footer">
                              <a
                                href="javascript:;"
                                class="m-r-15 text-inverse-lighter"
                              >
                                <i class="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i>{' '}
                                Like
                              </a>
                              <a
                                href="javascript:;"
                                class="m-r-15 text-inverse-lighter"
                              >
                                <i class="fa fa-comments fa-fw fa-lg m-r-3"></i>{' '}
                                Comment
                              </a>
                              <a
                                href="javascript:;"
                                class="m-r-15 text-inverse-lighter"
                              >
                                <i class="fa fa-share fa-fw fa-lg m-r-3"></i>{' '}
                                Share
                              </a>
                            </div>
                            <div class="timeline-comment-box">
                              <div class="user">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
                              </div>
                              <div class="input">
                                <form action="">
                                  <div class="input-group">
                                    <input
                                      type="text"
                                      class="form-control rounded-corner"
                                      placeholder="Write a comment..."
                                    />
                                    <span class="input-group-btn ">
                                      <button
                                        class="btn btn-primary rounded-corner"
                                        type="button"
                                      >
                                        Comment
                                      </button>
                                    </span>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </li>
                        {/* <li>
                            <div class="timeline-icon">
                              <a href="javascript:;">&nbsp;</a>
                            </div>
                            <div class="timeline-body">Loading...</div>
                          </li> */}
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

export default PostsList;
