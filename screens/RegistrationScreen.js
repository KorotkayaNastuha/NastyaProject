import { useState } from "react";
import {
  Platform,
  View,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from "react";


const initialState = {
    login: "",
    email: "",
    password: "",
  
};
SplashScreen.preventAutoHideAsync();

export default function RegistrationScreen({navigation}) {
    console.log(Platform.OS);
    
  const [state, setState] = useState(initialState);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  //    const onRegister = () => {
  //   Alert.alert("Credentials", `${state}`);
  // };



  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  
  
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/PhotoBG.png")}
          >
          <KeyboardAvoidingView 
          behavior={Platform.OS == "android" ? "padding" : "height"}
        >  
            <View style={{...styles.form, marginBottom: isShowKeyBoard ? 50: 100}}> 
                    <Text style={styles.inputTitle}>Реєстрація</Text>
                    <View >
                <TextInput
                  style={styles.input}          
                  placeholder="Логін"
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  onFocus={() => setIsShowKeyBoard(true)}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Електрона адреса"
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  onFocus={() => setIsShowKeyBoard(true)}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Пароль"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  onFocus={() => setIsShowKeyBoard(true)}
                />
                </View>
                <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle} >Зареєструватись</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
              >
            <Text style={{
              position: "absolute",
              marginTop: 274,
              left:94,
              width: 188,
              // height: 19,
              fontSize: 16,
              fontFamily: "Roboto-Regular",
              color:"#1B4371",
              }}>Вже є акаунт? Увійти
              </Text>
              </TouchableOpacity>
                    </View>
         </KeyboardAvoidingView>          
          </ImageBackground>
        
      </View>
    </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
        // position: "absolute",
        // width: 375,
        height: 812,
        // left: "5%",
        top: 0,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        // alignItems: "center",
        // position: "absolute",
        // width: 375,
        // height: 812,
        // left: 0,
        // top: 0,
    },
 
   input: {
        borderWidth: 1,
        borderColor: "#E8E8E8",
        height: 40,
        borderRadius: 8,
        color: " #BDBDBD",
        top: 160,
        backgroundColor: "#F6F6F6",
        width: 343,
        height: 50,
        left: 16,
     paddingLeft: 16,
        fontFamily:"Roboto-Regular",
        
    },
    form: {
        // position: "absolute",
        // width: 375,
        height: 549,
        left: 0,
        top: 160,
        backgroundColor: "#FFFFFF",
      borderRadius: 25,
      // marginBottom: 100,
      marginHorizontal: 16,
      
        
    },
    inputTitle: {
        position: "absolute",
      fontFamily: "Roboto-Medium",
        // fontStyle: "normal",
        display:"flex",
        width: 184,
        height: 35,
        top: 92,
        bottom: 33,
        left:96,
        fontSize: 30,
        justifyContent:"center",
        textAlign: "center",
        lineHeight: 35,
        color:"#212121",
    },
    btn: {
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        position:"absolute",
    borderRadius: 100,
    width:343,
    height: 51,
    bottom: 113,
    justifyContent: "center",
    alignItems: "center",
    left: 16,
    ...Platform.select({
      android: {
        backgroundColor: "#FF6C00",
        
      },
    }),
  },
  btnTitle: {
    color:  "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
})