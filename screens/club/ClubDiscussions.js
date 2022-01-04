import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet,StatusBar, ScrollView,TouchableOpacity, ActivityIndicator,RefreshControl,Image } from 'react-native'

import { Icon } from 'react-native-elements';
import axios from 'axios';

const ClubDiscussions = ({navigation, route}) => {
  const {clubId} = route.params;
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(0);

  const handleScroll = ({layoutMeasurement, contentOffset, contentSize})=>{
    const paddingToBottom = 20;
    if ( layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom){
      if (nextPageUrl){
        setIsLoadingMore(true);
      }
      }
  };

  useEffect(()=>{
    axios.get(global.APILink + '/club/discussions/' + clubId)
    .then(res=>{
      // console.log(res.data);
      if (res.data.status === 'success'){
        setIsLoading(false);
        setRefreshing(false);
        setDiscussions(res.data.discussions.data);
        setNextPageUrl(res.data.discussions.next_page_url);
      }
    }).
    catch(err=>{console.log(err);});
  },[reload]);


  useEffect(()=>{
    if (isLoadingMore && nextPageUrl){
      //console.log(nextPageUrl);
      axios.get(nextPageUrl)
      .then(res=>{
        if (res.data.status === 'success'){
          let discussionData = [...discussions,...res.data.discussions.data];
          setDiscussions(discussionData);
          setNextPageUrl(res.data.discussions.next_page_url);
          setIsLoadingMore(false);
        }
      })
      .catch(err=>{console.log(err)})
    }

  },[isLoadingMore]);

  const onRefresh = ()=>{
    setReload(reload + 1);
    setRefreshing(true);
  };

    return (
        <View style={styles.mainContainer}>
            <StatusBar />
            <View style={styles.container}>
            {
             !refreshing && isLoading && <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size="small" color="#496076" />
              </View>
            }
            {
             (refreshing || !isLoading) && <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                onScroll={({nativeEvent})=>{handleScroll(nativeEvent)}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                >
                  <>
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
              {
                isLoadingMore &&  <View style={{alignItems:'center',marginBottom:20,marginTop:10,}}>
                <ActivityIndicator size='small' color='#496076' />
            </View>
              }
              </>
          </ScrollView>
            }
            </View>
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
        color:'#333333',
      },
      itemMeta:{
        justifyContent:'space-between',
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
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
        flexDirection:'row',
      },
      filterLink:{
        backgroundColor:'#c8d7e1',
        borderRadius:20,
        padding:10,
      },
      filterText:{
        color:'#2e4453',
      },
      filter_icon:{
        width:30,
        height:30,
      },
});

export default ClubDiscussions;
