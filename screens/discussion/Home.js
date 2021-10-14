import React,{useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet,StatusBar, ScrollView,TouchableOpacity } from 'react-native'
import Header from '../common/Header';
import Footer from '../common/Footer';
import{Icon} from 'react-native-elements';
import axios from 'axios';

import { UserContext } from '../../context/UserContext';
const Home = ({navigation}) => {

  const [user,setUser] = useContext(UserContext);
  const[participantFilter, setParticipantFilter] = useState(false);
  const[showFilter, setShowFilter] = useState(false);

  useEffect(() => {
   if(!participantFilter){
      axios.get(global.APILink+'/discussion/user_follow/all')
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{console.log(err)})
   }
   else{
    axios.get(global.APILink+'/discussion/user_follow/participant')
    .then(res=>{
      console.log(res.data);
    })
    .catch(err=>{console.log(err)})

   }
  }, [participantFilter])

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
                    <Text style={styles.filterText}>{participantFilter?'Show all discussions':'show participating discussions only'}</Text>
                  </TouchableOpacity>
              </View>
              }
              <Icon onPress={()=>setShowFilter(!showFilter)} name="filter" type="fontisto" color={participantFilter?'#7accc8':'#496076'} size={30} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  onScroll={event=>{handleScroll(event)}}>
              
             <View style={styles.contentItem}>
               <TouchableOpacity onPress={()=>{navigation.navigate('DiscussionDetails')}}>
                <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
                <View style={styles.participant}><Text style={styles.metaText}>Participant</Text></View>
                <View style={styles.itemMeta}>
                  <Text style={styles.metaText}>10 hrs ago</Text>
                  <Text style={styles.metaText}>@startup_health</Text>
                  <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
          </ScrollView>
            </View>
            <Footer />
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
      backgroundColor:"#7accc8",
      borderRadius:10,
      paddingHorizontal:7,
      paddingVertical:3,
      marginHorizontal:3,
      marginBottom:0,
      marginTop:10,
      alignSelf:'flex-start'
    },
    contentItem:{
        backgroundColor:'#f7f7f7',
        borderRadius:20,
        padding:10,
        marginVertical:5,
      },
      itemTitle:{
        fontSize:18,
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
      },
      metaStatus:{
        backgroundColor:'#a3d39c',
        paddingVertical:1,
        paddingHorizontal:8,
        borderRadius:20
      },
      filter:{
        position:'absolute',
        zIndex:999,
        right:5,
        top:5,
        flexDirection:'row'
      },
      filterLink:{
        backgroundColor:'#7accc8',
        borderRadius:20,
        padding:10,
      },
      filterText:{
        color:'#333333',
      }
});

export default Home
