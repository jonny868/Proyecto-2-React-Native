import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Feed />
      <NewTweetButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
