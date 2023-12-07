// ProfilScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import { UserContext } from '../../../context/userContext';

const ProfilScreen = ({ navigation, route }) => {
  const {user, logout} = useContext(UserContext)

 

  const handleLogout = async () => {
    logout()
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
          {/* <Image source={}/> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default ProfilScreen;
