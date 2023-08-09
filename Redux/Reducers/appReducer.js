import {
  LOGIN_ACTION,
  RESET_ACTION,
  UPDATE_AUTH_TOKEN,
  UPDATE_POST_LIST,
  UPDATE_POST_DETAILS,
  UPDATE_POST_PAGE,
  UPDATE_POST_COMMENTS,
  DELETE_POST_COMMENT,
  ADD_POST_COMMENT,
} from '../Constants/types';

const INITIAL_STATE = {
  user: null,
  userToken: '',
  arrPosts: [],
  page: 0,
  isReachedLast: false,
  selectedPost: null,
  comments: [],
};

const pageLimit = 10;
const offset = 0;

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_AUTH_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case UPDATE_POST_LIST:
      return {
        ...state,
        arrPosts: [...state.arrPosts, ...action.payload],
        isReachedLast: action.payload.length < pageLimit,
      };
    case UPDATE_POST_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case DELETE_POST_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(item => item.id !== action.payload),
      };
    case UPDATE_POST_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case UPDATE_POST_DETAILS:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case RESET_ACTION:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default appReducer;
