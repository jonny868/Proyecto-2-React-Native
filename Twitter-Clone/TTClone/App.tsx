import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";
import {getUser} from './graphql/queries';
import {createUser} from './graphql/mutations';
import { CreateUserInput, User } from "./API";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return 'https://randomuser.me/api/portraits/women/75.jpg';
  }

  const saveUserToDB = async (user: CreateUserInput) => {
    
    await API.graphql(graphqlOperation(createUser, {input: user}))
  }

  useEffect(() => {
    const updateUser = async () => {
      //Get current authenticated user
      const userInfo = await Auth.currentAuthenticatedUser();


      if (userInfo) {
        const userData: any = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub}))
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage()
          }
          await saveUserToDB(user);
        }else {
          console.log("User Already Exists");
          
        }
        
      }

      //Check if user already in database,

      //if it is not...Create new user in database
    };
    updateUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);


