import React,{useEffect, useState} from 'react'
import { View, Text,StyleSheet,StatusBar,ScrollView,Image ,TouchableOpacity, ActivityIndicator, RefreshControl} from 'react-native';
import {Button} from 'react-native-elements';
import Header from '../../../screens/common/Header';
import VoicePlayer from '../../common/voicePlayer/VoicePlayer';
import axios from 'axios';

const Manage = ({route,navigation}) => {

    const {discussion} = route.params;
    const [discussionData, setDiscussionData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    useEffect(()=>{
        if (refresh){
            axios.get(global.APILink + '/discussion/manage/' + discussion)
            .then(res=>{
                if (res.data.status === 'success'){
                    setDiscussionData(res.data.data);
                    setIsLoading(false);
                    setRefresh(false);
                }
            })
            .catch(err=>{console.log(err); setIsLoading(false);});
        }
    },[discussion, refresh]);

    const onRefresh = ()=>{
        setRefresh(true);
    };
    
    return (
        <View style={styles.mainContainer}>
            <StatusBar />
            <Header navigation={navigation}/>
            {
            isLoading && <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="small" color="#496076" />
            </View>
            }
            {
            !isLoading && <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={onRefresh}
                />}
            >
            <View style={[styles.holder,{marginTop:15}]}> 
                <Text style={styles.club}>
                    @{discussionData[0].club}
                </Text>
                <Text style={styles.topic}>
                    {discussionData[0].topic}
                </Text>
                <View>
                    <VoicePlayer soundUrl={global.Link+'/voice/club/'+discussionData[0].description_audio} duration={discussionData[0].audio_duration} />
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.creator}>by {discussionData[0].creator}</Text>
                    <Text style={styles.date}>{discussionData[0].date}</Text>
                </View>
                </View>
                <View style={styles.holder}>
                <Text style={styles.participants}>Participants</Text>
                <View style={styles.participantsHolder}>
                    {
                        discussionData[0].participants_data.map((participant, index)=>{
                            return (
                                <View key={index} style={styles.participantItem}>
                                <Image
                                source={{uri:global.Link+'/images/'+participant.image}}
                                style={styles.participantsDP}
                                />
                                <Text>{participant.name.length>5?participant.name.substring(0, 5)+'...':participant.name}</Text>
                            </View>
                            )
                        })
                    }
                </View>
                </View>
                {
                discussionData[0].vote === 'true' &&
                <View style={styles.holder}>
                    <Text style={styles.votes}>{discussionData[0].total_votes} Votes</Text>
                    <View style={styles.voteHolder}>
                        {
                            discussionData[0].votes.map((participant,index)=>{
                                let id = Object.keys(participant)[0];
                                if(!participant[id][0]){
                                    return (<View key={index}></View>);
                                }
                                let total_votes = discussionData[0].total_votes;
                                let percentage = parseInt((100 * participant[id][0]['votes']) / total_votes);
                                
                                return(
                                    <View key={index} style={styles.voteItem}>
                                        <View style={styles.memberHolder}>
                                            <Image
                                                style={styles.memberDP}
                                                source={{
                                                uri: global.Link+'/images/'+participant[id][0]['image'],
                                                }}
                                            />
                                            <View style={styles.percentageHolder}>
                                                <View style={styles.percentageContainer}>
                                                    <Text style={[styles.percentage,{width:percentage+'%'}]}>{percentage}%</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.name}>{participant[id][0]['name']}</Text>
                                    </View>
                                )
                            })
                        }
                        
                    </View>
                </View>
                }

                <View style={styles.holder}>
                <Text style={styles.comment}>{discussionData[0].total_comments} Comments</Text>
                {
                    discussionData[0].comments.map((comment, index)=>{
                        return (
                        <View key={index} style={styles.commentHolder}>
                            <Image style={styles.memberDP}
                            source={{
                                    uri: global.Link+'/images/'+comment.user_image,
                            }} />
                            <View style={styles.textHoler}>
                                <Text style={styles.name}>{comment.user_name}</Text>
                                <Text style={styles.memberComment}>{comment.comment}</Text>
                            </View>
                        </View>
                        );
                    })
                }
                <TouchableOpacity onPress={()=>{navigation.navigate('CreatorAllComments',{discussionId:discussion})}}>
                    <Text style={styles.allComments}>View all comments</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.buttonHolder}>
                <Button title="Remove"
                buttonStyle={{backgroundColor:'#FF6666',borderRadius:50,width:100}} />
                <Button title="Close"
                buttonStyle={{backgroundColor:'#496076',borderRadius:50,width:150}}
                />
                </View>
            </ScrollView>
        }
        </View>
    )
}

export default Manage

const styles= StyleSheet.create({
    comment:{
        fontSize:17,
        color:"#333333",
        marginBottom:20,
    },
    buttonHolder:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30,
        marginBottom:40,
        paddingHorizontal:15,
    },
    allComments:{
        alignSelf:'flex-end',
        color:'#496076',
        fontSize:17,
        marginTop:10,
    },
    commentHolder:{
        flexDirection:'row',
        marginVertical:5,
    },
    textHoler: {
        paddingHorizontal:10,
        marginRight:35,
    },
    memberComment:{
      color:'#333333'
    },
    mainContainer:{
        backgroundColor:'#d0dce7',
        flex:1,
    },
    holder:{
        paddingHorizontal:10,
        paddingVertical:20,
        marginVertical:3,
        marginHorizontal:5,
        backgroundColor:"#f7f7f7",
        borderRadius:10,
        borderWidth:1,
        borderColor:'#fff'
    },
    club:{
        fontSize:20,
        color:'#333333',
        textAlign:'center',
        marginBottom:20,
    },
    topic:{
        fontSize:16,
        color:"#333333",
        marginBottom:20,
    },
    date:{
        color:"#333333",
        fontSize:13,
    },
    creator:{
        color:"#333333",
        fontSize:13,
    },
    participants:{
        fontSize:18,
        color:'#333333',
    },
    participantsDP:{
        width:50,
        height:50,
        borderRadius:10,
        resizeMode:'contain'
    },
    participantsHolder:{
        flexDirection:'row',
        marginTop:20,
    },
    participantItem:{
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center'
    },
   votes:{
    fontSize:18,
    color:'#333333',
   
   },
   memberHolder:{
       flexDirection:'row',
       alignItems:'center'
   },
   memberDP:{
        width:50,
        height:50,
        borderRadius:10,
        resizeMode:'contain'
   },
   percentageHolder:{
    flex:1,
   },
   percentageContainer:{
    backgroundColor:'#ebebeb',
    height:40,
    borderRadius:20,
    marginLeft:5,
    padding:2,
},
percentage:{
    backgroundColor:'#82ca9c',
    color:'#fff',
    height:'100%',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:20,
    textAlign:'right',
    lineHeight:35,
    paddingRight:10,
},
voteHolder:{
    marginTop:20,
},
voteItem:{
    marginBottom:10,
},
name:{
    color:'#333333'
}

});