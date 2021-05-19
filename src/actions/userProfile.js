import { APIURLs } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  SEARCH_USER_START,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILIOUR,
  CLEAR_SEARCH_START,
} from './actionType';
export function fetchUsers(key, friends) {
  // console.log('friends', friends);
  return (dispatch) => {
    dispatch(searchStart());
    const url = APIURLs.usersSearch(key);
    // console.log('url', url);
    fetch(url, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('users', data);

        if (data.success) {
          const fromfrndId = friends.map((user) => user.from_user);
          const tofrndId = friends.map((user) => user.to_user._id);
          const searchRes = data.data.users.filter((srcUser) => {
            return (
              fromfrndId.indexOf(srcUser._id) === -1 &&
              tofrndId.indexOf(srcUser._id) === -1
            );
          });
          //   console.log('ll', d);
          dispatch(searchSuccess(searchRes));
        } else {
          dispatch(searchFailure());
        }
      });
  };
}

export function searchSuccess(users) {
  return {
    type: SEARCH_USER_SUCCESS,
    users,
  };
}

export function searchFailure(error) {
  return {
    type: SEARCH_USER_FAILIOUR,
    error,
  };
}

export function searchStart() {
  return {
    type: SEARCH_USER_START,
  };
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH_START,
  };
}
