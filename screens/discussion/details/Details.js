import React,{useState, useContext, useEffect, useCallback} from 'react'
import { View, Text,StatusBar,StyleSheet,TouchableHighlight,Image } from 'react-native'
import Header from '../../common/type2/Header'
import Footer from './Footer'
import ActiveTypeContextProvider from './ActiveTypeContext';
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../../../context/UserContext';
import { Input } from 'react-native-elements';
import axios from 'axios';

const Details = ({route}) => {

    const[user, SetUser] = useContext(UserContext);
    const[isLoading, setIsLoading] = useState(true);
    const[answerVoice, setAnswerVoice] = useState('');
    const[answerText, setAnswerText] = useState('');
    const[answerDuration, setAnswerDuration] = useState('');

    const {discussionId} = route.params;
    const postAnswer = ()=>{
        let formData = new FormData;
        formData.append('discussion_id',discussionId);
        let uriParts = answerVoice.split('.');
        let fileType = uriParts[uriParts.length - 1];
        formData.append('answer_voice', {
            uri:answerVoice,
            name: `answer_voice.${fileType}`,
            type: `audio/${fileType}`,
        });
        formData.append('answer_text',answerText);
        formData.append('answer_duration',answerDuration);
    }
    return (
        <ActiveTypeContextProvider>
            <View style={styles.mainContainer}>
                <StatusBar />
                <Header />
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.cardHolder}>
                        <View style={styles.topSection}>
                            <View style={styles.voiceHolder}>
                                <Image
                                    style={styles.participantDP}
                                    source={{
                                    uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                                    }}
                                />
                                <View style={styles.voice}>
                                    
                                </View>
                                <Icon type="evilicon" name="play" color="#496076" size={45} onPress={()=>{}} style={styles.playIcon}/>
                            </View>
                            <View style={styles.userName}>
                                <Text style={styles.textColor}>@Anna</Text>
                            </View>
                        </View>
                        <View style={styles.textHolder}>
                                <Text style={styles.textColor} >here some text and onther this from the message </Text>
                        </View>
                        <View style={styles.votesHolder}>
                                <Text style={styles.percentage}>60%</Text>
                                <Icon type="evilicon" name="like" color="#333333" size={30} onPress={()=>{}} style={styles.playIcon}/>
                        </View>
                    </View>
                    <View style={styles.cardHolder}>
                        <View style={styles.topSection}>
                            <View style={styles.voiceHolder}>
                                <Image
                                    style={styles.participantDP}
                                    source={{
                                    uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                                    }}
                                />
                                <View style={styles.voice}>
                                    
                                </View>
                                <Icon type="evilicon" name="play" color="#496076" size={45} onPress={()=>{}} style={styles.playIcon}/>
                            </View>
                            <View style={styles.userName}>
                                <Text style={styles.textColor}>@Anna</Text>
                            </View>
                        </View>
                        <View style={styles.textHolder}>
                                <Text style={styles.textColor} >here some text and onther this from the message </Text>
                        </View>
                        <View style={styles.votesHolder}>
                                <Text style={styles.percentage}>60%</Text>
                                <Icon type="evilicon" name="like" color="#333333" size={30} onPress={()=>{}} style={styles.playIcon}/>
                        </View>
                    </View>



                    <View style={styles.cardHolder}>
                        <View style={styles.topSection}>
                            <View style={styles.voiceHolder}>
                                <Image
                                    style={styles.participantDP}
                                    source={{
                                    uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                                    }}
                                />
                                <View style={styles.voice}>
                                    
                                </View>
                                <Icon type="evilicon" name="play" color="#496076" size={45} onPress={()=>{}} style={styles.playIcon}/>
                            </View>
                            <View style={styles.userName}>
                                <Text style={styles.textColor}>@Anna</Text>
                            </View>
                        </View>
                        <View style={styles.textHolder}>
                                <Text style={styles.textColor} >here some text and onther this from the message </Text>
                        </View>
                        <View style={styles.votesHolder}>
                                <Text style={styles.percentage}>60%</Text>
                                <Icon type="evilicon" name="like" color="#333333" size={30} onPress={()=>{}} style={styles.playIcon}/>
                        </View>
                    </View>


                    <View style={styles.cardHolder}>
                        <View style={styles.topSection}>
                            <View style={styles.voiceHolder}>
                                <Image
                                    style={styles.participantDP}
                                    source={{
                                    uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                                    }}
                                />
                                <View style={styles.voice}>
                                    
                                </View>
                                <Icon type="evilicon" name="play" color="#496076" size={45} onPress={()=>{}} style={styles.playIcon}/>
                            </View>
                            <View style={styles.userName}>
                                <Text style={styles.textColor}>@Anna</Text>
                            </View>
                        </View>
                        <View style={styles.textHolder}>
                                <Text style={styles.textColor} >here some text and onther this from the message </Text>
                        </View>
                        <View style={styles.votesHolder}>
                            <Text style={styles.percentage}>60%</Text>
                            <Icon type="evilicon" name="like" color="#333333" size={30} onPress={()=>{}} style={styles.playIcon}/>
                        </View>
                    </View>
                    <View style={{height:100}}></View>
                    </ScrollView>
                </View>
                <View style={styles.answerContainer}>
                    <View>
                    <View>
                        <Text>Recoding your voice</Text>
                    </View>
                    <View>
                        <Text>Highlight some key point (optional)</Text>
                        <Input
                        multiline={true}
                        numberOfLines={5}
                        />
                    </View>
                    </View>
                    
                </View>
                <View style={styles.micHolder}>
                    <Icon type="ionicon" name="mic-circle-sharp" size={60} color={'#496076'} />
                </View>
               
                <Footer />
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
        width:60,
        height:60,
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
        backgroundColor:'red'
    }
});

export default Details
