import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyBE2kNfNhOUfnXoW-81RHqaSTaJzukf2u4",
  authDomain: "nastyaproject-bff80.firebaseapp.com",
  // databaseURL: "https://console.firebase.google.com/project/nastyaproject-bff80",
  projectId: "nastyaproject-bff80",
  storageBucket: "nastyaproject-bff80.appspot.com",
  messagingSenderId: "20764697819",
  appId: "1:20764697819:web:d34e2ce2e54c72f60a18fe",
  measurementId: "G-5QGHSR9G06"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


 
// const storage = getStorage();

// export default firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export { auth };
 
// const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBE2kNfNhOUfnXoW-81RHqaSTaJzukf2u4",
//   authDomain: "nastyaproject-bff80.firebaseapp.com",
//   projectId: "nastyaproject-bff80",
//   storageBucket: "nastyaproject-bff80.appspot.com",
//   messagingSenderId: "20764697819",
//   appId: "1:20764697819:web:d34e2ce2e54c72f60a18fe",
//   measurementId: "G-5QGHSR9G06"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);