import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_START,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
} from '../actions/actionType';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};
export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        isLoggedIn: true,
        error: null,
      };
    case SIGNUP_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case EDIT_USER_SUCCESS:
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        error: false,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
