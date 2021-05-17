import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <span className="date me-2">{date}</span>
          <div className="user mt-0 me-1">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
          </div>

          <div className="input">
            <div className="input-group">
              <input
                type="text"
                className="search-br form-control rounded-corner pt-2"
                placeholder="Write a comment..."
                value={comment.content}
                disabled
              />
              <span className="input-group-btn ">
                <div className="search-br me-2 mt-0">
                  <div className="like">
                    <Link to="#">
                      <i className="m-1 mt-2 fa fa-heart"></i>
                    </Link>
                    <span className="date mt-2">{likes.length}</span>
                  </div>
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
