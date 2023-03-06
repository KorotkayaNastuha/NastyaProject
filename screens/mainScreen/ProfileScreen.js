import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { auth, db } from "../../firebase/config";

const ProfileScreen = () => {
    const [posts, setPosts] = useState([]);
    const { userId } = useSelector((state) => state.auth);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getCommentsUser = query(
        collection(db, "posts"),
        where("userId", "==", userId)
    );
    
    const getAllPosts = async () => {
        const allPosts = await (await getDocs(getCommentsUser)).docs.map((post) => ({
            ...post.data(),
            id: post.id
        }));

        const sortedPosts = allPosts.sort(
            (firstContact, secondContact) => secondContact.id - firstContact.id
        );
        setPosts(sortedPosts);
    }
        const dispatch = useDispatch();
        const signOut = () => {
            dispatch(authSignOutUser());
        };
    
    return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.photoContainer} />
          </View>
        )}
      />
    </View>) 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    },
      photoContainer: {
    borderColor: "#fff",
    borderWidth: 1,

    marginTop: 32,
    height: 240,
    width: 343,
    // marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
})
export default ProfileScreen;