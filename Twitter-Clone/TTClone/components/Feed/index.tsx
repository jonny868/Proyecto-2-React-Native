import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Tweet from "../Tweet";
import { API, graphqlOperation } from "aws-amplify";
import { listTweets } from "../../graphql/queries";

const Feed = () => {
  const [tweets, setTweets] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchTweet = async () => {
    //get tweets from backend and set to state
    try {
      const tweetsData: any = await API.graphql(graphqlOperation(listTweets));
      setTweets(tweetsData.data.listTweets.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweet();
  }, []);

  return (
    <View style={{ backgroundColor: "red", width: "100%" }}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchTweet}
      />
    </View>
  );
};

export default Feed;
