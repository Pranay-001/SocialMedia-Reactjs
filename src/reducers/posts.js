import { UPDATE_POSTS, POST_LOADING, CLEAR_POSTS } from '../actions/actionType';
const initialPostsState = {
  postList: [],
  isLoading: false,
};
export default function posts(state = initialPostsState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_POSTS:
      return {
        postList: action.posts,
        isLoading: false,
      };
    case CLEAR_POSTS:
      state = initialPostsState;
    default:
      return state;
  }
}
