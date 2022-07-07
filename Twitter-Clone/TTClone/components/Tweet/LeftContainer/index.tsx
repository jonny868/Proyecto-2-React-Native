import React from "react";
import { UserType } from "../../../types";
import ProfilePicture from "../../ProfilePicture";
import { View } from "../../Themed";
import { StyleSheet } from "react-native";

export type LeftContainerProps = {
  user: UserType,
};

const LeftContainer = ({user}: LeftContainerProps) => {
  return <View style={ styles.View}>
    <ProfilePicture image={user.image} size={75}/>
  </View>;
};

export default LeftContainer;

const styles = StyleSheet.create({
  View: {
    backgroundColor:"white"
  }
})
