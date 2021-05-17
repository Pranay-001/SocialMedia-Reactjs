import {
  SEARCH_USER_START,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILIOUR,
  CLEAR_SEARCH_START,
  REMOVE_SEARCH_RESULT,
} from '../actions/actionType';
const initalSearchState = {
  users: [],
  inProgress: false,
  error: null,
};
export default function searchUser(state = initalSearchState, action) {
  switch (action.type) {
    case SEARCH_USER_START:
      return {
        ...state,
        inProgress: true,
      };
    case SEARCH_USER_SUCCESS:
      return {
        users: action.users,
        inProgress: false,
        error: null,
      };
    case SEARCH_USER_FAILIOUR:
      return {
        users: [],
        inProgress: false,
        error: true,
      };
    case REMOVE_SEARCH_RESULT:
      const frnds = state.users.filter((frnd) => frnd._id !== action.id);
      return {
        ...state,
        users: frnds,
      };
    case CLEAR_SEARCH_START:
      state = initalSearchState;
    default:
      return state;
  }
}
