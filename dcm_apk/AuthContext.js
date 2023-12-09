// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './utils/constantes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUser({ token });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la connexion :', error.message);
    }
  };

  const login = async (userData) => {
    try {
      const url = `${API_URL}/login`;
      const response = await fetch(url, {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.acces_token) {
          await AsyncStorage.setItem('token', responseData.acces_token);
          setUser({ token: responseData.acces_token });
        } else {
          Alert.alert('Erreur', 'Token manquant dans les données de réponse.');
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur', errorData.message || 'Une erreur s\'est produite lors de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion.');
    }
  };

  const logout = async () => {
    try {

      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
