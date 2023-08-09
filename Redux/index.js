import {combineReducers, applyMiddleware} from 'redux';
import {legacy_createStore as createStore} from 'redux';
import appReducer from './Reducers/appReducer';
import loaderReducer from './Reducers/loaderReducer';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers({
    appReducer,
    loaderReducer,
  }),
  applyMiddleware(thunk),
);
