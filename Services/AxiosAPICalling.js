import Axios from 'axios';
let userAuthToken = '';
export const baseURL = 'https://api.realworld.io/api/';

const AxiosConfigure = () => {
  Axios.defaults.baseURL = baseURL;
  Axios.defaults.timeout = 300000;
  Axios.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  Axios.interceptors.response.use(
    response => {
      if (response?.status === 401) {
      }
      return response;
    },
    error => {
      console.log('axios_error-->', error);
      if (error?.response?.status === 401) {
        return error.response;
      }
      return Promise.reject(error);
    },
  );
};

export const setAuthToken = (token = null) => {
  if (token) {
    userAuthToken = token;
  } else {
    userAuthToken = '';
  }
};

export const getAuthToken = () => {
  return userAuthToken;
};

export default AxiosConfigure;
