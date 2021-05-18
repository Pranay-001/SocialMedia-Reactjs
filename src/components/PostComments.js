import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeToggler } from '../actions/posts';
class PostComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.comment.likes.length,
      liked: false,
    };
  }
  toggleLike = async () => {
    // console.log(this.props.auth.user._id);
    // console.log(this.props.comment._id);
    await this.props.dispatch(
      likeToggler(this.props.comment._id, 'Comment', this.props.searchKey)
    );
    if (
      !this.state.liked &&
      (this.state.likes === 0 ||
        this.state.likes > this.props.comment.likes.length)
    )
      this.setState({ liked: true });
    else if (this.state.liked) this.setState({ liked: false });
    this.setState({ likes: this.props.comment.likes.length });
  };
  render() {
    const { name } = this.props.comment.user;
    const { likes, updatedAt } = this.props.comment;
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
              value={this.props.comment.content}
              disabled
            />
            <span className="input-group-btn ">
              <div className="search-br me-2 mt-0">
                <div className="like">
                  {this.state.liked ? (
                    <Link
                      style={{ color: 'red' }}
                      to="#"
                      onClick={this.toggleLike}
                    >
                      <i className="m-1 mt-2 fa fa-heart"></i>
                    </Link>
                  ) : (
                    <Link
                      style={{ color: 'black' }}
                      to="#"
                      onClick={this.toggleLike}
                    >
                      <i className="m-1 mt-2 fa fa-heart"></i>
                    </Link>
                  )}
                  <span className="date mt-2">{likes.length}</span>
                </div>
              </div>
            </span>
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
export default connect(mapStateToProps)(PostComments);
