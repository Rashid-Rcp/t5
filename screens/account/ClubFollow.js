import React from 'react'
import { View, Text, StyleSheet ,Image, TouchableOpacity, Touchable} from 'react-native'
import {Icon} from 'react-native-elements'


const ClubFollow = ({navigation, clubsFollow}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Clubs you are following</Text>
                <Icon type="ionicon" name="ios-open-outline" color="#496076" size={30}
                    onPress={()=>navigation.navigate('ClubList',{type:'member'})}
                />
            </View>
            <View style={styles.clubHolder}>
                {
                    clubsFollow.data.map((club, index)=>{
                        return (
                            <TouchableOpacity key={index} onPress={()=>navigation.navigate('ClubDetails',{clubId:club.id})}>
                                <View style={styles.clubItem}>
                                    <Image
                                        style={styles.clubDP}
                                        source={{
                                            uri: global.Link+'/images/club/'+club.image,
                                        }}
                                    />
                                    <Text style={styles.clubName}>@{club.name}</Text>
                                    <Text>{club.followers} Followers</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                {
                    clubsFollow.next_page_url !== null &&  <View style={styles.moreIcon}>
                    <Icon type="feather" name="more-horizontal" color="#496076" size={50}/>
                    </View>
                }
               
            </View>
        </View>
    )
}

export default ClubFollow
const styles = StyleSheet.create({
    container:{
        marginHorizontal:5,
        marginBottom:20,
        marginTop:5,
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
        borderRadius:10,
    },
    clubHolder:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'space-evenly',
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
