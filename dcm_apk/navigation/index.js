// AppNavigator.js

import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import VenteScreen from '../screens/VenteScreen';
import ProfilScreen from '../screens/ProfilScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setLoggedIn(!!token);
      } catch (error) {
        console.error('Error checking if user is logged in:', error.message);
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="ACCUEIL"
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
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
