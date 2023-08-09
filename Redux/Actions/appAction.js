import {Alert} from 'react-native';
import Api from '../../Services';
import {setAuthToken} from '../../Services/AxiosAPICalling';
import {setToken, setUser} from '../../Components/storage.js';
import {
  LOGIN_ACTION,
  UPDATE_AUTH_TOKEN,
  UPDATE_POST_LIST,
  UPDATE_POST_DETAILS,
  UPDATE_POST_PAGE,
  SHOW_LOADER,
  HIDE_LOADER,
  RESET_ACTION,
  UPDATE_POST_COMMENTS,
  DELETE_POST_COMMENT,
  ADD_POST_COMMENT,
} from '../Constants/types';
import Toast from 'react-native-simple-toast';
import screens from '../../Components';

export const showLoader = (screen = '') => {
  return {
    type: SHOW_LOADER,
    payload: screen,
  };
};


export const resetData = () => {
  return {
    type: RESET_ACTION,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
    payload: '',
  };
};


export const updatePostList = list => {
  return {
    type: UPDATE_POST_LIST,
    payload: list,
  };
};


export const updatePostPage = page => {
  return {
    type: UPDATE_POST_PAGE,
    payload: page,
  };
};


export const updatePostDetails = post => {
  return {
    type: UPDATE_POST_DETAILS,
    payload: post,
  };
};

export const updateToken = token => {
  return {
    type: UPDATE_AUTH_TOKEN,
    payload: token,
  };
};

export const updatePostComments = list => {
  return {
    type: UPDATE_POST_COMMENTS,
    payload: list,
  };
};

export const addPostComments = comment => {
  return {
    type: ADD_POST_COMMENT,
    payload: comment,
  };
};

export const deletePostComment = id => {
  return {
    type: DELETE_POST_COMMENT,
    payload: id,
  };
};

export const updateUser = user => {
  return {
    type: LOGIN_ACTION,
    payload: user,
  };
};

export const getFeedPostAction =
  (slug, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.post));
    Api.App.getPostDetails(slug)
      .then(response => {
        dispatch(hideLoader());
        if (response.article) {
          dispatch(updatePostDetails(response.article));
          callback();
        } else {
          Alert.alert('Alert!', response.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        Alert.alert('Alert!', e.message);
      });
  };


  export const getFeedPostCommentsAction = slug => async dispatch => {
    dispatch(showLoader(screens.post));
    Api.App.getComments(slug)
      .then(response => {
        dispatch(hideLoader());
        if (Array.isArray(response.comments) && response.comments.length > 0) {
          dispatch(updatePostComments(response.comments));
        } else {
          Alert.alert('Alert!', response.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        Alert.alert('Alert!', e.message);
      });
  };
  
export const loginAction =
  (params, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.auth));
    Api.Auth.login(params)
      .then(response => {
        dispatch(hideLoader());
        if (response.user) {
          setAuthToken(response.user.token);
          setUser(response.user);
          setToken(response.user.token);
          dispatch(updateToken(response.user.token));
          dispatch(updateUser(response.user));
          Toast.show(
            response.message ?? 'successfully logged in.',
            Toast.LONG,
            ['UIAlertController'],
          );
          callback();
        } else {
          Alert.alert('Alert!', response.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        Alert.alert('Alert!', e.message);
      });
  };

export const getFeedPostListAction =
  (limit = 10, offset = 0, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.postList));
    Api.App.getPostList(limit, offset)
      .then(response => {
        dispatch(hideLoader());
        if (
          Array.isArray(response.articles) &&
          response.articles.length > 0
        ) {
          dispatch(updatePostList(response.articles));
        } else {
          Alert.alert('Alert!', response.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        Alert.alert('Alert!', e.message);
      });
  };





export const deleteFeedPostCommentAction =
  (slug, id, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.post));
    Api.App.deleteComment(slug, id)
      .then(response => {
        dispatch(hideLoader());
        if (response) {
          dispatch(deletePostComment(id));
        } else {
          Alert.alert('Alert!', response.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        Alert.alert('Alert!', e.message);
      });
  };

export const postComment =
  (slug, params, callback = () => {}) =>
  async dispatch => {
    dispatch(showLoader(screens.post));
    Api.App.postComment(slug, params)
      .then(response => {
        dispatch(hideLoader());
        if (response.comment) {
          dispatch(addPostComments(response.comment));
          Toast.show(
            response.message ?? 'comment successfully added.',
            Toast.LONG,
            ['UIAlertController'],
          );
          callback();
        } else {
          Alert.alert('Alert!', response.message);
        }
      })
      .catch(e => {
        dispatch(hideLoader());
        Alert.alert('Alert!', e.message);
      });
  };
