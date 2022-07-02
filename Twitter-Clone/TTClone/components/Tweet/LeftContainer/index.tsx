import React from "react";
import { UserType } from "../../../types";
import ProfilePicture from "../../ProfilePicture";
import { View } from "../../Themed";


export type LeftContainerProps = {
  user: UserType,
};

const LeftContainer = ({user}: LeftContainerProps) => {
  return <View>
    <ProfilePicture image={user.image} size={75}/>
  </View>;
};

export default LeftContainer;
