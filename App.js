// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { } from "react-native";
import RegistrationScreen from './screens/RegistrationScreen';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from "@react-navigation/native";
// import {useFonts} from "expo-font";
// import * as SplashScreen from 'expo-splash-screen';
// import React, { useCallback } from "react";

const AuthStack = createStackNavigator();
// SplashScreen.preventAutoHideAsync();
export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);
  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Register" component={RegistrationScreen}  />
        <AuthStack.Screen name="Login" component={LoginScreen}/>
      </AuthStack.Navigator>
      
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
