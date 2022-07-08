import ProfilePicture from '../components/ProfilePicture'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../constants/Colors'
import { getUser } from '../graphql/queries'

const ProfileScreen = () => {
    const [user, setUser] = useState<any>(null);
    
    const logout = () => {
            Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
        
    }
    useEffect(() => {
        //get current User
        const fetchUser = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();
          setUser(userInfo)
          console.log(user.username);
          
          
          if(!userInfo){
            return
          }
          try {
            const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}))
            console.log('here starts userData',userData);
            
          } catch (err) {
            console.error(err);
            
          }
        };
        fetchUser();
      }, []);

      const username = {
        
      }

      const changeProfilePic = () => {
        
      }


  return (
    <View style= { styles.container}>
        <View style = {styles.infoContainer}>
        <TouchableOpacity>
        <ProfilePicture size={80} image={'https://randomuser.me/api/portraits/men/1.jpg'}/>
        </TouchableOpacity>
        <Text style={styles.profileName}>dummyUsername</Text>
        <Text style={styles.name}>dummyName</Text>
        </View>
        <View>
            <TouchableOpacity style={styles.logout} onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.light.tint,
        // flex: 1,
        flexDirection: 'row',
        height: 200,
        paddingVertical: 60,
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    profileName: {
        paddingVertical: 7,
        fontWeight: 'bold',
        fontSize:16,

    },
    infoContainer:{
        justifyContent: "center"
    },
    picture:{
        width:150
    },
    name: {
        color: "black",
        textAlign:'center'
    },
    logout:{
        justifyContent: 'flex-end',
        borderRadius: 10,
        borderWidth: 4,
        padding: 10
    }



})
