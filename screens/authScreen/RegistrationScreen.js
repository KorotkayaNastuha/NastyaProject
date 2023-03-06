import { useState, useEffect } from "react";
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
  Image,
} from "react-native";

import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from "react";
import { authSignUpUser } from "../../redux/auth/authOperations";

import { useDispatch } from "react-redux";

import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
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
  const [image, setImage] = useState(null);
  //    const onRegister = () => {
  //   Alert.alert("Credentials", `${state}`);
  // };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
    setImage(result.assets[0].uri);
      // setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
    
  };

//  const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
//   const imageSource =
//     selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

//   return <Image source={imageSource} style={styles.image} />;
// }
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
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
      <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/PhotoBG.png")}
          >
          <KeyboardAvoidingView 
          behavior={Platform.OS == "android" ? "padding" : "height"}
          >  
            
      
            <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? 10 : 40 }}> 
              
              <View style={styles.photo} >
                
                <TouchableOpacity
                  onPress={pickImageAsync}
                >
                {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 16 }} />}  
                  <EvilIcons name="plus" size={34} color="#FF6C00" style={{ position: "absolute", left: 100, top: 81 }} />
                
                </TouchableOpacity>
                  
            </View>  
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
                onPress={handleSubmit}
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
  photo: {
    position:"absolute",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    borderColor: "#F6F6F6",
    width: 120,
    height: 120,
    left: 128,
    top: -60,
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