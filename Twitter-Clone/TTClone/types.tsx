/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

 import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
 import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
 import { NativeStackScreenProps } from '@react-navigation/native-stack';
 
 declare global {
   namespace ReactNavigation {
     interface RootParamList extends HomeNavigatorParamList {}
   }
 }

 
 export type HomeNavigatorParamList = {
   Root: NavigatorScreenParams<RootTabParamList> | undefined;
   Modal: undefined;
   NotFound: undefined;
   HomeScreen: undefined;
   NewTweet: undefined;
 };
 
 export type RootStackScreenProps<Screen extends keyof HomeNavigatorParamList> = NativeStackScreenProps<
   HomeNavigatorParamList,
   Screen
 >;
 
 export type RootTabParamList = {
   Home: undefined;
   Search: undefined;
   Notifications: undefined;
   Messages: undefined;  
 };
 
 export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
   BottomTabScreenProps<RootTabParamList, Screen>,
   NativeStackScreenProps<HomeNavigatorParamList>
 >;
 
 export type UserType = {
   id: string
   name: string
   username: string
   image?: string
 }
 
 export type TweetType = {
   id: string
   createdAt: string
   user: UserType
   content: string
   image?: string
   numberOfComments?: number
   numberOfRetweets?: number
   numberOfLikes?: number
 }
 