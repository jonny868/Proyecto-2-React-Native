import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
  } from "react-native";
  import React, { useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import Colors from "../constants/Colors";
  import ProfilePicture from "../components/ProfilePicture";
  import { API, Auth, graphqlOperation } from "aws-amplify";
  import { createTweet } from "../graphql/mutations";
  import { useNavigation } from "@react-navigation/native";
  
  const NewTweetScreen = () => {
    const [tweet, setTweet] = useState("");
    const [imageUrl, setImageUrl] = useState("");
  
    const navigation = useNavigation();

    const onPostTweet = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser()



        const newTweet = {
            content: tweet,
            image: imageUrl,
            userID: currentUser.attributes.sub
        }
        await API.graphql(graphqlOperation(createTweet,{input: newTweet}))
        navigation.goBack()
      } catch (error) {
        console.error(error);
        
      }
    };
    const goBack = () => {
      return navigation.goBack()
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={goBack}>
          <Ionicons name="close" size={30} color={Colors.light.tint}  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPostTweet}>
            <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tweetContainer}>
          <ProfilePicture
            image="https://randomuser.me/api/portraits/men/57.jpg"
            size={50}
          />
          <View style={styles.inputsContainer}>
            <TextInput
              value={tweet}
              onChangeText={(value) => setTweet(value)}
              style={styles.tweetInput}
              placeholder="What's happening?"
              numberOfLines={3}
              multiline={true}
              autoFocus={true}
              maxLength={140}
            />
            <TextInput
              value={imageUrl}
              onChangeText={(value) => setImageUrl(value) }
              style={styles.imageInput}
              placeholder="Image url(Optional)"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default NewTweetScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      backgroundColor: "white",
    },
    headerContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
    },
    button: {
      backgroundColor: Colors.light.tint,
      borderRadius: 30,
    },
    buttonText: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    tweetContainer: {
      // backgroundColor:"grey",
      flexDirection: "row",
      padding: 15,
    },
    inputsContainer: {
      marginLeft: 10,
    },
    tweetInput: {
      height: 100,
      width: 300,
      maxHeight: 300,
      fontSize: 20,
    },
    imageInput: {
      fontSize: 18,
      color: Colors.light.tint,
      marginVertical: 10,
    },
    image: {
      width: 150,
      height: 150,
    },
  });
  