import {
  UPDATE_POSTS,
  POST_LOADING,
  CLEAR_POSTS,
  CREATE_POST,
  ADD_POST_COMMENT,
  ADD_COMMENT_START,
  CREATE_POST_START,
} from '../actions/actionType';
const initialPostsState = {
  postList: [],
  isLoading: false,
  createPost: false,
  addComment: false,
  searchKey: '',
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
        addComment: false,
        searchKey: action.searchKey,
      };
    case CREATE_POST_START:
      return {
        ...state,
        createPost: true,
      };
    case CREATE_POST:
      return {
        postList: [action.post, ...state.postList],
        isLoading: false,
        createPost: false,
        addComment: false,
        searchKey: state.searchKey,
      };
    case ADD_COMMENT_START:
      return {
        ...state,
        addComment: true,
      };
    case ADD_POST_COMMENT:
      const newPosts = state.postList.map((post) => {
        if (post._id === action.pid) {
          return {
            ...post,
            comments: [...post.comments, action.comment],
          };
        }
        return post;
      });
      return {
        postList: newPosts,
        isLoading: false,
        createPost: false,
        addComment: false,
        searchKey: state.searchKey,
      };

    case CLEAR_POSTS:
      state = initialPostsState;
      state.searchKey = '';
    default:
      return state;
  }
}
