import React,{useContext,useEffect,useState,useRef} from 'react'
import { View, Text,Image,StyleSheet,StatusBar,ActivityIndicator, ScrollView,Keyboard,TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import {Icon, Input, CheckBox, Button} from 'react-native-elements';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { Audio } from 'expo-av';
import Header from '../../common/Header';
import VoicePlayer from '../../common/voicePlayer/VoicePlayer';
const AddNew = ({navigation}) => {
    const[user, setUser] = useContext(UserContext);
    const[addNewTopic, setAddNewTopic] = useState(true);
    const[topicClub, setTopicClub] = useState('');
    const[topicTitle, setTopicTitle] = useState('');
    const[topicTags, setTopicTags] = useState('');
    const[topicVoice, setTopicVoice] = useState('');//uri
    const[recording, setRecording] = useState();//obj
    const[voiceRecording, setVoiceRecording] = useState(false);
    const[clubMembersLoading, setClubMembersLoading] = useState(false);
    const[clubMembers, setClubMembers] = useState([]);
    const[clubMembersError, setClubMembersError] = useState('');
    const[enableVote, setEnableVote] = useState(false);
    const[enableComment, setEnableComment] = useState(false);
    const[userClubs, setUserClubs] = useState([]);
    const allowedTime = 600;//10m
    const[recordingTime, setRecordingTime] = useState({m:0,s:0,ts:0});
    const[voiceDuration, setVoiceDuration] = useState(0);
    const interval = useRef(null);
    const[validation, setValidation] = useState({
        'club':'',
        'title':'',
        'title_length':'',
        'voice':'',
        'participants':''
    });
    const[isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(()=>{
        axios.get(global.APILink+'/user_clubs/'+user.id)
        .then(res=>{
            if(res.data.status==='success'){
                setUserClubs(res.data.clubs);
            }else{
                setUserClubs([]);
            }
        })
        .catch(err=>{console.log(err);})
    },[user])

    useEffect(()=>{
        if(topicClub){
            setClubMembersLoading(true);
            setClubMembers([]);
            setClubMembersError('');
            axios.get(global.APILink+'/club/members/'+topicClub)
            .then(res=>{
                setClubMembersLoading(false);
                if(res.data.status === 'success'){
                     setClubMembers(res.data.members);
                 }
                 else if(res.data.status === 'no_members'){
                    setClubMembersError(topicClub+ " doesn't have enough participants for a discussion");
                 }
            })
            .catch(err=>{console.log(err);setClubMembersLoading(false);});
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

      async function recordVoice() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 

          console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
         );
          setRecording(recording);
          console.log('Recording started');
          //const status =  recording.getStatusAsync();
          setVoiceRecording(true);
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }

      useEffect(()=>{
          if(voiceRecording){
            let time = {...recordingTime};
             interval.current = setInterval(() => {
                if(time.ts<=allowedTime){
                    time.ts +=1;
                    let minutes = Math.floor(time.ts / 60);
                    let seconds = time.ts % 60;
                    time.m = minutes;
                    time.s =seconds;
                    setRecordingTime(prevTime=>({m:minutes,s:seconds,ts:prevTime.ts+1}));
                }
                else{
                    clearInterval(interval.current);
                    stopRecording();
                }
              
              }, 1000);
          }
      },[voiceRecording])

      async function stopRecording() {
        clearInterval(interval.current);
        console.log('Stopping recording..');
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        setTopicVoice(uri);
        console.log('Recording stopped and stored at', uri);
        recording.getStatusAsync()
        .then(function(result) {
          console.log(result.durationMillis)
          let seconds = Math.floor(result.durationMillis / 1000);
          console.log(seconds);
          setVoiceDuration(seconds);

        })
        .catch(err=>console.log(err));

        setRecording(undefined);
        setVoiceRecording(false);
        let RT = {...recordingTime};
        RT.m=0;
        RT.s=0;
        RT.ts=0;
        setRecordingTime(RT);
      }

      const handleCreateDiscussion =()=>{
          let validationData = {...validation};
          validationData.club = topicClub === ''?'Select a club':'';
          validationData.title = topicTitle === ''?'Add topic of the discussion':'';
          validationData.title_length= (topicTitle !== '' && topicTitle.length >250) ?'Maximum 250 characters allowed':'';
          validationData.voice = topicVoice === ''?'Add a voice description of the topic':'';
          let selectedParticipants = [];
          clubMembers.forEach(member=>{
           if(member.selected){
              selectedParticipants.push(member.id);
           }
          })
          validationData.participants = (selectedParticipants.length<2 || selectedParticipants.length>5)?'A minimum of 2 and maximum of 5 participants required':'';
          setValidation(validationData);
          if(!validationData.club && !validationData.title && !validationData.title_length&& !validationData.voice && !validationData.participants){
            let formData = new FormData();
            let uriParts = topicVoice.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('topic_voice', {
                uri:topicVoice,
                name: `topic_voice.${fileType}`,
                type: `audio/${fileType}`,
            });
            formData.append('user',user.id);
            formData.append('club',topicClub);
            formData.append('title',topicTitle);
            formData.append('participants',JSON.stringify(selectedParticipants));
            formData.append('vote',enableVote);
            formData.append('comment',enableComment);
            formData.append('tags',topicTags);
            formData.append('duration',voiceDuration);
            setIsSubmitting(true);
            axios.post(global.APILink+'/discussion/create',formData)
            .then(res=>{
               // setIsSubmitting(false);
               // console.log(res.data)
                if(res.data.status === 'success'){
                    navigation.navigate('ManageDiscussion',{discussion:res.data.id})
                }
            })
            .catch(err=>{console.log(err);setIsSubmitting(false);})
          }
        
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
                    data={userClubs}
                    defaultButtonText='Select a club'
                    buttonStyle={{backgroundColor:'#f7f7f7'}}
                    buttonTextStyle={{color:'#333333',fontSize:17,}}
                    dropdownStyle={{backgroundColor:'#f7f7f7',borderRadius:15}}
                    rowTextStyle={{color:'#333333'}}
                    onSelect={(selectedItem, index) => {
                        setTopicClub(selectedItem);
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
            {
                validation.club !== '' &&  <Text style={{color:'red'}}>{validation.club}</Text>
            }
           
            <View>
                <Input
                    placeholder='Topic of the discussion'
                    errorMessage= {validation.title}
                    onChangeText={text => setTopicTitle(text)}
                    />
            </View>
            <View style={styles.voiceHolder}>
                {
                    voiceRecording && topicVoice === '' &&
                    <View style={styles.recordingHolder}>
                        <Icon type="feather" name="stop-circle" size={60} color="#f4ca16"
                        containerStyle={[{backgroundColor:'#f7f7f7',width:59,height:59,borderRadius:100,},styles.shadow]}
                        iconStyle={{marginTop:-1}}
                       onPress={stopRecording} />
                       <View style={styles.timerHolder}>
                           <Text style={styles.time}>{recordingTime.m}</Text>
                           <Text style={styles.separator}>:</Text>
                           <Text style={styles.time}>{recordingTime.s}</Text>
                       </View>
                       <Text style={{fontSize:12,color:"#333333",marginTop:5,}}>Recording time is limited to 10 minutes</Text>
                    </View>
                }
                {
                    !voiceRecording && topicVoice === '' &&
                    <>
                    <Icon type="ionicon" name="ios-mic-circle-sharp"
                     color="#496076" size={60}
                     containerStyle={[{backgroundColor:'#f7f7f7',width:55,height:55,borderRadius:100,},styles.shadow]}
                     iconStyle={{marginTop:-5}}
                    onPress={recordVoice} />
                    <Text style={[styles.textColor,{marginTop:10,}]}>Add Voice</Text>
                    </>
                }
                {
                    topicVoice !== '' && <>
                    <Icon type="ionicon" name="ios-remove-circle-sharp" size={60} color="#FF6666"
                        containerStyle={[{backgroundColor:'#f7f7f7',width:55,height:55,borderRadius:100,},styles.shadow]}
                        iconStyle={{marginTop:-5}}
                    onPress={()=>setTopicVoice('')}
                     />
                        <Text style={[styles.textColor,{marginTop:10,}]}>Remove voice</Text>
                    </>
                }
            </View>
            {
                validation.voice !== '' && topicVoice ==='' && <Text style={{color:'red',marginBottom:10}}>{validation.voice}</Text>
            }
            {
                topicVoice !== '' && <View style={styles.voicePlayerHolder}>
                    <VoicePlayer soundUrl={topicVoice} duration={voiceDuration} />
                </View>
            }
            <View style={styles.participantHolder}>
                <Text style={styles.title}>Select participant <Text style={{fontSize:13}}>(in between 2 & 5)</Text></Text>
                <ScrollView style={{height:250,marginTop:10,}} nestedScrollEnabled={true}>
                    {
                        topicClub === '' && 
                        <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingTop:100,}}>
                            <Text>Select a club for viewing participants list</Text>
                        </View>
                    }
                    {
                        clubMembersLoading && 
                        <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingTop:100,}}>
                            <ActivityIndicator size='small' color="#496076" />
                        </View>
                    }
                    {
                        clubMembersError !== '' &&<View style={{flex:1,justifyContent:'center',alignItems:'center', paddingTop:100,}}>
                            <Text style={{color:'red'}}>{clubMembersError}</Text>
                        </View>
                    }
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
                {
                    validation.participants!=='' && <Text style={{color:'red'}}>{validation.participants}</Text>
                }
            </View>
            <View style={styles.voteCommentHolder}>
            <CheckBox
            title='Enable vote'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={enableVote}
            textStyle={{color:'#333333'}}
            containerStyle={{borderColor:'#f7f7f7',backgroundColor:'#f7f7f7'}}
            onPress={()=>setEnableVote(!enableVote)}
            />
            <CheckBox
            title='Enable comment'
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
                onChangeText={(text)=>setTopicTags(text)}
                />
            </View>
            <Button title='Create Discussion' 
            type="outline"
            titleStyle={{color:'#496076'}}
            containerStyle={{borderColor:'#496076',borderWidth:1, borderRadius:10}}
            onPress={handleCreateDiscussion}
            disabled={isSubmitting}
            />
        </View>
     </View>
     </ScrollView>
     {
         isSubmitting && <View style={styles.overly}>
         <ActivityIndicator size='large' color="#f7f7f7" />
            <Text style={{color:'#f7f7f7'}}>Creating Discussion</Text>
        </View>
     }
     
    </View>
    )
}

export default AddNew;

const styles = StyleSheet.create({
    voicePlayerHolder:{
        marginBottom:30,
        marginTop:-30,
    },
    textColor:{
        color:'#333333'
    },
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
        marginBottom:50,
        marginTop:30,
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
    timerHolder:{
        flexDirection:'row',
        marginTop:10,
    },
    time:{
        fontSize:20,
        color:'#525252',
        fontWeight:'bold',
    },
    separator:{
        fontSize:20,
        fontWeight:'bold',
        color:"#333333",
        marginHorizontal:5,
        marginTop:-1,
    },
    recordingHolder:{
        justifyContent:'center',
        alignItems:'center'
    },
    overly:{
        position:'absolute',
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,.5)',
        alignItems:'center',
        justifyContent:'center',

    }

})
