import React,{useState} from 'react'
import { View, Text,StatusBar,StyleSheet,TouchableHighlight,Image } from 'react-native'
import Header from '../../common/type2/Header'
import Footer from './Footer'
import ActiveTypeContextProvider from './ActiveTypeContext';
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

const Details = () => {
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
    }
});

export default Details
