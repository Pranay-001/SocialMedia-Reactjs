import React, { Component } from 'react';
import { PostsList } from './';
import { Redirect } from 'react-router-dom';
class Home extends Component {
  render() {
    const { posts } = this.props;
    // const { error, inProgress, isLoggedIn } = this.props.auth;
    // if (!isLoggedIn) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div className="home d-flex">
        <div>
          <PostsList posts={posts} />
        </div>
        <div>
          <div className="frnds-aside">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Toggle right offcanvas
            </button>
          </div>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel">Offcanvas right</h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
