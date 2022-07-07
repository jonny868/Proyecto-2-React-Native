import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";

import styles from "./styles";
import { TweetType } from "../../../../types";
import { createLike } from "../../../../graphql/mutations";

export type FooterContainerProps = {
  tweet: TweetType;
};
const Footer = ({ tweet }: FooterContainerProps) => {
  const [myLike, setMyLike] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const onLike = async () => {
    if (!user) {
      return;
    }
    const like = {
      userID: user.attributes.sub,
      tweetID: tweet.id,
    };
    try {
      const response: any = await API.graphql(
        graphqlOperation(createLike, { input: like })
      );
      setMyLike(response.data.createLike)
    } catch (error) {
      console.error(error);
    }
  };
  const onRetweet = async () => {
    console.warn("Rt pressed");
  };
  const onComment = async () => {
    console.warn("comment pressed");
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onComment}>
          <Feather name="message-circle" size={20} color="grey" />
        </TouchableOpacity>
        <Text style={styles.number}>{tweet.numberOfComments}</Text>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="retweet" size={20} color="grey" />
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onLike}>
          <AntDesign name={!myLike ? "hearto" : "heart" } size={20} color={!myLike ? "grey" : "red"} />
        </TouchableOpacity>
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="sharealt" size={20} color="grey" />
      </View>
    </View>
  );
};

export default Footer;
