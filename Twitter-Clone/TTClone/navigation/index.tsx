/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeNavigatorParamList, RootTabParamList } from "../types";
import { User } from "../API";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { ColorSchemeName, Pressable } from "react-native";
import { useEffect, useState } from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/HomeScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import ProfilePicture from "../components/ProfilePicture";
import NewTweetScreen from "../screens/NewTweetScreen";
import { getUser } from "../graphql/queries";
import React from "react";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <HomeNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<HomeNavigatorParamList>();

function HomeNavigator() {
  const [user, setUser] = useState<User>();
  
  useEffect(() => {
    //get current User
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if(!userInfo){
        return
      }
      try {
        const userData:any = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}))
        if (userData) {
          setUser(userData.data.getUser)
        }
      } catch (err) {
        console.error(err);
        
      }
    };
    fetchUser();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={BottomTabNavigator}
        options={{
          headerTitle: () => (
            <FontAwesome5
              name={"kiwi-bird"}
              size={30}
              color={Colors.light.tint}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name={"star-four-points-outline"}
              size={30}
              color={Colors.light.tint}
            />
          ),
          headerLeft: () => (
            <ProfilePicture
              image={user?.image || 'https://res.cloudinary.com/comicseries/image/upload/v1649827898/imgThumb_svogrq.png'}
              size={40}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="NewTweet"
        component={NewTweetScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneScreen}
        options={{
          title: "Tab Two",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="envelope" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
