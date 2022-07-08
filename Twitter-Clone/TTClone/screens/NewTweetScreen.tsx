import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createTweet } from "../graphql/mutations";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "aws-amplify";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const NewTweetScreen = () => {
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUrl(result.uri);
      }

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  const onPostTweet = async () => {
    let image;
    if (!!imageUrl) {
      image = await uploadImage();
    }
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      const newTweet = {
        content: tweet,
        image,
        userID: currentUser.attributes.sub,
      };
      await API.graphql(graphqlOperation(createTweet, { input: newTweet }));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };


  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();

      const urlParts = imageUrl.split('.');
      const extension = urlParts[urlParts.length - 1];

      const key = `${uuidv4()}.${extension}`;

      await Storage.put(key, blob);

      return key;

    } catch (e) {
      console.log(e);
    }
    return '';
  }

  const goBack = () => {
    return navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tweetContainer}>
        <ProfilePicture image={'https://randomuser.me/api/portraits/men/1.jpg'}/>
        <View style={styles.inputsContainer}>
          <TextInput
            value={tweet}
            onChangeText={(value) => setTweet(value)}
            multiline={true}
            numberOfLines={3}
            style={styles.tweetInput}
            placeholder={"What's happening?"}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.pickImage}>Pick a image</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.image} />
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
  Image: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  pickImage: {
    fontSize: 18,
    color: Colors.light.tint,
    marginVertical: 10,
  }
});
