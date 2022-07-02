import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:10,
        width: "100%",
        // backgroundColor:"blue"
    },
    tweetHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tweetHeaderNames:{
        flexDirection: "row"
    },
    name: {
        marginRight: 5,
        fontWeight: "bold"
    },
    username: {
        marginRight: 5,
        color:"grey"
        
    },
    createdAt: {
        marginRight: 5,
        color:"grey"
        
    },
    tweetContent: {
        marginTop: 3,
        lineHeight: 18
    },
    image: {
        marginVertical: 10,
        width: "100%",
        height: 150,
        resizeMode: "cover",
        borderRadius: 12,
        overflow:"hidden",
    }
})

export default styles