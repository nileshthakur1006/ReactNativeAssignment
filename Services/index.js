import Axios from 'axios';
import EndPoints, {
  getPostList,
  getPostDetails,
  getAndPostComments,
  deleteComment,
} from './APIServicePoints';
import {getAuthToken} from './AxiosAPICalling';

const callGetApi = async endPoint => {
  let token = getAuthToken();
  return Axios({
    url: endPoint,
    method: 'GET',
    headers: {Authorization: `Bearer ${token}`},
  }).then(parseResponse);
};

const callDeleteApi = async endPoint => {
  let token = getAuthToken();
  return Axios({
    url: endPoint,
    method: 'DELETE',
    headers: {Authorization: `Bearer ${token}`},
  }).then(parseResponse);
};

const callPostApi = async (endPoint, params, signal = undefined) => {
  let token = getAuthToken();
  return Axios({
    url: endPoint,
    data: params,
    signal: signal,
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`},
  }).then(parseResponse);
};

const parseResponse = res => {
  if (!res || (!res.status && (!res.response || !res.response.status))) {
    return {response: 1, data: []};
  }
  return res.data;
};

const Api = {
  Auth: {
    login: param => callPostApi('users/login', param), 
  },
  App: {
    getPostList: (limit = 10, offset = 0) =>
      callGetApi(getPostList(limit, offset)),

    getPostDetails: slug => callGetApi(getPostDetails(slug)),

    getComments: slug => callGetApi(getAndPostComments(slug)),

    postComment: (slug, param) =>
      callPostApi(getAndPostComments(slug), param),
      
    deleteComment: (slug, id) => callDeleteApi(deleteComment(slug, id)),
  },
};
export default Api;
