import React,{useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet,Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';

const Votes = ({discussionId, socketChanel}) => {
    const[user, setUser] = useContext(UserContext);
    const[participants, setParticipants] = useState([]);
    const[totalVotes, setTotalVotes] = useState(0);
    const[isLoading, setIsLoading] = useState(true);
    const[voteFor, setVoteFor] = useState(0);
    const[socketData, setSocketData] = useState({});
    
    const discussionChannel = socketChanel;
    useEffect(()=>{
        discussionChannel.bind('discussion.votes', function (data) {
            if(Number( data.discussion) === Number(discussionId)){
                setParticipants(data.participants);
                setTotalVotes(data.votes);
            }
        });
    
    },[]);

    useEffect(()=>{
        axios.get(global.APILink+'/discussion/votes/'+discussionId+'/'+user.id)
        .then(res=>{
            //console.log(res.data);
            if(res.data.status === 'success'){
                setParticipants(res.data.participants);
                setTotalVotes(res.data.total_votes);
                setVoteFor(res.data.vote_for??0);
                setIsLoading(false);
            }
        })
        .catch(err=>{console.log(err)})
    },[]);

    const postVote = (participantId)=>{
        setVoteFor({"participant_id": participantId})
       axios.post(global.APILink+'/discussion/vote',
       {discussionId:discussionId,participantId:participantId,userId:user.id})
       .then(res=>{
          // console.log(res.data);
       })
       .catch(err=>{console.log(err)})
    }
    return (
        <>
        {
            isLoading && <View style={{flex:1,justifyContent:'center',alignItems:'center',height:100}}>
            <ActivityIndicator size="small" color="#496076" />
        </View>
        }
        {
            !isLoading && <View style={styles.container}>
            {
                participants.map((participant ,index)=>{
                    let percentage = parseInt( (participant.votes / totalVotes ) * 100);
                    let isVoted = false;
                    if(voteFor){
                        isVoted = participant.id === voteFor.participant_id?true:false;
                    }

                    return (
                        <View key={index} style={styles.voteItem}>
                            <View style={styles.participantHolder}>
                                <Image
                                    style={styles.participantDP}
                                    source={{
                                    uri: global.Link+'/images/'+participant.image,
                                    }}
                                />
                              
                                <View style={styles.voteHolder}>
                                <TouchableOpacity onPress={()=>postVote(participant.id)}>
                                    <View style={[styles.percentageContainer,{backgroundColor:isVoted?'#c1f1dc':'#ebebeb'}]}>
                                        <Text style={[styles.percentage,{width:percentage+'%'}]}>{percentage}%</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                            <Text style={styles.name}>{participant.name}</Text>
                        </View>
                    )
                })
            }
        </View>
        }
        
        </>
    )
}

const styles = StyleSheet.create({
 container:{
    backgroundColor:'#f7f7f7',
    padding:10,
    marginHorizontal:1,
    marginVertical:10,
    
 },
 voteItem:{
     marginBottom:15,
 },
 participantHolder:{
     flexDirection:'row',
     alignItems:'center',
 },
 participantDP:{
     width:60,
     height:60,
     borderRadius:15,
 },
 voteHolder:{
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
 name:{
     marginTop:2,
     color:'#333333',
     fontSize:13
 }


});
export default Votes
