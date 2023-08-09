import {Dimensions} from 'react-native';

export const constants = {
  userInfo: 'userInfo',
  userToken: 'userToken',
};

export const screens = {
  auth: 'Auth',
  app: 'App',
  post: 'Post',
  postList: 'PostList',
};
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export {windowWidth, windowHeight};

export default screens;
