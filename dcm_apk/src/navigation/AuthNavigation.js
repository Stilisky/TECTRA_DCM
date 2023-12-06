import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
      <Stack.Navigator
      screenOptions={{
         headerShown: false
      }}
      >
         <Stack.Screen name="Auth" component={LoginScreen} />
      </Stack.Navigator>
   )
}

export default AuthNavigation
