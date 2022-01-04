import React,{useContext,useEffect,useState} from 'react'
import { View, Text, StyleSheet,StatusBar, ScrollView,TouchableOpacity,ActivityIndicator, RefreshControl } from 'react-native';
import {Icon} from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import Header from '../common/Header';
import LoginForm from '../common/LoginForm';
import axios from 'axios';

const HomeCreator = ({navigation}) => {

    const [user, setUser] = useContext(UserContext);
    const [discussions, setDiscussions] = useState([]);
    const [isLoading, setIsLoading]  = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reload, setReload] = useState(0);
    
    useEffect(()=>{
        if(user.loaded && user.club === false){
            navigation.navigate('CreateClub',{backTo:'DiscussionCreatorHome'});
        }
    },[user]);

    useEffect(()=>{
        if(user.loaded && user.club === true){
            axios.get(global.APILink + '/discussion/user/' + user.id)
            .then(res=>{
                setIsLoading(false);
                setRefreshing(false);
                if(res.data.status === 'success'){
                    setDiscussions(res.data.discussions.data);
                    setNextPageUrl(res.data.discussions.next_page_url);
                }
                else{
                    console.log('error occurred');
                }
            })
            .catch(err=>{console.log(err)})
        }
    },[user, reload]);

    const handleScroll = ({layoutMeasurement, contentOffset, contentSize})=>{
        const paddingToBottom = 20;
        if ( layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom){
          if (nextPageUrl){
            setIsLoadingMore(true);
          }
          }
      };

      const onRefresh = ()=>{
        setReload(reload + 1);
        setRefreshing(true);
      };

      useEffect(()=>{
        if (isLoadingMore && nextPageUrl){
          console.log(nextPageUrl);
          axios.get(nextPageUrl)
          .then(res=>{
            if (res.data.status === 'success'){
              let discussionData = [...discussions,...res.data.discussions.data];
              setDiscussions(discussionData);
              setNextPageUrl(res.data.discussions.next_page_url);
              console.log(res.data.discussions.next_page_url);
              setIsLoadingMore(false);
            }
          })
          .catch(err=>{console.log(err)})
        }
    
      },[isLoadingMore]);



    if(!user.loaded){
        return (<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#d0dce7'}}>
        <Text>Loading...</Text>
        </View>);
    }
    if( user.loaded && user.id==='0'){
      return (
        <View style={styles.mainContainer}>
          <StatusBar />
            <Header navigation={navigation}/>
            <ScrollView showsHorizontalScrollIndicator= {false} showsVerticalScrollIndicator ={false}>
                <LoginForm navigation={navigation}/>
            </ScrollView>
        </View>
      )
    }
    
    if(user.loaded && user.clubId !== '0'){
        return (
        <View style={styles.mainContainer}>
            <StatusBar />
            <Header navigation={navigation}/>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator ={false}
            onScroll={({nativeEvent})=>{handleScroll(nativeEvent)}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            >
                {
                    isLoading && <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:'50%'}}>
                        <ActivityIndicator size='small' color="#496076"/>
                    </View>
                }
                {
                    discussions.map((discussion,index)=>{
                        return(
                            <View key={index} style={styles.topicHolder}>
                                <Text style={styles.topicTitle}>
                                  {discussion.topic}  
                                </Text>
                                <View style={styles.topicMetaHolder}>
                                    <View style={styles.topicStatus}>
                                            <Text style={styles.metaText}>{discussion.status}</Text>
                                    </View>
                                    <View style={styles.topicMeta}>
                                        <Text style={styles.metaText}>{discussion.answers??'0'} Messages</Text>
                                    </View>
                                    {
                                        discussion.vote === 'true' && 
                                        <View style={styles.topicMeta}>
                                            <Text style={styles.metaText}>{discussion.votes??'0'} Votes</Text>
                                        </View>
                                    }
                                    {
                                        discussion.comment === 'true' &&
                                        <View style={styles.topicMeta}>
                                            <Text style={styles.metaText}>{discussion.comments??'0'} Comments</Text>
                                        </View>
                                    }
                                </View>
                                <View style={styles.topicBottom}>
                                    <Text style={styles.topicTime}>{discussion.time}</Text>
                                    <Text style={styles.topicTime}>@{discussion.club}</Text>
                                    <TouchableOpacity style={styles.manageButton} onPress={()=>navigation.navigate('ManageDiscussion',{discussion:discussion.id})}>
                                        <Text style={styles.manageButtonText}>Manage</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
                 {
                     isLoadingMore && <ActivityIndicator style={styles.marginTop} size="small" color="#496076" />
                 }
                <View style={{height:100}}></View>
            </ScrollView>
            <View style={styles.addNew}>
                <View style={{backgroundColor:'#f7f7f7',height:30,width:30,position:'absolute',top:10,right:12}}></View>
                <View>
                    <Icon type='ionicon' name='ios-add-circle-sharp' size={50} color={'#496076'}
                    onPress={()=>navigation.navigate('AddNewDiscussion')}/>
                </View>
                
            </View>
        </View>
    )
    }
    else {
        return (<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#d0dce7'}}>
        <Text>Loading...</Text>
        </View>);
    }
  
}

export default HomeCreator
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#d0dce7',
        flex:1,
    },
    topicHolder:{
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:"#f7f7f7",
        borderRadius:20,
        padding:10,
        marginVertical:5,
        marginHorizontal:5,
    },
    topicTitle:{
        color:"#333333",
        fontSize:17,
        marginTop:10,
        marginBottom:5,
    },
    textColor:{
        color:'#333333'
    },
    topicMeta:{
        backgroundColor:"#7accc8",
        borderRadius:10,
        paddingHorizontal:7,
        paddingVertical:3,
        marginHorizontal:5,
        marginVertical:10,
    },
    topicStatus:{
        backgroundColor:"#82ca9c",
        borderRadius:10,
        paddingHorizontal:7,
        paddingVertical:3,
        marginHorizontal:5,
        marginVertical:10,
    },
    metaText:{
        fontSize:13,
        color:"#333333",
        textTransform:'capitalize'
    },
    topicMetaHolder:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    topicBottom:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        marginBottom:5,
    },
    manageButton:{
        borderWidth:1,
        borderColor:'#496076',
        borderRadius:15,
        paddingHorizontal:10,
        paddingVertical:5,
    },
    manageButtonText:{
        color:'#496076',
    },
    topicTime:{
        color:'#333333'
    },
    addNew:{
        position:'absolute',
        bottom:10,
        right:10,
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    marginTop:{marginTop:20},

});
