import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';


import RegistrationScreen from './screens/authScreen/RegistrationScreen';
import LoginScreen from './screens/authScreen/LoginScreen';
import PostsScreen from './screens/mainScreen/PostsScreen';
import CreateScreen from './screens/mainScreen/CreateScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from './redux/auth/authOperations';


export const useRoute = (isAuth) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  }
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen options={{headerShown:false}} name="Register" component={RegistrationScreen}  />
        <AuthStack.Screen options={{headerShown:false}} name="Login" component={LoginScreen}/>
      </AuthStack.Navigator>
    )
  }
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen 
        options={{
        tabBarIcon: ({ focused, color, size}) => (
          <Feather name="grid" size={24} color="black" />    
          ),
          headerTitleAlign: "center",
          title: "Публікації",
          headerStyle: {
          backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
          fontWeight: "500",
          fontSize: 17,
          },
      }}
        name="Posts" component={PostsScreen} />
      <Tab.Screen
        options={{
        tabBarIcon: ({ focused, color, size}) => (
          <AntDesign name="pluscircle" size={30} color="#FF6C00"/>    
          ),
          headerTitleAlign: "center",
          title: "Створити публікацію",
          headerStyle: {
          backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
          fontWeight: "500",
          fontSize: 17,
          },
      }}
        name="Create" component={CreateScreen} />
      <Tab.Screen
         options={{
        tabBarIcon: ({ focused, color, size}) => (
          <AntDesign name="user" size={24} color="black" />    
          ),
          headerTitleAlign: "center",
          title: "Профіль",
          headerStyle: {
          backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
          fontWeight: "500",
          fontSize: 17,
          },
          headerRight: () => (
            <Feather name="log-out" size={24} color="black"
              style={{ right: 10 }} onPress={signOut} />
          ),
      }}
        name="Profile" component={ProfileScreen} />
     </Tab.Navigator>
)
}