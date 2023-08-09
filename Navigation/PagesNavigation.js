import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from '../Components';
import HomePageView from '../Views/HomePageView';
import PostCommentView from '../Views/PostCommentView';

const Stack = createNativeStackNavigator();

function PagesNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screens.postList}>
      <Stack.Screen
        name={screens.postList}
        options={{headerShown: true, title: 'Home Page'}}
        component={HomePageView}
        
      />
      <Stack.Screen
        name={screens.post}
        options={{headerShown: true, title: 'Feed Details'}}
        component={PostCommentView}
        
      />
    </Stack.Navigator>
  );
}

export default PagesNavigation;
