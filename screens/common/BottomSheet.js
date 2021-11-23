import React,{useState, useEffect, useContext} from 'react'
import { View, Text,StyleSheet,Dimensions,ScrollView, Animated,TouchableOpacity,ActivityIndicator } from 'react-native'
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
const BottomSheet = ({navigation, search}) => {
 
  const[user, setUser] = useContext(UserContext);
  const [expand, setExpand] = useState(false);
  const animation= new Animated.Value(0);
  const[discussions, setDiscussions] = useState([]);
  const[nextPageUrl, setNextPageUrl] = useState(null);
  const[isLoading, setIsLoading] = useState(true);
  const handleScroll = (event)=>{
    let scrolling = event.nativeEvent.contentOffset.y;
    if(scrolling > 100){
      setExpand(true);
    }
  }
  useEffect(()=>{
    if(expand){
      Animated.timing(animation, {
        toValue: Dimensions.get('window').height*.8,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
    else{
      Animated.timing(animation, {
        toValue: Dimensions.get('window').height*.5,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  },[expand]);

  useEffect(()=>{
    return ()=>{
      setDiscussions([]);
      setNextPageUrl(null);
    }
  },[]);

  useEffect(()=>{
    if(search ===''){
      axios.get(global.APILink+'/discussion/suggestion/'+user.id)
      .then(res=>{
        // console.log(res.data.discussions.data);
        if(res.data.status === 'success'){
          setDiscussions(res.data.discussions.data);
          setNextPageUrl(res.data.discussions.next_page_url);
          setIsLoading(false);
        }
      })
      .catch(err=>{console.log(err)})
    }
    else if(search.length > 3 ){
      axios.get(global.APILink+'/discussion/search/'+search)
      .then(res=>{
        //console.log(res.data.discussions.data);
        if(res.data.status === 'success'){
          setDiscussions(res.data.discussions.data);
          setNextPageUrl(res.data.discussions.next_page_url);
          setIsLoading(false);
        }
      })
      .catch(err=>{console.log(err)})
    }
  },[search])

    return (
      <>
        <View style={styles.overlay}></View>
        <Animated.View style={[styles.contentHolder,{height:animation}]} >
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  onScroll={event=>{handleScroll(event)}}>
            {
              isLoading && <View style={{marginTop:50}}>
                <ActivityIndicator size='small' color="#496076" />
              </View>
            }
            {
             search ==='' && discussions.map((discussion, index)=>{
                return(
                  <View key={discussion.id} style={styles.contentItem}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('DiscussionDetails',{discussionId:discussion.id})}} >
                      <Text style={styles.itemTitle}>{discussion.topic}</Text>
                      <View style={styles.itemMeta}>
                        <Text style={styles.metaText}>{discussion.time}</Text>
                        <Text style={styles.metaText}>@{discussion.club}</Text>
                        <View style={styles.metaStatus}><Text  style={styles.metaText}>{discussion.status}</Text></View>
                      </View>
                    </TouchableOpacity>
                </View>
                )
              })
            }
            
            {
              search !== '' && discussions.map((discussion, index)=>{
                return(
                  <View key={discussion.id} style={[styles.contentItem,{borderRadius:12}]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('DiscussionDetails',{discussionId:discussion.id})}} >
                      <Text style={[styles.itemTitle,{fontSize:16}]}>{discussion.topic}</Text>
                    </TouchableOpacity>
                 </View>
                )
              
              })
            }
          </ScrollView>
        </Animated.View>
      </>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 54,
    bottom: 0,
    left: 0,
    right:0,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',height:'85.8%',
  },
  contentHolder: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right:0,
    backgroundColor:'#d0dce7',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    paddingTop:20,
    paddingHorizontal:5,
    borderWidth:1,
    borderColor:'#fff',
    borderBottomWidth:0,
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
  }

});