// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const goToAppointments = () => {
        // Naviguer vers l'écran de gestion des rendez-vous
        navigation.navigate('Appointments');
    };

    const goToProspects = () => {
        // Naviguer vers l'écran de gestion des prospects
        navigation.navigate('Prospects');
    };

    const goToActivities = () => {
        // Naviguer vers l'écran de l'historique des activités
        navigation.navigate('Activities');
    };

    const goToGoals = () => {
        // Naviguer vers l'écran des objectifs
        navigation.navigate('Goals');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur l'écran d'accueil</Text>

            <TouchableOpacity style={styles.button} onPress={goToAppointments}>
                <Text style={styles.buttonText}>Gestion des Rendez-vous</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={goToProspects}>
                <Text style={styles.buttonText}>Gestion des Prospects</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={goToActivities}>
                <Text style={styles.buttonText}>Historique des Activités</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={goToGoals}>
                <Text style={styles.buttonText}>Objectifs</Text>
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
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HomeScreen;
