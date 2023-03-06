import db from "../../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { updateProfile } from "firebase/auth";


const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;
export const authSignUpUser = ({ login, email, password }) => async (
    dispatch,
    getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); 
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
      });
      
      const { displayName, uid } = await auth.currentUser;
      console.log(displayName, uid);
      
      dispatch(
        updateUserProfile({
        login: displayName,
        userId: uid,
      }));
      console.log("user", user);
    } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
   
  } 

  
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password); 
      console.log("user", user);
    } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
   
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => { 
  await auth.onAuthStateChanged((user) => {
       if (user) {
         dispatch(
          authStateChange({
            stateChange: true,
          })
        ); 
         dispatch(
          updateUserProfile({
            userId: user.uid,
            login: user.displayName,
          })
        );
      }
    })
  
};


// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// export const authSignUpUser =
//   ({ email, password, login }) =>{
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });}

