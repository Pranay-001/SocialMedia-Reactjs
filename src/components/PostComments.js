import React, { Component } from 'react';
class PostComments extends Component {
  render() {
    const { comments } = this.props;
    const postcomments = comments.map((comment) => {
      const { name } = comment.user;
      const { likes, updatedAt } = comment;
      const date = updatedAt.substring(0, 10);
      return (
        <div className="mt-2 p-0">
          <span>{name}</span>
          <span className="date ">{date}</span>
          <div className="user mt-0 me-1">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
          </div>

          <div className="input">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-corner"
                placeholder="Write a comment..."
                value={comment.content}
                disabled
              />
              <span className="input-group-btn ">
                <div className="ms-0 mt-0">
                  <a href="#">
                    <i className="m-1 mt-2 fa fa-heart"></i>
                  </a>
                  <span className="date mt-2">{likes.length}</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      );
    });
    return <div className="postsCommentsbox">{postcomments}</div>;
  }
}
export default PostComments;
