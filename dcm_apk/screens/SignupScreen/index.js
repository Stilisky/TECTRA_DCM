// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleSignUp = async () => {
        // Exemple de validation côté client
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            // Construire un objet FormData pour envoyer les données incluant le fichier image
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phoneNumber', phoneNumber);
            formData.append('address', address);

            // Remplacez cette URL par l'URL de votre endpoint d'inscription
            const response = await fetch('https://votre-api.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                // Naviguer vers l'écran de connexion après l'inscription réussie
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                Alert.alert('Erreur', errorData.message || 'Une erreur s\'est produite lors de l\'inscription.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SIGNUP</Text>
            
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

            {/* Champ de saisie pour la confirmation du mot de passe avec icône */}
            <View style={styles.inputContainer}>
                <FontAwesome5 name="lock" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmer le mot de passe"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>

            {/* Champ de saisie pour le numéro de téléphone avec icône */}
            <View style={styles.inputContainer}>
                <FontAwesome5 name="phone" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Numéro de téléphone"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Champ de saisie pour l'adresse avec icône */}
            <View style={styles.inputContainer}>
                <FontAwesome5 name="map-marker-alt" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Adresse"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>S'INSCRIRE</Text>
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
        paddingHorizontal: 16
    },
    image: {
        width: '90%',
        height: '35%',
        marginBottom: 16,
        borderRadius: 900,
    },
    title: {
        fontSize: 70,
      marginBottom: 16,
      textAlign: 'center',
      color:'#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
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
        fontSize: 20,
    },

});

export default SignUpScreen;
