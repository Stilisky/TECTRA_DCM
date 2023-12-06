// LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../../context/userContext';
import { Loading } from '../../../components/ui/Loading';
import { fonts, sizes } from '../../../components/utils/theme';
import { SCREEN } from '../../../components/utils/constantes';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext)

  const handleLogin = async () => {
    if(email && password) {
      setLoading(true)
      login({email: email, password: password}).then(() =>{
        setLoading(false)
      })
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <Text style={styles.title}>LOGIN</Text>
        
        <Image source={require('../../../assets/login.png')} resizeMode='contain' style={{ width: SCREEN.width, height: 300 }} />

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
        <View style={{ marginTop: 15 }}>
          {
            loading ? 
              <View style={{ marginTop: sizes.md }}>
                <Loading size={25}/>
              </View> :
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>SE CONNECTER</Text>
              </TouchableOpacity>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 50,
    marginTop: 25,
    textAlign: 'center',
    color: 'black',
    fontFamily: fonts.font600
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    marginBottom: 0,
    marginTop: 15,
    marginHorizontal: 15,
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

    {/* <View style={{ alignItems: 'center', marginTop: 200 }}>
      <Text style={styles.title}></Text>
    
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
        {
          loading ? 
            <Loading size={16}/> :
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>SE CONNECTER</Text>
            </TouchableOpacity>
        }
      </View>
    </View> */}