import React from "react";
import { TweetType } from "../../../types";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Footer from './Footer/index'
import moment from "moment";

export type MainContainerProps = {
  tweet: TweetType,
};

const MainContainer = ({tweet}: MainContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tweetHeaderContainer}>
        <View style={styles.tweetHeaderNames}>
        <Text style={styles.name}>{tweet.user.name}</Text>
        <Text style={styles.username}>@{tweet.user.username}</Text>
        <Text style={styles.createdAt}>{moment(tweet.createdAt).fromNow()}</Text>
        </View>
        <Ionicons name={"chevron-down"} size={20} color={'grey'}/>
      </View>
      <View>
        <Text style={styles.tweetContent}>{tweet.content}</Text>
        {!! tweet.image && <Image style={styles.image} source={{uri:tweet.image}}/>}
      </View>
      <Footer tweet={tweet}></Footer>
    </View>
  );
};

export default MainContainer;
