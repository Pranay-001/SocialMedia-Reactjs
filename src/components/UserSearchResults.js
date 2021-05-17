import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends, getUser } from '../actions/friends';
class UserSearchResults extends Component {
  handleAdd = (id) => {
    this.props.dispatch(getUser(id));
    // this.props.dispatch(fetchFriends());
  };

  render() {
    // console.log('kik', this.props.searchRes.users);
    const searchRes = this.props.searchRes.users.map((val) => {
      return (
        <div className="timeline-comment-box">
          <div className="user">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" />
          </div>
          <div className="input">
            <div className="input-group">
              <div className="form-control">
                {val.name}
                <span
                  style={{ float: 'right' }}
                  className="mt-2 input-group-btn"
                >
                  <button
                    className="p-1 btn btn-outline-success rounded-corner"
                    type="button"
                    onClick={() => {
                      this.handleAdd(val._id);
                    }}
                    disabled={this.props.friends.inProgress}
                  >
                    Add&nbsp;<i class="fa fa-user-plus"></i>
                  </button>
                </span>
                <div>{val.email}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return searchRes;
  }
}
function mapStateToProps(state) {
  return {
    searchRes: state.search,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(UserSearchResults);
