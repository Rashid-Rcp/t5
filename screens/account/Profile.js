import React from 'react'
import { View, Text,StyleSheet,Image } from 'react-native'
import {Icon} from 'react-native-elements';


const Profile = () => {
    return (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <View style={styles.DPHolder}>
                <Image
                    style={styles.userDP}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                
            </View>
            <View style={styles.userMetaHolder}>
                <View style={styles.userMetaItem}>
                    <Icon type="ionicon" name="phone-portrait-outline" color="#496076" size={20}/>
                    <Text style={styles.userMeta}>955 5956</Text>
                </View>
                <View style={styles.userMetaItem}>
                    <Icon type="fontisto" name="email" color="#496076" size={20}/>
                    <Text style={styles.userMeta}>anna@gmail.com</Text>
                </View>
            </View>
        </View>
        <Text style={[styles.userMeta,styles.userName]}>anna james</Text>
        <View style={styles.editIconHolder}>
            <Icon type="feather" name="edit" color="#496076" size={30}/>
        </View>
    </View>
    )
}

export default Profile
const styles = StyleSheet.create({
    mainContainer:{
        marginTop:20,
    },
    container:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:10,
        marginHorizontal:10,
       
    },
    userDP:{
        width:70,
        height:70,
        resizeMode:'contain',
        borderRadius:10,
    },
    userMeta:{
        color:'#333333',
        fontSize:15,
        fontWeight:'700',
        marginLeft:10,
    },
    userMetaHolder:{
        marginLeft:20,
    },
    userMetaItem:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
    },
    userName:{
        marginTop:5,
        marginLeft:10,
        fontSize:17,
    },
    editIconHolder:{
        position:'absolute',
        right:10,
        top:10,
    }

});
