import {SHOW_LOADER, HIDE_LOADER} from '../Constants/types';

const INITIAL_STATE = {
  isLoading: false,
  screen: '',
};

const loaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      console.log('loader show calling...');
      return {
        ...state,
        isLoading: true,
        screen: action.payload,
      };
    case HIDE_LOADER:
      console.log('loader hide calling...');
      return {
        ...state,
        isLoading: false,
        screen: action.payload,
      };
    default:
      return state;
  }
};

export default loaderReducer;
