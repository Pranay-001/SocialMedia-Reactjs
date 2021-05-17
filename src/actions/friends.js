import { APIURLs } from '../helpers/urls';
import {
  ADD_FRIEDNS_SUCCESS,
  ADD_FRIEDNS_FAILIOUR,
  CLEAR_FRIENDS_STATE,
  REMOVE_FRIEND,
  START_FRIEND_ACTION,
  REMOVE_SEARCH_RESULT,
} from './actionType';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
export function fetchFriends(id) {
  return (dispatch) => {
    const url = APIURLs.userFriends(id);
    fetch(url, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addFriendSuccess(data.data.friends));
        } else {
          dispatch(addFriendError());
        }
        // console.log('friendssss', data);
      });
  };
}
export function getUser(id) {
  return (dispatch) => {
    dispatch(friendActionStart());
    const url = APIURLs.addFriend(id);
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('ddsds', data);
        if (data.success) {
          dispatch(removeSearchResult(id));
          dispatch(addFriendSuccess([data.data.friendship]));
        } else {
          dispatch(addFriendError());
        }
      });
  };
}
export function removeSearchResult(id) {
  return {
    type: REMOVE_SEARCH_RESULT,
    id,
  };
}
export function addFriendSuccess(userFriends) {
  return {
    type: ADD_FRIEDNS_SUCCESS,
    userFriends,
  };
}
export function addFriendError(error) {
  return {
    type: ADD_FRIEDNS_FAILIOUR,
    error,
  };
}
export function removeFriend(id) {
  return (dispatch) => {
    dispatch(friendActionStart());
    const url = APIURLs.removeFriendship(id);
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(deleteFriend(id));
        }
      });
  };
}
export function deleteFriend(id) {
  return {
    type: REMOVE_FRIEND,
    id,
  };
}
export function friendActionStart() {
  return {
    type: START_FRIEND_ACTION,
  };
}
export function clearFriend() {
  return {
    type: CLEAR_FRIENDS_STATE,
  };
}
