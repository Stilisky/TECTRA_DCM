// ProfilScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données de l\'utilisateur :', error.message);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
      navigation.navigate('login');  // Utilisez la navigation directe ici
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Profil de {userData.username}</Text>
          <Text>Email: {userData.email}</Text>
          {/* Affichez d'autres informations sur le profil de l'utilisateur au besoin */}
          <Button title="Se déconnecter" onPress={handleLogout} />
        </>
      ) : (
        <Text>Chargement du profil...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default ProfilScreen;
