// screens/AuthLoadingScreen.js
import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Vérifiez l'état d'authentification ici (par exemple, en vérifiant si un jeton existe)

    // Remplacez la ligne suivante par votre logique d'authentification
    const userIsAuthenticated = false;

    navigation.navigate(userIsAuthenticated ? 'App' : 'Auth');
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;
