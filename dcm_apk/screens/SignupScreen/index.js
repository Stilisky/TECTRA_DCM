import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../../utils/constantes';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [agencies, setAgencies] = useState([]);
    const [isAgencyModalVisible, setIsAgencyModalVisible] = useState(false);

    // Fetch the list of agencies when the component mounts
    useEffect(() => {
        fetchAgencies();
    }, []);

    const fetchAgencies = async () => {
        try {
            const url = `${API_URL}/agency`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAgencies(data);
            } else {
                console.error('Error fetching agencies:', response.status);
            }
        } catch (error) {
            console.error('Error fetching agencies:', error.message);
        }
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const url = `${API_URL}/signup`;
            const formData = new FormData();
            formData.append('name', name);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phoneNumber', phoneNumber);
            formData.append('address', address);
            formData.append('selectedAgency', selectedAgency);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                await AsyncStorage.setItem('token', responseData.token);
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                Alert.alert('Erreur', errorData.message || 'Une erreur s\'est produite lors de l\'inscription.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error.message);
        }

        setIsAgencyModalVisible(false);
    };

    const renderAgencyItem = ({ item }) => (
        <TouchableOpacity
          style={styles.agencyItem}
          onPress={() => {
            setSelectedAgency(item.id);
            setIsAgencyModalVisible(false);
          }}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
      


    return (
        <View style={styles.container}>
            <Text style={styles.title}>SIGN UP</Text>


            {/* name*/}
            <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            {/* lastname*/}
            <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Prenoms"
                    value={lastname}
                    onChangeText={(text) => setLastname(text)}
                />
            </View>

            {/* email*/}
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

            {/* password*/}
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

            {/* confirm password */}
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

            {/* telephone */}
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

            {/* adresse */}
            <View style={styles.inputContainer}>
                <FontAwesome5 name="map-marker-alt" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Adresse"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
            </View>


            {/* Agency selection */}
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setIsAgencyModalVisible(true)}
            >
                <FontAwesome5 name="building" size={20} color="#333" style={styles.icon} />
                <Text style={styles.selectedAgencyText}>
                    {selectedAgency ? agencies.find((a) => a.id === selectedAgency)?.name : 'Sélectionner une agence'}
                </Text>
            </TouchableOpacity>

            {/* Agency selection modal */}
            <Modal
                transparent
                animationType="slide"
                visible={isAgencyModalVisible}
                onRequestClose={() => setIsAgencyModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsAgencyModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <FlatList
                        data={agencies}
                        keyExtractor={(item) => (item && item.id ? item.id.toString() : Math.random().toString())}
                        renderItem={renderAgencyItem}
                    />

                </View>
            </Modal>

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
        paddingHorizontal: 16,
        padding: 40
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
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#333',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 12,
    },
    icon: {
        marginHorizontal: 8, // Adjusted margin for a more balanced look
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
        color: '#333',
        fontSize: 16, // Adjusted font size
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginVertical: 16, // Adjusted vertical margin
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

    selectedAgencyText: {
        flex: 1,
        paddingHorizontal: 8,
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    agencyItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

});

export default SignUpScreen;
