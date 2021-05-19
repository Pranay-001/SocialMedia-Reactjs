import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFriend } from '../actions/friends';
class Users extends Component {
  handleDel = (id) => {
    this.props.dispatch(removeFriend(id));
  };
  render() {
    if (this.props.friends.userFriends.length === 0) {
      return (
        <div class="m-0 alert alert-danger p-1">
          <i>0 Friends...!!!</i>
        </div>
      );
    }
    // console.log('sasasasasas', this.props.friends);
    const frnds = this.props.friends.userFriends.map((val) => {
      // console.log(val);
      return (
        <div className="timeline-comment-box">
          <div className="user">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
          </div>
          <div className="input">
            <div className="input-group">
              <div className="form-control">
                {val.to_user.name}
                <span
                  style={{ float: 'right' }}
                  className="mt-2 input-group-btn"
                >
                  <button
                    className="p-1 btn btn-outline-danger rounded-corner"
                    type="button"
                    onClick={() => {
                      this.handleDel(val.to_user._id);
                    }}
                    disabled={this.props.friends.inProgress}
                  >
                    remove&nbsp;<i class="fa fa-trash"></i>
                  </button>
                </span>
                <div>{val.to_user.email}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return frnds;
  }
}
function mapStateToProps(state) {
  return {
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(Users);
