import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from '../Components';
import LoginPageView from '../Views/LoginPageView';
import {NavigationRef} from './NavigationRef';
import PagesNavigation from './PagesNavigation';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer ref={NavigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={screens.auth}>
        <Stack.Screen name={screens.auth} component={LoginPageView} />
        <Stack.Screen name={screens.app} component={PagesNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
