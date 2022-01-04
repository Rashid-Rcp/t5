import React,{useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity} from 'react-native'
import axios from 'axios';
import { SearchBar} from 'react-native-elements';
const Search = ({navigation}) => {
    const[text, setText] = useState('');
    const[discussions, setDiscussions] = useState([]);
    const[clubs, setClubs] = useState([]);
    const[nextPageUrl, setNextPageUrl] = useState(null);
    const[isSearching, setIsSearching] = useState(true);
    const inputRef = useRef();
    useEffect(()=>{
        inputRef.current.focus();
    })
    useEffect(()=>{
        if(text.length >3){
            setIsSearching(true);
            if(text[0]==='@'){
                setDiscussions([]);
                axios.get(global.APILink+'/club/search/'+text)
                .then(res=>{
                  if(res.data.status === 'success'){
                    setClubs(res.data.clubs);
                   setIsSearching(false);
                  }
                })
                .catch(err=>{console.log(err)})
              }
              else{
                setClubs([]);
                axios.get(global.APILink+'/discussion/search/'+text)
                .then(res=>{
                  //console.log(res.data.discussions.data);
                  if(res.data.status === 'success'){
                    setDiscussions(res.data.discussions.data);
                    setNextPageUrl(res.data.discussions.next_page_url);
                    setIsSearching(false);
                  }
                })
                .catch(err=>{console.log(err)})
              }
        }
        
    },[text])

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                 <SearchBar
                    placeholder="Search a topic or club"
                    onChangeText={(text)=>{setText(text)}}
                    value={text}
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={{backgroundColor:'#f7f7f7'}}
                    ref={inputRef}
                />
                <View style={styles.resultHolder}>
                    {
                        discussions.map((discussion, index)=>{
                            return(
                            <View key={discussion.id} style={styles.result}>
                                <TouchableOpacity onPress={()=>{navigation.navigate('DiscussionDetails',{discussionId:discussion.id})}} >
                                  <Text style={styles.topic}>{discussion.topic}</Text>
                                </TouchableOpacity>
                             </View>
                            )
                        })
                    }
                    {
                        clubs.map((club, index)=>{
                            return(
                            <View key={club.id} style={styles.result}>
                                <TouchableOpacity onPress={()=>{navigation.navigate('ClubDetails',{clubId:club.id})}} >
                                  <Text style={styles.topic}>@{club.name}</Text>
                                </TouchableOpacity>
                             </View>
                            )

                        })
                    }
                    {
                        !isSearching && discussions.length === 0 && clubs.length === 0 && <View>
                            <Text style={{color:'#333333',textAlign:'center'}}>No result found</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"#d0dce7",
        flex:1,
       
    },
    resultHolder:{
        paddingHorizontal:10,
        marginTop:10,
    },
    result:{
        backgroundColor:'#f7f7f7',
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:10,
        marginBottom:10,
    },
    topic:{
        color:"#333333",
        fontSize:15,
    },
    searchContainer:{
        backgroundColor:'#d0dce7',
        borderBottomWidth:0,
        borderTopWidth:0,
    }
});
