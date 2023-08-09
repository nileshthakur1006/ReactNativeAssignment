import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './Redux';
import AppNavigation from './Navigation';
import AxiosAPICalling from './Services/AxiosAPICalling';
import 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    AxiosAPICalling();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
