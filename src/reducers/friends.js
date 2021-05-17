import {
  ADD_FRIEDNS_SUCCESS,
  ADD_FRIEDNS_FAILIOUR,
  CLEAR_FRIENDS_STATE,
  REMOVE_FRIEND,
  START_FRIEND_ACTION,
} from '../actions/actionType';
const initalFriendsState = {
  userFriends: [],
  error: null,
  inProgress: true,
};
export default function userFriends(state = initalFriendsState, action) {
  switch (action.type) {
    case START_FRIEND_ACTION:
      return {
        ...state,
        inProgress: true,
      };
    case ADD_FRIEDNS_SUCCESS:
      return {
        ...state,
        error: null,
        inProgress: false,
        userFriends: [...action.userFriends, ...state.userFriends],
      };
    case ADD_FRIEDNS_FAILIOUR:
      return {
        ...state,
        error: true,
        inProgress: false,
      };
    case REMOVE_FRIEND:
      const frnds = state.userFriends.filter(
        (frnd) => frnd.from_user !== action.id && frnd.to_user._id !== action.id
      );
      return {
        ...state,
        userFriends: frnds,
        inProgress: false,
      };
    case CLEAR_FRIENDS_STATE:
      state = initalFriendsState;
    default:
      return state;
  }
}
