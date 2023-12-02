// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Login from '../screens/Login';

const AuthStack = createStackNavigator({
  Login: Login,
});

const AppStack = createStackNavigator({
  Home: Home,
  // Ajoutez d'autres écrans ici
});

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
