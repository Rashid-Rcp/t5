import React,{useContext,useEffect,useState} from 'react'
import { View, Text,Image, StyleSheet,StatusBar, ScrollView,Keyboard,TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import {Icon, Input, CheckBox, Button} from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown'
import Header from '../common/Header';
const AddNew = ({navigation}) => {

    const[addNewTopic, setAddNewTopic] = useState(true);
    const[topicClub, setTopicClub] = useState('2');
    const[topicTitle, setTopicTitle] = useState('');
    const[topicVoice, setTopicVoice] = useState('');
    const[clubMembersLoaded, setClubMembersLoaded] = useState(false);
    const[clubMembers, setClubMembers] = useState([]);
    const[clubMembersError, setClubMembersError] = useState('');
    const[enableVote, setEnableVote] = useState(false);
    const[enableComment, setEnableComment] = useState(false);
    const countries = ["Egypt", "Canada", "Australia", "Ireland"];
    useEffect(()=>{
        if(topicClub){
            axios.get(global.APILink+'/club/members/'+topicClub)
            .then(res=>{
                setClubMembersLoaded(true);
                if(res.data.status === 'success'){
                    setClubMembersError('');
                    setClubMembers(res.data.members);
                }
                else if(res.data.status === 'no_members'){
                    setClubMembersError('At least 2 participants required');
                    setClubMembers([]);
                }
            })
            .catch(err=>console.log(err));
        }
    },[topicClub])

    const handleSelectMembers = (contact)=>{
        let UC = [...clubMembers];
        UC.map((item,index)=>{
          if(item.phone === contact){
              if(item.selected){
                  UC[index].selected = false;
              }else{
                  UC[index].selected = true;
              }
          }
        });
        setClubMembers(UC);
      }

    return (
    <View style={styles.mainContainer}>
        <StatusBar />
        <Header navigation={navigation}/>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container} >
        <View style={styles.addNewHolder}>
            <Text style={styles.addNewTitle}>Add New Discussion</Text>
            <View style={styles.clubHolder}>
                <Image 
                style={{width:40,height:40,resizeMode:'contain'}}
                source={{uri:global.Link+'/images/T5/t5-club-icon.png'}}
                />
                <SelectDropdown
                    data={countries}
                    defaultButtonText='Select a club'
                    buttonStyle={{backgroundColor:'#f7f7f7'}}
                    buttonTextStyle={{color:'#333333',fontSize:17,}}
                    dropdownStyle={{backgroundColor:'#f7f7f7',borderRadius:15}}
                    rowTextStyle={{color:'#333333'}}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
            </View>
            <View>
                <Input
                    placeholder='Topic of the discussion'
                    errorMessage=''
                    />
            </View>
            <View style={styles.voiceHolder}>
                    <Icon type="ionicon" name="ios-mic-circle-sharp" color="#496076" size={50} />
                    <Text style={[styles.textColor]}>Add Voice</Text>
            </View>
            <View style={styles.participantHolder}>
                <Text style={styles.title}>Select participant <Text style={{fontSize:13}}>(in between 2 & 5)</Text></Text>
                <ScrollView style={{height:250,marginTop:10,}} nestedScrollEnabled={true}>
                    {  clubMembers.map((member,index)=>{
                        return(
                        <TouchableOpacity key={index} onPress={()=>handleSelectMembers(member.phone)}>
                        <View  style={styles.contactItemHolder}>
                            <Image
                            source={{ uri: global.Link+'/images/'+member.image }}
                            style={styles.contactDP}
                            />
                            <View style={styles.contactMeta}>
                                <Text style={styles.metaText}>{member.name}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={[{marginRight:10,},styles.metaText]}>{member.phone}</Text>
                                    {
                                    member.selected && 
                                        <Icon
                                        type="ionicon"
                                        name="checkmark-circle"
                                        size={20}
                                        color="#496076"
                                        iconStyle={{padding:0,backgroundColor:'#f7f7f7'}}
                                        />
                                    }
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                        )
                    })
                    }
                </ScrollView>
            </View>
            <View style={styles.voteCommentHolder}>
            <CheckBox
            title='Enable votes'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={enableVote}
            textStyle={{color:'#333333'}}
            containerStyle={{borderColor:'#f7f7f7',backgroundColor:'#f7f7f7'}}
            onPress={()=>setEnableVote(!enableVote)}
            />
            <CheckBox
            title='Enable comments'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={enableComment}
            textStyle={{color:'#333333'}}
            containerStyle={{borderColor:'#f7f7f7',backgroundColor:'#f7f7f7'}}
            onPress={()=>setEnableComment(!enableComment)}
            />
            </View>
            <View style={styles.tagHolder}>
                <Input placeholder='Add tags(optional), separate by comma. '
                    multiline={true} numberOfLines = {3} 
                textAlignVertical='top'
                />
            </View>
            <Button title='Create Discussion' 
            type="outline"
            titleStyle={{color:'#496076'}}
            containerStyle={{borderColor:'#496076',borderWidth:1, borderRadius:10}}
            />
        </View>
     </View>
     </ScrollView>
    </View>
    )
}

export default AddNew;

const styles = StyleSheet.create({
    mainContainer:{
     backgroundColor:'#d0dce7',
     flex:1,
    },
    container:{
        paddingVertical:20,
        paddingHorizontal:10,
    },
    addNewHolder:{
        backgroundColor:'#f7f7f7',
        paddingTop:20,
        paddingHorizontal:10,
        paddingBottom:50,
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:15,
        
    },
    addNewTitle:{
        textAlign:'center',
        fontSize:17,
        fontWeight:'bold',
        marginBottom:20,
        color:'#333333',
    },
    clubHolder:{
        flexDirection:'row',
        marginBottom:20,
        alignItems:'center'
    },
    topicClub:{
        fontSize:17,
        marginRight:10,
        color:'#333333',
    },
    voiceHolder:{
        alignItems:'center',
        marginBottom:30,
    },
    contactDP:{
        width:45,
        height:45,
        borderRadius:15,
    },
    contactItemHolder:{
        flexDirection:'row',
        marginVertical:8,
    },
    contactMeta:{
        paddingLeft:10,
        color:'#333333'
    },
    title:{
        fontSize:17,
        color:'#333333',

    },
    voteCommentHolder:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:20,
    },
    tagHolder:{
        marginTop:20,
    }
})
