import React,{useEffect, useState, version} from 'react'
import { View, Text,StyleSheet,ScrollView,Image } from 'react-native'
import axios from 'axios';
import Profile from './Profile';
const PublicProfile = ({route}) => {
    const[profile, setProfile] = useState({});
    const[isLoading, setIsLoading] = useState(false);
    const {profileId} = route.params;
    useEffect(()=>{
        axios.get(global.APILink+'/user/public_data/'+profileId)
        .then(res=>{
            console.log(res.data);
            if(res.data.status==='success'){
                setProfile(res.data.profile);
            }
        })
        .catch(err=>{console.log(err)})
    },[profileId])
    return (
        <View style={styles.mainContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {
                    !isLoading && <View style={styles.holder}>
                    <Image 
                     source={{uri:global.Link+'/images/'+profile.image}}
                     style={styles.dp}
                    />
                    <View>
                        <Text style={styles.name}>{profile.name}</Text>
                        <Text style={styles.about}>{profile.about}</Text>
                    </View>
                </View>
                }
                
            </ScrollView>
        </View>
    )
}

export default PublicProfile
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#d0dce7',
        flex:1,
        paddingHorizontal:5,
        paddingVertical:5,
    },
    dp:{
        width:60,
        height:60,
        borderRadius:15,
        marginRight:10,
    }
    ,holder:{
        backgroundColor:'#f7f7f7',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:15,
        paddingHorizontal:5,
        paddingVertical:25,
        flexDirection:'row'
    }
    ,name:{
        color:'#333333',
        fontSize:17,
        fontWeight:'bold'
    }
    ,about:{
        color:'#333333',
        fontSize:15,
    }
})
