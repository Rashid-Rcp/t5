import React,{useEffect, useState, useContext} from 'react';
import { View, Text,Image,StyleSheet ,ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';

const ClubDetails = ({navigation, route}) => {
    const [user, setUser] = useContext(UserContext);
    const {clubId} = route.params;
    const [clubDetails, setClubDetails] = useState([]);
    const [discussion, setDiscussion] = useState([]);
    const [members, setMembers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [reload, setReload] = useState(0);
    const [isMemeber, setIsMember] = useState(false);


    useEffect(()=>{
        axios.get(global.APILink + '/club/' + clubId)
        .then(res=>{
           // console.log(res.data);
            if (res.data.status === 'success'){
                setRefreshing(false);
                setClubDetails(res.data.clubDetails);
                setDiscussion(res.data.latest);
                setMembers(res.data.members.data);
            }
        })
        .catch(err=>{console.log(err);});
    },[reload]);

    useEffect(() =>{
        if (user.loaded && user.id !== '0'){
            axios.post(global.APILink + '/club/is_member',{userId:user.id,clubId:clubId})
            .then(res=>{
                if (res.data.status === 'success'){
                    if (res.data.member === 'yes') {
                        setIsMember(true);
                    }
                    else {
                        setIsMember(false);
                    }
                }
            })
            .catch(err=>{console.log(err);});
        }
    },[user]);

    const leaveClub = ()=>{
        axios.post(global.APILink + '/club/join_action',{userId:user.id,clubId:clubId, action:'leave'})
        .then(res=>{
            console.log(res.data);
            if (res.data.status === 'success'){
                setIsMember(false);
            }
        })
        .catch(err=>{console.log(err);});
    };

    const joinClub = ()=>{
        axios.post(global.APILink + '/club/join_action',{userId:user.id,clubId:clubId, action:'join'})
        .then(res=>{
            console.log(res.data);
            if (res.data.status === 'success'){
                setIsMember(true);
            }
        })
        .catch(err=>{console.log(err);});
    };

    const onRefresh = ()=>{
        setRefreshing(true);
        setReload(reload + 1);
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
                <View style={styles.clubDetails}>
                    <View style={styles.clubDetailsSec1}>
                        <Image
                        source={{uri:global.Link+'/images/club/'+clubDetails.image}}
                        style={styles.clubDp}
                        />
                        <View style={{flex:1}}>
                            <Text style={styles.clubName}>@{clubDetails.name}</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View>
                                    <Text style={styles.clubMembers}>{clubDetails.members} members</Text>
                                    <Text style={styles.clubDiscussion}>{clubDetails.discussions??0} discussions</Text>
                                </View>
                                <View>
                                    {
                                        isMemeber && <TouchableOpacity onPress={leaveClub} style={styles.leaveButton}>
                                        <Text style={styles.joinText}>Leave</Text>
                                    </TouchableOpacity>
                                    }
                                    {
                                        !isMemeber && <TouchableOpacity onPress={joinClub} style={styles.joinButton}>
                                        <Text style={styles.joinText}>Join</Text>
                                    </TouchableOpacity>
                                    }
                                    
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.clubDetailsSec2}>
                        <Text style={{color:'#333333',fontSize:14,}}>{clubDetails.description}</Text>
                    </View>
                </View>
                {
                    discussion &&  <View style={styles.discussionHolder}>
                    <View style={styles.discussionHeader}>
                        <Text style={styles.discussionTitle}>{clubDetails.discussions} Discussions</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('ClubDiscussions',{clubId:clubId});}}>
                        <Icon type="feather" name="external-link" size={25} color="#496076" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.discussion}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('DiscussionDetails',{discussionId:discussion.id});}}>
                            <Text style={styles.itemTitle}>{discussion.topic}</Text>
                            <View style={styles.itemMeta}>
                                <Text style={styles.metaText}>{discussion.time}</Text>
                                 <View style={[styles.metaStatus,{borderColor:discussion.status==='open'?'#a2c074':'#ccc'}]}><Text  style={[{color:discussion.status==='open'?'#5b841b':'#333333'},{textTransform:'capitalize',fontSize:13}]}>{discussion.status}</Text></View>
                            </View>
                        </TouchableOpacity>
                  </View>
                </View>
                }
               
                <View style={styles.memberHolder}>
                    <View style={styles.memberHeader}>
                        <Text style={styles.memberHeaderText}>{clubDetails.members} members</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('ClubMembers',{clubId:clubId});}}>
                         <Icon type="feather" name="external-link" size={25} color="#496076" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.memberList}>
                        {
                            members.map((member, index)=>{
                                return (
                                <View key={index} style={styles.memberItem}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('PublicProfile',{profileId:member.id})} style={{flexDirection:'row'}}>
                                        <Image 
                                            source={{uri:global.Link+'/images/'+member.image}}
                                            style={styles.userDp}
                                        /> 
                                        <View style={{marginLeft:10}}>
                                            <Text style={[styles.metaText,{fontSize:15}]}>{member.name}</Text>
                                            <Text style={styles.metaText}>{member.role}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ClubDetails
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#d0dce7',
        paddingVertical:5,
        paddingHorizontal:5,
        display:'flex',
        flex:1,
    },
    joinButton:{
        backgroundColor:'#496076',
        marginRight:10,
        borderRadius:15,
        paddingHorizontal:10,
        paddingVertical:5,
    },
    leaveButton:{
        backgroundColor:'#cf352e',
        marginRight:10,
        borderRadius:15,
        paddingHorizontal:10,
        paddingVertical:5,
    },
    joinText:{
        color:'#f7f7f7'
    },
    clubDp:{
        width:70,
        height:70,
        borderRadius:20,
        resizeMode:'contain'
    },
    userDp:{
        width:40,
        height:40,
        borderRadius:15,
    },
    clubDetails:{
        backgroundColor:'#f7f7f7',
        borderRadius:10,
        paddingHorizontal:5,
        paddingVertical:5,
        borderWidth:1,
        borderColor:'#fff',
        marginTop:5,
        marginBottom:10,
    },
    clubDetailsSec1:{
        flexDirection:'row',
    },
    clubDetailsSec2:{
        marginVertical:10,
    },
    clubName:{
        color:'#333333',
        fontSize:16,
        paddingLeft:10,
        marginVertical:5,
    },
    clubMembers:{
        color:'#333333',
        fontSize:12,
        paddingLeft:10,
        marginVertical:1,
    },
    clubDiscussion:{
        color:'#333333',
        fontSize:12,
        paddingLeft:10,
        marginVertical:1,
    },
    discussionHolder:{
        backgroundColor:'#f7f7f7',
        paddingHorizontal:10,
        paddingTop:10,
        paddingBottom:15,
        borderRadius:10,
    },
    discussionHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15,
    },
    discussionTitle:{
        fontSize:16,
        color:'#333333'
    },
    itemTitle:{
        fontSize:15,
        color:'#333333',
        marginBottom:10,
    },
    itemMeta:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    metaText:{
        color:'#333333',
        fontSize:13
    },
    metaStatus:{
        fontSize:13,
    },
    memberHolder:{
        backgroundColor:'#f7f7f7',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#fff',
        paddingHorizontal:5,
        paddingVertical:5,
        marginTop:10,
    },
    memberHeader:{
        marginTop:10,
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    memberHeaderText:{
    color:'#333333',
    fontSize:16,
    }
    ,memberItem:{
        flexDirection:'row',
        marginBottom:10,
    }


});