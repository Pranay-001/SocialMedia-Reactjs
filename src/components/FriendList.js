import React, { Component } from 'react';
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
            FriendList
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Friends</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">...</div>
        </div>
      </div>
    );
  }
}

export default FriendList;
