// ProfilScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../../../context/userContext';
import { SCREEN } from '../../../components/utils/constantes';
import { fonts, sizes } from '../../../components/utils/theme';

const ProfilScreen = ({ navigation, route }) => {
  const {user, logout} = useContext(UserContext) 

  const handleLogout = async () => {
    logout()
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image source={require(`../../../assets/user.png`)} resizeMode='contain' style={{ width: (SCREEN.width -100), height: 300, paddingHorizontal:50 }}/>
        </View>
        <View style={{ justifyContent: 'flex-start', marginLeft:15 }}>

          <View style={{ flexDirection:'row' }}>
            <Text style={{ fontFamily: fonts.font600, fontSize: sizes.xl, color:'#4F95DC' }}>Nom:</Text>
            <Text style={{ fontSize: sizes.xl, paddingLeft: 5 }}>{user.name}</Text>
          </View>

          <View style={{ flexDirection:'row' }}>
            <Text style={{ fontFamily: fonts.font600, fontSize: sizes.xl, color:'#4F95DC' }}>Prénoms:</Text>
            <Text style={{ fontSize: sizes.xl, paddingLeft: 5 }}>{user.lastName}</Text>
          </View>

          <View style={{ flexDirection:'row' }}>
            <Text style={{ fontFamily: fonts.font600, fontSize: sizes.xl, color:'#4F95DC' }}>Email:</Text>
            <Text style={{ fontSize: sizes.xl, paddingLeft: 5 }}>{user.email}</Text>
          </View>

          <View style={{ flexDirection:'row', justifyContent: 'center', marginTop: 5 }}>
            <TouchableOpacity
            onPress={handleLogout}
              style={{ backgroundColor:'#4F95DC', padding: 10,paddingHorizontal:20, borderRadius: 20 }}
            >
              <Text style={{ color:'white' }}>Deconnexion</Text>
            </TouchableOpacity>
          </View>

        </View>
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
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default ProfilScreen;
