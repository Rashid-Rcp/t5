import React,{useState, useEffect} from 'react';
import { View, Text, ScrollView, RefreshControl,StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ClubMembers = ({navigation, route}) => {
    const [isloading, setIsLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const {clubId} = route.params;
    const [refreshing, setRefreshing] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(()=>{
        if (refreshing){
            axios.get(global.APILink + '/club/memberlist/' + clubId)
            .then(res=>{
                if (res.data.status === 'success'){
                    setIsLoading(false);
                    setRefreshing(false);
                    setMembers(res.data.members.data);
                    setNextPageUrl(res.data.members.next_page_url);
                }
            })
            .catch(err=>{console.log(err);});
        }
    },[refreshing]);

    useEffect(()=>{
        if (nextPageUrl && isLoadingMore){
            axios.get(nextPageUrl)
            .then(res=>{
               let memberData = [...members,...res.data.members.data];
               setMembers(memberData);
               setNextPageUrl(res.data.members.next_page_url);
               setIsLoadingMore(false);
            })
            .catch(err=>{
                console.log(err);
            });
        }
    },[isLoadingMore]);

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
        setRefreshing(true);
    };
    return (
        <View style={styles.container}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
          onScroll={({nativeEvent})=>{handleScroll(nativeEvent)}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          >
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
                                    <Text style={styles.metaText}>{member.name}</Text>
                                    <Text style={styles.metaText}>{member.role}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    })
                }
                {
                    isLoadingMore && <View style={styles.space}>
                        <ActivityIndicator size={'small'} color={"#496076"} />
                    </View>
                }
            </View>
          </ScrollView>
        </View>
    );
};

export default ClubMembers;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#d0dce7',
        paddingHorizontal:10,
        paddingVertical:10,
    },
    memberItem:{
        flexDirection:'row',
        marginBottom:10,
        backgroundColor:'#f7f7f7',
        paddingHorizontal:7,
        paddingVertical:7,
        borderRadius:15,
    },
    userDp:{
        width:50,
        height:50,
        borderRadius:15,
    },
    metaText:{
        color:'#333333',
        fontSize:15,
    },
    space:{
        marginTop:20,
        marginBottom:20,
    }

});
