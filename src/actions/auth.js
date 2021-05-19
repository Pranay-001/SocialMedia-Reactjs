import { APIURLs } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
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
} from './actionType';
import { fetchFriends } from './friends';
import {
  getAuthTokenFromLocalStorage,
  setAuthTokenFromLocalStorage,
} from '../helpers/utils';
import { fetchPosts } from './posts';

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}
export function signupFailed(errorMsg) {
  return {
    type: SIGNUP_FAILED,
    error: errorMsg,
  };
}
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signup(name, email, password, confirm_password) {
  return (dispatch) => {
    dispatch(startSignup());
    const url = APIURLs.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ name, email, password, confirm_password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data);
        if (data.success) {
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMsg) {
  return {
    type: LOGIN_FAILED,
    error: errorMsg,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIURLs.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data);
        if (data.success) {
          // console.log('user', data.data.user);
          setAuthTokenFromLocalStorage(data.data.token);
          dispatch(loginSuccess(data.data.user));
          // dispatch(fetchFriends(data.data.user._id));
          // dispatch(fetchPosts());
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser(user = {}) {
  return {
    type: LOG_OUT,
    user,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editProfileSuccess(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user,
  };
}

export function editProfileFailure(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUserProfile(name, password, confirmPassword, user_id) {
  return (dispatch) => {
    const url = APIURLs.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: user_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data);
        if (data.success) {
          dispatch(editProfileSuccess(data.data.user));
          if (data.data.token) {
            setAuthTokenFromLocalStorage(data.data.token);
          }
        } else {
          dispatch(editProfileFailure());
        }
      });
  };
}
