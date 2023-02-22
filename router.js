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


export const useRoute = (isAuth) => {
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
        )
      }}
        name="Posts" component={PostsScreen} />
      <Tab.Screen
        options={{
        tabBarIcon: ({ focused, color, size}) => (
          <AntDesign name="pluscircle" size={30} color="#FF6C00"/>    
        )
      }}
        name="Create" component={CreateScreen} />
      <Tab.Screen
         options={{
        tabBarIcon: ({ focused, color, size}) => (
          <AntDesign name="user" size={24} color="black" />    
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
          headerRight: () => (
            // <Button
            
            //   onPress={() => alert("This is a button!")}
            //   title="Press me"
            //   color="#fff"
            // />

            <Feather name="log-out" size={24} color="black"
              style={ {right: 10}} />
          ),
      }}
        name="Profile" component={ProfileScreen} />
     </Tab.Navigator>
)
}