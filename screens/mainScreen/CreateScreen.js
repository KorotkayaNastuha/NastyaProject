import React, { useEffect, useState} from "react";

import { View, Text, StyleSheet,TouchableOpacity ,Image} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { Feather } from '@expo/vector-icons';

const CreateScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");
    const [permission, setPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setPermission(status === "granted");
        })();

         (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
    }, []);

    if (permission === null) {
        return <View/>
    }

    if (permission === false) {
         return <Text>No access to camera</Text>;
      
    }

    const takePhoto = async () => {
        if (camera) {
        // const options = { quality: 0.5, base64: true, skipProcessing: true}
        const photo = await camera.takePictureAsync(); 
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      console.log("latitude", location.coords.latitude);
      console.log("longitude", location.coords.longitude);    
        
        setPhoto(photo.uri);
        console.log("photo", photo);   
        }
        
        
    }
    const sendPhoto = () => {
        console.log("navigation", navigation);
        navigation.navigate("Home", { photo });
    }
//  function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }


    return (
    <View style={styles.container}>
            <Camera style={styles.camera} type={type}
                ref={setCamera} 
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
           <Text>Завантажте фото</Text>       
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
        top:207,
        
    },
    textButton: {
        fontSize: 16,
        color:"#BDBDBD",
    }
})
export default CreateScreen;