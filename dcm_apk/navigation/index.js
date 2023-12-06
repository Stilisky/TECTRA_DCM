// AppNavigator.js
import React, { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import VenteScreen from '../screens/VenteScreen';
import ProfilScreen from '../screens/ProfilScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} screenOptions={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const checkIfUserIsLoggedIn = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setLoggedIn(!!token);
    } catch (error) {
      setLoggedIn(false);
      console.error('Erreur lors de la vérification de la connexion :', error.message);
    }
  }, []);

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [checkIfUserIsLoggedIn]);

  if (isLoggedIn) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Vente"
          component={VenteScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfilScreen}
          initialParams={{ setLoggedIn: setLoggedIn }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    );
  } else {
    return <AuthStack />;
  }
};

export default AppNavigator;
