import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';



const Routes = () => {


    const Stack = createNativeStackNavigator;
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen name="home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes