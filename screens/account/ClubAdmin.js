import React from 'react'
import { View, Text, StyleSheet ,Image} from 'react-native'
import {Icon} from 'react-native-elements'

const ClubAdmin = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Clubs that you are admin at</Text>
                <Icon type="ionicon" name="ios-open-outline" color="#496076" size={30}/>
            </View>
            <View style={styles.clubHolder}>
                <View style={styles.clubItem}>
                    <Image
                        style={styles.clubDP}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={styles.clubName}>@My_CLUB</Text>
                    <Text>100 Followers</Text>
                </View>

                <View style={styles.clubItem}>
                    <Image
                        style={styles.clubDP}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={styles.clubName}>@My_CLUB</Text>
                    <Text>100 Followers</Text>
                </View>

                <View style={styles.clubItem}>
                    <Image
                        style={styles.clubDP}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={styles.clubName}>@My_CLUB</Text>
                    <Text>100 Followers</Text>
                </View>

                <View style={styles.clubItem}>
                    <Image
                        style={styles.clubDP}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={styles.clubName}>@Karathode_health</Text>
                    <Text>100 Followers</Text>
                </View>
                <View style={styles.moreIcon}>
                    <Icon type="feather" name="more-horizontal" color="#496076" size={50}/>
                </View>
            </View>
        </View>
    )
}

export default ClubAdmin
const styles = StyleSheet.create({
    container:{
        marginHorizontal:5,
        marginVertical:10,
        backgroundColor:'#f7f7f7',
        borderRadius:20,
        borderWidth:1,
        borderColor:'#fff',
        paddingBottom:15,
       
    },
    clubDP:{
        width:30,
        height:30,
        resizeMode:'contain',
    },
    clubHolder:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center'
    },
    clubItem:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderColor:'#ccc',
        backgroundColor:'#fff',
        borderWidth:1,
        margin:5,
        borderRadius:20,
    },
    title:{
        fontSize:18,
        fontWeight:'700',
       marginTop:15,
       marginBottom:25,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
    },
    moreIcon:{
        paddingHorizontal:20,

    }
})
