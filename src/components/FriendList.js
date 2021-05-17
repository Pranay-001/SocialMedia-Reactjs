import React, { Component } from 'react';
import { UserFriends } from './';
import { UserSearch } from './';
import { connect } from 'react-redux';
class FriendList extends Component {
  render() {
    return (
      <div className="me-2">
        <div className="frnds-aside">
          <button
            className="frnd-list-btn btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i class="fa fa-users"></i>&nbsp;Users
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">
              <i class="fa fa-users"></i>&nbsp;Users
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div>
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <UserSearch />
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Friends
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div className="m-2">
                        <UserFriends />
                      </div>
                    </div>
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
    posts: state.posts.postList,
    friends: state.friends.userFriends,
  };
}
export default connect(mapStateToProps)(FriendList);
