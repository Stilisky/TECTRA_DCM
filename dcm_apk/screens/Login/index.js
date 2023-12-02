// screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Effectuez ici l'appel à l'API d'authentification avec l'email et le mot de passe
      // Remplacez la ligne suivante par votre logique d'authentification
      const response = await fetch('https://votre-backend.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Authentification réussie, naviguez vers l'écran suivant (par exemple, Home)
        navigation.navigate('Home');
      } else {
        // Affichez un message d'erreur si l'authentification a échoué
        Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connectez-vous</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Se connecter" onPress={handleLogin} />
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
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Login;
