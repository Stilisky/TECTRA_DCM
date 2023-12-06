// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils/constantes';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const url = `${API_URL}/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.acces_token) {
          await AsyncStorage.setItem('token', responseData.acces_token);
          await AsyncStorage.setItem('userData', JSON.stringify(responseData));

          navigation.navigate("home");
        } else {
          Alert.alert('Error', 'Token is missing in the response data.');
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'An error occurred during login.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ alignItems: 'center', marginTop: 200 }}>
          <Text style={styles.title}>LOGIN</Text>

          {/* Champ de saisie pour l'email avec icône */}
          <View style={styles.andr}>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="envelope" size={20} color="#333" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Champ de saisie pour le mot de passe avec icône */}
            <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={20} color="#333" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            {/* Bouton de connexion avec TouchableOpacity */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>SE CONNECTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 70,
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    marginBottom: 0,
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  icon: {
    marginRight: 8,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
