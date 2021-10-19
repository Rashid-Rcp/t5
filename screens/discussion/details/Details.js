import React,{useState, useContext, useEffect, useRef} from 'react'
import { View, Text,StatusBar,StyleSheet,TouchableHighlight,Image,TouchableWithoutFeedback,Keyboard, ActivityIndicator,BackHandler } from 'react-native'
import Header from '../../common/type2/Header'
import Footer from './Footer'
import ActiveTypeContextProvider from './ActiveTypeContext';
import { Icon, Input, Button } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import { Audio } from 'expo-av';
import VoicePlayer from '../../common/voicePlayer/VoicePlayer';

const Details = ({route,navigation}) => {

    const[user, SetUser] = useContext(UserContext);
    const[isLoading, setIsLoading] = useState(true);
    const[answerVoice, setAnswerVoice] = useState('');
    const[answerText, setAnswerText] = useState('');
    const[answerDuration, setAnswerDuration] = useState('');
    const[showRecordingModal, setShowRecordingModal] = useState(false);
    const[recording, setRecording] = useState(undefined);
    const interval = useRef(null);
    const allowedTime = 600;//10m
    const[recordingTime, setRecordingTime] = useState({m:0,s:0,ts:0});
    const[validation, setValidation] = useState({voiceValidation:'',textValidation:''});
    const[isSubmitting, setIsSubmitting] = useState(false);
    const[discussionDetails, setDiscussionDetails] = useState([]);
    const[discussionAnswers,setDiscussionAnswers] = useState([]);
    const[discussionVotes, setDiscussionVotes] = useState(0);
    const[discussionComments, setDiscussionComments] = useState(0);
    const[vote_discussionEnabled, setVote_discussionEnabled] = useState({vote:false,comment:false})
    const {discussionId} = route.params;
    const audioPath = global.Link+'/voice/club/';

    useEffect(()=>{
        axios.get(global.APILink+'/discussion/details/'+discussionId)
        .then(res=>{
            //console.log(res.data)
            if(res.data.status === 'success'){
                setDiscussionDetails(res.data.discussion);
                let v_c = {vote:res.data.discussion[0].vote,comment:res.data.discussion[0].comment};
                setDiscussionVotes(res.data.discussion[0].votes);
                setDiscussionComments(res.data.discussion[0].comments);
                setVote_discussionEnabled(v_c);
                setDiscussionAnswers(res.data.answers)
                setIsLoading(false);
            }
        })
        .catch(err=>console.log(err))

    },[discussionId])

    const postAnswer = ()=>{
        let VD = {...validation};
        VD.voiceValidation = answerVoice === '' ?'Please record your audio' :'';
        VD.textValidation = answerText.length > 250 ?'Maximum 250 characters allowed' :'';
        setValidation(VD);
        if(VD.voiceValidation === '' && VD.textValidation === ''){
            let formData = new FormData;
            formData.append('discussion_id',discussionId);
            formData.append('user_id',user.id);
            let uriParts = answerVoice.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('answer_voice', {
                uri:answerVoice,
                name: `answer_voice.${fileType}`,
                type: `audio/${fileType}`,
            });
            formData.append('answer_text',answerText);
            formData.append('answer_duration',answerDuration);
            setIsSubmitting(true);
            axios.post(global.APILink+'/discussion/answer',formData)
            .then(res=>{
                console.log(res.data);
                setIsSubmitting(false)
                if(res.data.status === 'success'){
                    closeRecordingModal();
                }
            })
            .catch(err=>{console.log(err);setIsSubmitting(false);})
        }
    }
    const micPressHandler = ()=>{
        setShowRecordingModal(true);
        recordVoice();
    }

    useEffect(()=>{
        if(recording !== undefined){
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
    },[recording])

    async function recordVoice() {
        try {
          //console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 

          //console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
         );
          setRecording(recording);
          //console.log('Recording started');
          //const status =  recording.getStatusAsync();
          //setVoiceRecording(true);
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }
      
      const reRecordVoice =()=>{
        setAnswerVoice('');
        recordVoice();
      }
      async function stopRecording() {
        clearInterval(interval.current);
        //console.log('Stopping recording..');
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        setAnswerVoice(uri);
       // console.log('Recording stopped and stored at', uri);
        recording.getStatusAsync()
        .then(function(result) {
          //console.log(result.durationMillis)
          let seconds = Math.floor(result.durationMillis / 1000);
          //console.log(seconds);
          setAnswerDuration(seconds);

        })
        .catch(err=>console.log(err));

        setRecording(undefined);
       // setVoiceRecording(false);
        let RT = {...recordingTime};
        RT.m=0;
        RT.s=0;
        RT.ts=0;
        setRecordingTime(RT);
      }

    const closeRecordingModal=()=>{
        setAnswerVoice('');
        setAnswerText('');
        setAnswerDuration(0);
        setValidation({voiceValidation:'',textValidation:''});
        setShowRecordingModal(false);
    }

    return (
        <ActiveTypeContextProvider>
            <View style={styles.mainContainer}>
                <StatusBar />
                <Header discussion={discussionDetails} navigation={navigation} />
                <View style={styles.container}>
                    {
                    !isLoading && <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View style={[styles.cardHolder,{}]}>
                            <View style={styles.topSection}>
                                <View style={styles.voiceHolder}>
                                    <Image
                                        style={styles.participantDP}
                                        source={{
                                        uri: global.Link+'/images/'+discussionDetails[0].creator_dp,
                                        }}
                                    />
                                    <View style={{flex:1,marginLeft:20,marginTop:5}}>
                                         <VoicePlayer soundUrl={audioPath+discussionDetails[0].description_audio} duration={discussionDetails[0].audio_duration}  />
                                    </View>
                                </View>
                                <View style={styles.userName}>
                                    <Text style={styles.textColor}>{discussionDetails[0].creator}</Text>
                                </View>
                            </View>
                            <View style={styles.textHolder}>
                                    <Text style={[styles.textColor,{fontSize:16}]} >{discussionDetails[0].topic}</Text>
                            </View>
                        </View>
                         {
                            discussionAnswers.data.map((answer,index)=>{
                                return(
                                <View key={index} style={styles.cardHolder}>
                                    <View style={styles.topSection}>
                                        <View style={styles.voiceHolder}>
                                            <Image
                                                style={styles.participantDP}
                                                source={{
                                                uri: global.Link+'/images/'+answer.participant_dp,
                                                }}
                                            />
                                            <View style={{flex:1,marginLeft:20,marginTop:5}}>
                                                <VoicePlayer soundUrl={audioPath+answer.audio} duration={answer.audio_duration}  />
                                            </View>
                                        </View>
                                        <View style={styles.userName}>
                                            <Text style={styles.textColor}>{answer.participant}</Text>
                                        </View>
                                    </View>
                                        {
                                            answer.text &&
                                            <View style={styles.textHolder}><Text style={[styles.textColor,{fontSize:16}]} >{answer.text}</Text></View>
                                        }
                                    {/* <View style={styles.votesHolder}>
                                            <Text style={styles.percentage}>60%</Text>
                                            <Icon type="evilicon" name="like" color="#333333" size={30} onPress={()=>{}} style={styles.playIcon}/>
                                    </View> */}
                                </View>
                                )
                            })
                        } 
                        
                        <View style={{height:100}}></View>
                    </ScrollView>
                    }
                </View>
                {
                    showRecordingModal && <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                     <View style={styles.answerContainer}>
                         {
                             isSubmitting && <View style={{backgroundColor:'rgba(0,0,0,.1)',position:'absolute',width:'100%',height:'100%',top:0,right:0,left:0, zIndex:99999}}></View>
                         }
                    <View style={styles.answerHolder}>
                        <View style={styles.recordingHolder}>
                            {
                                answerVoice === '' && <>
                                <Icon type="feather" name="stop-circle" size={60} color="#f4ca16"
                            containerStyle={[{backgroundColor:'#f7f7f7',width:59,height:59,borderRadius:100,},styles.shadow]}
                            iconStyle={{marginTop:-1}}
                            onPress={stopRecording}
                            />
                            <View style={styles.timerHolder}>
                                <Text style={styles.time}>{recordingTime.m}</Text>
                                <Text style={styles.separator}>:</Text>
                                <Text style={styles.time}>{recordingTime.s}</Text>
                            </View>
                            <Text style={{fontSize:12,color:"#333333",marginTop:5,}}>Recording time is limited to 10 minutes</Text>
                            </>
                            }
                            {
                            answerVoice !== '' && <>
                            <Icon type="ionicon" name="ios-remove-circle-sharp" size={60} color="#FF6666"
                                containerStyle={[{backgroundColor:'#f7f7f7',width:55,height:55,borderRadius:100,},styles.shadow]}
                                iconStyle={{marginTop:-5}}
                            onPress={reRecordVoice}
                            />
                                <Text style={[styles.textColor,{marginTop:10,}]}>Remove voice</Text>
                            </>
                            }
                            {
                                answerVoice !== '' && <View style={styles.voicePlayerHolder}>
                                    <VoicePlayer soundUrl={answerVoice} duration={answerDuration} />
                                </View>
                            }
                        </View>
                        <View>
                            <Input
                            multiline={true}
                            numberOfLines={3}
                            placeholder="Highlight some key points (optional)"
                            errorMessage={validation.textValidation}
                            onChangeText={text=>setAnswerText(text)}
                            />
                        </View>
                        {
                            answerVoice !== '' && <View style={styles.buttonHolder}>
                            <Button type="outline" title="Cancel" 
                            buttonStyle={{borderColor:'#FF6666',borderWidth:1,borderRadius:15,width:80,}}
                            titleStyle={{color:'#FF6666'}}
                            onPress={closeRecordingModal}
                            disabled={isSubmitting}
                            />
                            {
                                isSubmitting &&<ActivityIndicator size="small" color="#496076" />
                            }
                            {
                                !isSubmitting && <Button type="outline" title="Send" 
                                buttonStyle={{borderColor:'#496076',borderWidth:1,borderRadius:15,width:80,}}
                                titleStyle={{color:'#496076'}} onPress={postAnswer}
                                disabled={isSubmitting}
                               />
                            }
                        </View>
                        }
                        
                    </View>
                </View>
                </TouchableWithoutFeedback>
                }
                <View style={styles.micHolder}>
                    <Icon type="ionicon" name="mic-circle-sharp" size={60} color={'#5cd187'} onPress={micPressHandler}
                    containerStyle={[{backgroundColor:'#f7f7f7',width:55,height:55,borderRadius:100,},styles.shadow]}
                    iconStyle={{marginTop:-4}}
                    />
                </View>
               
                <Footer vote={vote_discussionEnabled.vote} comment={vote_discussionEnabled.comment} votes={discussionVotes} comments={discussionComments} />
            </View>
        </ActiveTypeContextProvider>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    container:{
        flex:1,
        backgroundColor:'#d0dce7',
        paddingHorizontal:5,
        paddingTop:5,
    },
    participantDP:{
        width:50,
        height:50,
        borderRadius:15,
    },
    cardHolder:{
        backgroundColor:'#f7f7f7',
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:5,
        borderColor:'#fff',
        borderWidth:1,
      
    },
    voiceHolder:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    voice:{
        flex:1,
        backgroundColor:'#496076',
        height:10,
        marginHorizontal:10,
        borderRadius:10,
    },
    textHolder:{
        marginVertical:5,
    },
    textColor:{
        color:'#333333'
    },
    smallFont:{
        fontSize:12,
    },
    votesHolder:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    percentage:{
        fontSize:12,
        color:'#333333',
        paddingTop:4,
    },
    micHolder:{
        position:'absolute',
        right:10,
        bottom:70,
    },
    answerContainer:{
        position:'absolute',
        zIndex:999,
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center',
    },
    answerHolder:{
        backgroundColor:"#f7f7f7",
        paddingHorizontal:10,
        paddingVertical:30,
        borderRadius:20,
        borderWidth:1,
        borderColor:"#fff",
        width:'90%',
    },
    recordingHolder:{
        justifyContent:'center',
        alignItems:'center'
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
    buttonHolder:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    voicePlayerHolder:{
        width:'100%',
    },
    userName:{
        paddingLeft:5,
    }
});

export default Details
