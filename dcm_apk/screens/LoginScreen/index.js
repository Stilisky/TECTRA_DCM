import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { API_URL } from '../../utils/constantes';

const LoginScreen = () => {
   const navigation = useNavigation();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = async () => {
      try {
         const url=`${API_URL}/login`
         const response = await fetch( url, {
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
            // Store the token in AsyncStorage
            await AsyncStorage.setItem('token', responseData.token);

            
            navigation.navigate('Home');
         } else {
            const errorData = await response.json();
            Alert.alert('Error', errorData.message || 'An error occurred during login.');
         }
      } catch (error) {
         console.error('Error during login:', error.message);
      }
   };

   const handleSignUp = () => {
      // Naviguer vers l'écran d'inscription
      navigation.navigate('Signup');
   };

   return (
      <View style={styles.container}>


         <Text style={styles.title}>LOGIN</Text>
         <Image style={styles.image} source={require('../../assets/im1.jpeg')} />


         {/* Champ de saisie pour l'email avec icône */}
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

         {/* Bouton pour aller à l'écran d'inscription */}
         <TouchableOpacity onPress={handleSignUp}>
            <Text><Text style={{fontSize:18}}>Pas encore de compte? Inscrivez-vous </Text><Text style={styles.signUpText}>ICI</Text></Text>

         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3b42d1',
      padding:40,
      marginTop:StatusBar.currentHeight
   },
   image: {
      width: '90%',
      height: '40%',
      
      margin: 16,
      borderRadius:900
   },
   title: {
      fontSize: 70,
      marginBottom: 16,
      textAlign: 'center',
      color:'#fff'
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 16,
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
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
   },
   signUpText: {
      marginTop: 16,
      color: '#fff',
      fontSize: 20
   },
});

export default LoginScreen;
