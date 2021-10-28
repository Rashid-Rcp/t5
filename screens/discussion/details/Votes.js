import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet,Image,TouchableHighlight } from 'react-native';
import axios from 'axios';

const Votes = ({discussionId}) => {
    const[participants, setParticipants] = useState([]);
    const[totalVotes, setTotalVotes] = useState(0);
    const[isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        axios.get(global.APILink+'/discussion/participants/'+discussionId)
        .then(res=>{
            //console.log(res.data);
            if(res.data.status === 'success'){
                setParticipants(res.data.participants);
                setTotalVotes(res.data.total_votes);
                setIsLoading(false);
            }
        })
        .catch(err=>{console.log(err)})
    },[])
    return (
        <View style={styles.container}>
            {
                participants.map((participant ,index)=>{
                    let percentage = parseInt( (participant.votes / totalVotes ) * 100);

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
                                    <View style={styles.percentageContainer}>
                                        <Text style={[styles.percentage,{width:percentage+'%'}]}>{percentage}%</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.name}>{participant.name}</Text>
                        </View>
                    )
                })
            }
        </View>
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
