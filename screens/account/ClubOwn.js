import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native'
import {Icon} from 'react-native-elements'

const ClubOwn = () => {
    return (
        <View style={styles.container}>
            <View style={styles.clubMeta}>
                <View>
                    <Image
                        style={styles.clubDP}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={styles.clubName}>@My_CLUB</Text>
                </View>
                <View>
                    <Icon type="ionicon" name="ios-open-outline" color="#496076" size={30}/>
                </View>
            </View>
           
            <View style={styles.activityHolder}>
                <Text style={styles.clubActivity}>1000 Followers</Text>
                <Text style={styles.clubActivity}>100 Discussions</Text>
                <Text style={styles.clubActivity}>200 Podcasts</Text>
                <Text style={styles.clubActivity}>60 Advices</Text>
            </View>
        </View>
    )
}

export default ClubOwn

const styles = StyleSheet.create({
    container: {
        marginHorizontal:5,
        marginTop:40,
        marginBottom:10,
        borderRadius:20,
        backgroundColor:'#f7f7f7',
        borderColor:'#fff',
        borderWidth:1,
        paddingHorizontal:10,
        paddingTop:10,
        paddingBottom:15,
    },
    clubDP:{
        width:50,
        height:50,
        borderRadius:20,
    },
    clubMeta:{
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between'
    },
    description:{
        width:'85%',
        paddingLeft:10,
        color:'#333333'
    },
    clubName:{
        fontSize:18,
        fontWeight:'700',
        color:"#333333"
    },
    clubActivity:{
        fontSize:14,
        color:'#333333',
        backgroundColor:'#7accc8',
        margin:5,
        paddingHorizontal:5,
        paddingVertical:2,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#fff',
    },
    activityHolder:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    }
});