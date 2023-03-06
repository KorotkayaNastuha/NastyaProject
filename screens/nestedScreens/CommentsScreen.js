import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Pressable} from "react-native";

import { setDoc, doc, getDocs, query, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const { login, userId } = useSelector((state) => state.auth);
  
  useEffect(() => {
    getAllComments();
  }, [commentId]);
  
  const createComments = async () => {
    const uniqueCommentId = Date.now().toString();
    // const photo = await uploadPhoto();
    await setDoc(doc(db, "posts", postId, "comments", uniqueCommentId), {
      comment,
      login,
      userId,
    });
    setCommentId(uniqueCommentId);
    setComment(null);
  };

const deleteComment = async (uniqueCommentId) => {
    await deleteDoc(doc(db, "posts", postId, "comments", uniqueCommentId));
    setCommentId(uniqueCommentId + "deleted");
  };

   const getAllComments = async () => {
    let allComments = [];
    const comments = await getDocs(query(collection(db, "posts", postId, "comments")));

    await comments.forEach((data) => {
      allComments.push({ ...data.data(), id: data.id });
    });
     
     const commentsCount = comments.size;

    await updateDoc( doc(db, "posts", postId), { commentsCount: commentsCount });

    const allOrderedComments = allComments.sort(
      (firstComment, secondComment) => secondComment.id - firstComment.id
    );
    setComments(allOrderedComments);
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <View>
              <Text>author {item.login}:</Text>
                <Text>comment: {item.comment}</Text>
              </View>
               <View style={{ minWidth: 30 }}>
                {item.userId === userId && (
                  <Pressable
                    title={"Delete"}
                    onPress={() => deleteComment(item.id)}
                  >
                   <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}
              </View>
            </View>
            
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} placeholder="Коментувати..." /> 
       <TouchableOpacity
          // activeOpacity={0.5}
          onPress={createComments}
        >
         <Ionicons name="arrow-up-circle-sharp" size={34} color="#FF6C00" style={styles.icon} /> 
        </TouchableOpacity>

      </View>
  </View>
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    
  },
  commentContainer:{
  //  display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: 300,
    minHeight: 30,
    borderColor: "lightgrey",
    backgroundColor: "#rgba(0, 0, 0, 0.03)",
    borderWidth: 1,
    borderRadius: 8,
    // marginTop: 100,
    padding: 5,
    color:"black",
  },
  
    inputContainer: {
      // top: 400,
      marginTop:32,
      marginBottom: 10,
      marginHorizontal: 16,
      height: 50,
      // alignItems: "center",
      // flexDirection: "row",
  },
  input: {
      flex: 1,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      
      borderRadius: 100,
      color: " #BDBDBD",
      backgroundColor: "#F6F6F6",
      paddingLeft: 16,
      fontFamily:"Roboto-Regular",
  },
  icon: {
    position: "absolute",
    top:-42,
    right: 8,
    
  }
});

export default CommentsScreen;