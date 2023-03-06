import React, { useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet,TouchableOpacity ,Image, TextInput} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/config";
import { Feather } from '@expo/vector-icons';


import { EvilIcons } from '@expo/vector-icons';

import {doc, setDoc } from "firebase/firestore";
import "firebase/storage";
import "firebase/firestore";
const CreateScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [location, setLocation] = useState(null);
    const [comment, setComment] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const storage = getStorage()
    const { userId, login } = useSelector((state) => state.auth);
    
  
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();

         (async () => {
           let { status } = await Location.requestForegroundPermissionsAsync();
           if (status !== 'granted') {
             setErrorMsg('Permission to access location was denied');
             return;
           }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
      
    })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
    text = errorMsg;
    } else if (location) {
    text = JSON.stringify(location);
    }

    if (hasPermission === null) {
        return <View/>
    }
    if (hasPermission === false) {
         return <Text>No access to camera</Text>;
    }

  const takePhoto = async () => {
    if (camera) { 
        // const options = { quality: 0.5, base64: true, skipProcessing: true}
      const { uri } = await camera.takePictureAsync(); 
      
      //   const coords = {
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // };
      // setLocation(coords);
      setPhoto(uri); 
        } 
    }
    const sendPhoto = () => {
        // getDownloadURL;
        uploadPostToServer();
        navigation.navigate("Home");
  }
 const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    // const createPosts = await db
    //   .firestore()
    //   .collection("posts")
    //   .add({ photo, comment, location: location.coords, userId, login });

    const uniquePostId = Date.now().toString();
    // const photo = await uploadPhoto();
    await setDoc(doc(db, "posts", `${uniquePostId}`), {
      photo: photo,
      location: location,
      // headers: pictureHeaders,
      login: login,
      userId: userId,
      // commentsCount: 0,
      comment: comment,
    });
  };
    

  const uploadPhotoToServer = async () => {
      // const storage = getStorage(app);
      const response = await fetch(`${photo}`);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const storageRef = await ref(storage, `photo/${uniquePostId}`);
      await uploadBytes(storageRef, file);
    
      return await getDownloadURL(storageRef);
    
  }   
//  function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }


    return (
    <View style={styles.container}>
            <Camera style={styles.camera} type={type}
                ref={(ref) => {setCamera(ref);}}
            >
         {photo && (
            <View style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={{ width: 150, height: 150 }} />        
            </View>
            )}
            <TouchableOpacity style={styles.camContainer}  onPress={takePhoto}>
                <Feather name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            </Camera>
            <View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} onChangeText={setComment} />
          </View>   
          <View style={styles.inputContainer}>
            <TextInput style={styles.input}>
              <EvilIcons name="location" size={24} color="black" />{text}
            </TextInput>
          </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.sendButton}
          onPress={sendPhoto}
        >
          <Text style={styles.textButton}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
        </View>
    ) 
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:"white",
    },
    camera: {
        height: 240,
        marginTop: 32,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        
        
    },
    flip: {
        color: "white",
    },
    camContainer: {
        width: 60,
        height: 60,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        justifyContent: "center",
        alignItems:"center",
    },
    photoContainer: {
    borderColor: "#fff",
    borderWidth: 1,
    
    marginBottom: 10,
    },
    sendButton: {
        height:51,
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
        top:20,
        
    },
    textButton: {
        fontSize: 16,
        color:"#BDBDBD",
    },
    inputContainer: {
      marginTop: 59,
      marginHorizontal: 16,
  },
  input: {
      fontSize: 16,
      height: 50,
      // top: 419,
      borderWidth: 1,
      color:"#212121",
      borderColor: "transparent",
      borderBottomColor: "#E8E8E8",
    }
})
export default CreateScreen;