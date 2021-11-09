import React,{useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const ClubList = ({navigation, route}) => {
    const[clubList, setClubList] = useState([]);
    const[user, setUser] = useContext(UserContext);
    const[nextPage, setNextPage] = useState(null);
    const {type} = route.params;

    useEffect(()=>{
        axios.get(global.APILink+'/club/list/'+type+'/'+user.id)
        .then(res=>{
            //console.log(res.data);
            if(res.data.status === 'success'){
                setClubList(res.data.clubs.data);
                setNextPage(res.data.clubs.next_page_url);
            }
        })
        .catch(err=>{console.log(err)})
    },[])
    
    return (
        <View style={styles.container}>
            <View style={styles.holder}>
                {
                    clubList.map((club, index)=>{
                        return(
                        <TouchableOpacity  key={index} onPress={()=>navigation.navigate('ClubDetails',{clubId:club.id})}>
                        <View style={styles.clubItem}>
                            <Image 
                                source={{uri:global.Link+'/images/club/'+club.image}}
                                style={styles.clubDP}
                            />
                            <View>
                                <Text style={styles.clubName}>@{club.name}</Text>
                                <Text style={styles.clubMembers}>{club.members} Members</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default ClubList;
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#d0dce7',
        flex:1,
        paddingHorizontal:5,
        paddingVertical:5,
    },
    holder:{
        backgroundColor:'#f7f7f7',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:5,
        paddingVertical:5,
    },
    clubDP:{
        width:50,
        height:50,
        borderRadius:10,
        marginRight:10,
    },
    clubItem:{
        flexDirection:'row',
        marginBottom:15,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingBottom:7,
    },
    clubName:{
        fontSize:17,
        color:'#333333'
    },
    clubMembers:{
        fontSize:13,
        color:'#333333'
    }


});
