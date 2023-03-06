// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { } from "react-native";
import { Provider } from "react-redux";
import { store } from './redux/store';
// import db from "./firebase/config";
import Main from "./components/Main";
// import {useFonts} from "expo-font";
// import * as SplashScreen from 'expo-splash-screen';
// import React, { useCallback } from "react";


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
    <Provider store={store}>
      <Main />
    </Provider>
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
