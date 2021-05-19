import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/userProfile';
import { UserSearchResults } from './';
import { clearSearch } from '../actions/userProfile';

class userSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  handleSearch = (e) => {
    this.props.dispatch(fetchUsers(this.state.search, this.props.friends));
  };
  componentWillUnmount() {
    // console.log('unload');
    this.props.dispatch(clearSearch());
  }
  render() {
    return (
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            // aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Add Friend
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <div class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleChange}
                value={this.state.search}
              />
              <button
                class="btn btn-outline-success"
                type="submit"
                onClick={this.handleSearch}
                disabled={this.props.search.inProgress}
              >
                Search
                {this.props.search.inProgress && <i class="fa fa-spinner"></i>}
              </button>
            </div>
            <div className="m-2">
              {!this.props.search.users.length && (
                <div class="alert alert-info p-1" role="alert">
                  <i>0 results..!!</i>
                </div>
              )}
              <UserSearchResults />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    search: state.search,
    friends: state.friends.userFriends,
  };
}
export default connect(mapStateToProps)(userSearch);
