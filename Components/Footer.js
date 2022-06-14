import React from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import RestaurantLogin from './RestaurantLogin';

const login = 'Login';
const menu = 'Menu';
const Tab = createBottomTabNavigator();
function Footer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRootName={menu}
        screenOptions={({route}) => ({
          tabBarIcon : ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if(rn === login){
              iconName = focused ? 'login': 'login-outline'
            }
            else if(rn === menu){
              iconName = focused ? 'menu' : 'menu-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
      >
        <Tab.Screen name={login} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  footer: {
  }
})
export default Footer