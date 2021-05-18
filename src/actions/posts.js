import { APIURLs } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  UPDATE_POSTS,
  POST_LOADING,
  CLEAR_POSTS,
  CREATE_POST,
  ADD_POST_COMMENT,
  ADD_COMMENT_START,
  CREATE_POST_START,
} from './actionType';
export function fetchPosts() {
  return (dispatch) => {
    dispatch(postLoading());
    const url = APIURLs.fetchPosts();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dispatch(updatePost(data.data.posts));
      });
  };
}
export function postLoading() {
  return {
    type: POST_LOADING,
  };
}
export function clearPost() {
  return {
    type: CLEAR_POSTS,
  };
}
export function searchUserPosts(key) {
  key = key.trim().toLowerCase();
  return (dispatch) => {
    const url = APIURLs.fetchPosts();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const posts = Object.values(data.data.posts).map((post) => post);
        const filteredPosts = posts.filter((post) => {
          const name = post.user.name.toLowerCase();
          return name.includes(key);
        });
        // console.log(filteredPosts);
        dispatch(updatePost(filteredPosts, key));
      });
  };
}
export function updatePost(posts, key = '') {
  return {
    type: UPDATE_POSTS,
    posts,
    searchKey: key,
  };
}
export function createPost(content) {
  return (dispatch) => {
    dispatch(createPostStart());
    const url = APIURLs.createPosts();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('post data', data);
        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}
export function createPostStart() {
  return {
    type: CREATE_POST_START,
  };
}
export function addPost(post) {
  return {
    type: CREATE_POST,
    post,
  };
}
export function createComment(content, pid) {
  return (dispatch) => {
    dispatch(startAddComment());
    const url = APIURLs.addPostComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: pid }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('postComment', data);
        if (data.success) {
          dispatch(addComment(data.data.comment, pid));
        }
      });
  };
}
export function startAddComment() {
  return {
    type: ADD_COMMENT_START,
  };
}
export function addComment(comment, pid) {
  return {
    type: ADD_POST_COMMENT,
    comment,
    pid,
  };
}
export function likeToggler(likeableId, likeType, key) {
  return (dispatch) => {
    // console.log('key', key);
    const url = APIURLs.likeToggler(likeableId, likeType);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('like', data);
        if (data.success) dispatch(searchUserPosts(key));
      })
      .catch((e) => console.log(e));
  };
}
