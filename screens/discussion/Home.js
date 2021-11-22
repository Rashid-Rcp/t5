import React,{useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet,StatusBar, ScrollView,TouchableOpacity, ActivityIndicator } from 'react-native'
import Header from '../common/Header';
import Footer from '../common/Footer';
import{Icon} from 'react-native-elements';
import axios from 'axios';

import { UserContext } from '../../context/UserContext';
const Home = ({navigation}) => {

  const[user,setUser] = useContext(UserContext);
  const[participantFilter, setParticipantFilter] = useState(false);
  const[showFilter, setShowFilter] = useState(false);
  const[discussions, setDiscussions] = useState([]);
  const[isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if(user.loaded && user.id !== '0'){
      if(!participantFilter){
        axios.get(global.APILink+'/discussion/user_follow/all/'+user.id)
        .then(res=>{
          setIsLoading(false);
          if(res.data.status === 'success'){
            setDiscussions(res.data.discussions)
          }
        })
        .catch(err=>{console.log(err)})
     }
     else{
      axios.get(global.APILink+'/discussion/user_follow/participant/'+user.id)
      .then(res=>{
        setIsLoading(false);
        if(res.data.status === 'success'){
          setDiscussions(res.data.discussions)
        }
      })
      .catch(err=>{console.log(err)})
     }
    }
    else{
      console.log('no user');
      //show suggestion with most popular
    }
   
  }, [participantFilter,user])

  const handleScroll = ()=>{

  }

  const handleParticipatingFilter = ()=>{
    setParticipantFilter(!participantFilter);
    setShowFilter(false);
  }
 
    return (
        <View style={styles.mainContainer}>
            <StatusBar />
            <Header navigation={navigation}/>
            <View style={styles.container}>
            <View style={styles.filter}>
              {
                showFilter &&  <View style={styles.filterLink}>
                  <TouchableOpacity onPress={handleParticipatingFilter}>
                    <Text style={styles.filterText}>{participantFilter?'Show all discussions':'Show participating discussions only'}</Text>
                  </TouchableOpacity>
              </View>
              }
              <Icon onPress={()=>setShowFilter(!showFilter)} name="filter" type="fontisto" color={participantFilter?'#444':'#496076'} size={30} />
            </View>
            {
              isLoading && <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <ActivityIndicator size='small' color='#496076' />
              </View>
            }
            {
              !isLoading && <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  onScroll={event=>{handleScroll(event)}}>
              {
                discussions.map((discussion, index)=>{
                  return(
                  <View key={discussion.id} style={styles.contentItem}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('DiscussionDetails',{discussionId:discussion.id})}}>
                      <Text style={styles.itemTitle}>{discussion.topic}</Text>
                      {
                       discussion.participant !== 0 &&
                        <View style={styles.participant}><Text style={{color:"#405f74",fontSize:13}}>Participant</Text></View>
                      }
                      <View style={styles.itemMeta}>
                        <Text style={styles.metaText}>{discussion.time}</Text>
                        <Text style={styles.metaText}>@{discussion.club}</Text>
                        <View style={[styles.metaStatus,{borderColor:discussion.status==='open'?'#a2c074':'#ccc'}]}><Text  style={[{color:discussion.status==='open'?'#5b841b':'#333333'},{textTransform:'capitalize',fontSize:13}]}>{discussion.status}</Text></View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  )
                })
              }
          </ScrollView>
            }
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    t5Font: {
       
    },
    mainContainer:{
        flex: 1,
    },
    container:{
        flex:1,
        backgroundColor:'#d0dce7',
        paddingHorizontal:5,
        paddingTop:5,
    },
    participant:{
      backgroundColor:"#f7f7f7",
      borderRadius:15,
      paddingHorizontal:7,
      paddingVertical:3,
      marginHorizontal:3,
      marginBottom:0,
      marginTop:10,
      alignSelf:'flex-start',
      borderWidth:1,
      borderColor:"#789db6",
    },
    contentItem:{
        backgroundColor:'#f7f7f7',
        borderRadius:20,
        padding:10,
        marginVertical:5,
      },
      itemTitle:{
        fontSize:17,
        color:'#333333'
      },
      itemMeta:{
        justifyContent:'space-between',
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
      },
      metaText:{
        color:'#333333',
        fontSize:13,
      },
      metaStatus:{
        paddingVertical:2,
        paddingHorizontal:10,
        borderRadius:20,
        borderWidth:1,
      },
      filter:{
        position:'absolute',
        zIndex:999,
        right:5,
        top:5,
        flexDirection:'row'
      },
      filterLink:{
        backgroundColor:'#c8d7e1',
        borderRadius:20,
        padding:10,
      },
      filterText:{
        color:'#2e4453',
      }
});

export default Home
