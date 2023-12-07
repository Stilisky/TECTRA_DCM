import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { colors, fonts, sizes } from '../components/utils/theme'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import HomeScreen from '../screens/App/HomeScreen'
import VenteScreen from '../screens/App/VenteScreen'
import ProfilScreen from '../screens/App/ProfilScreen'
import History from '../screens/App/HistoryScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TabNavigator = () => {
   return (
       <Tab.Navigator
           screenOptions={({ route }) => ({
               tabBarHideOnKeyboard: true,
               tabBarShowLabel: true,
               headerShown: false,
               tabBarShowLabel: true,
               tabBarActiveTintColor: 'red',
               tabBarInactiveTintColor: 'gray',
               headerTitleStyle: {
                   fontSize: 18,
                   fontFamily: fonts.font400
               },
               tabBarLabelStyle: {
                   fontSize: sizes.xs,
                   fontFamily: fonts.font500,
               },
               tabBarStyle: {
                   paddingVertical: 1,
                   height: "8%",
                   flexDirection: 'row',
                   justifyContent: 'center',
                   // alignItems: "center"

               },

               tabBarIcon: ({ focused, color, size }) => {
                   switch (route.name) {
                       case "Accueil":
                           return <FontAwesome5 name="home" size={size} color={color} />;

                       case "Ventes":
                           return <FontAwesome5 name="shopping-cart" size={22} color={color} />;

                       case "Profil":
                           return <FontAwesome5 name="user-alt" size={20} color={color} />;

                       default:
                           break;
                   }

               },
           })}
       >
           <Tab.Screen name="Accueil" component={HomeScreen} />
           <Tab.Screen name="Ventes" component={VenteScreen} />
           <Tab.Screen name="Profil" component={ProfilScreen} />
       </Tab.Navigator>
   )
}

const AppNavigation = () => {
  return (
      <Stack.Navigator
         screenOptions={({ navigation }) => ({
            headerStyle: {
               backgroundColor: colors.light.primary,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
               color: colors.light.white,
               fontFamily: fonts.font700,
               fontSize: sizes.md
            },
            headerLeft: () => {
               return <TouchableWithoutFeedback style={styles.leftBtn} onPress={() => {
                     navigation.goBack();
               }}>
                     <FontAwesome name="chevron-left" size={20} color="white" />
               </TouchableWithoutFeedback>
            }
         })}
      >
         <Stack.Screen options={{
            headerShown: false,
         }} name="Tab" component={TabNavigator} />

         <Stack.Screen options={() => ({
            headerShown: true,
            headerTitle: "Historiques des ventes",
         })} name="history" component={History} />

      </Stack.Navigator>
   )
}

export default AppNavigation

const styles = StyleSheet.create({
   leftBtn: {
       marginLeft: 10,
       padding: 8
   },
   add: {
       width: 60,
       height: 60,
       borderRadius: 100,
       backgroundColor: 'white',
       justifyContent: "center",
       alignItems: "center"
       // marginTop: -2,
   }
});