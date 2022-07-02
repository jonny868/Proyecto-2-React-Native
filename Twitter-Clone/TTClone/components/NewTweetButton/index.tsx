import { TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
const NewTweetButton = () => {
    const navigation = useNavigation();

    const onPress = () => {
      navigation.navigate('NewTweet')
      
    }


    return  (
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="feather" size={30} color="white" />
      </TouchableOpacity>
    )
  };
export default NewTweetButton;
