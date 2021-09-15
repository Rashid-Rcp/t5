import React from 'react'
import { View, Text, StyleSheet,StatusBar, ScrollView,TouchableOpacity } from 'react-native'
import Header from '../common/Header';
import {Icon} from 'react-native-elements'
import ClubForm from '../common/club/ClubForm';
import ClubMembers from '../common/club/ClubMembers';
const HomeCreator = () => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar />
            <Header />
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator ={false}>
                {/* <ClubForm/> */}
                <ClubMembers/>
                {/* <View style={styles.topicHolder}>
                    <Text style={styles.topicTitle}>
                        here is the title of the topic and some ideas about it and what it is
                    </Text>
                    <View style={styles.topicMetaHolder}>
                        <View style={styles.topicStatus}>
                                <Text style={styles.metaText}>Open</Text>
                        </View> 
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>100 Messages</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>200 Votes</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>125 Comments</Text>
                        </View>
                    </View>
                    <View style={styles.topicBottom}>
                        <Text style={styles.topicTime}>5 hrs ago</Text>
                        <TouchableOpacity style={styles.manageButton}>
                            <Text style={styles.manageButtonText}>Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.topicHolder}>
                    <Text style={styles.topicTitle}>
                        here is the title of the topic and some ideas about it and what it is
                    </Text>
                    <View style={styles.topicMetaHolder}>
                        <View style={styles.topicStatus}>
                                <Text style={styles.metaText}>Open</Text>
                        </View> 
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>100 Messages</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>200 Votes</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>125 Comments</Text>
                        </View>
                    </View>
                    <View style={styles.topicBottom}>
                        <Text style={styles.topicTime}>5 hrs ago</Text>
                        <TouchableOpacity style={styles.manageButton}>
                            <Text style={styles.manageButtonText}>Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.topicHolder}>
                    <Text style={styles.topicTitle}>
                        here is the title of the topic and some ideas about it and what it is
                    </Text>
                    <View style={styles.topicMetaHolder}>
                        <View style={styles.topicStatus}>
                                <Text style={styles.metaText}>Open</Text>
                        </View> 
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>100 Messages</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>200 Votes</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>125 Comments</Text>
                        </View>
                    </View>
                    <View style={styles.topicBottom}>
                        <Text style={styles.topicTime}>5 hrs ago</Text>
                        <TouchableOpacity style={styles.manageButton}>
                            <Text style={styles.manageButtonText}>Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.topicHolder}>
                    <Text style={styles.topicTitle}>
                        here is the title of the topic and some ideas about it and what it is
                    </Text>
                    <View style={styles.topicMetaHolder}>
                        <View style={styles.topicStatus}>
                                <Text style={styles.metaText}>Open</Text>
                        </View> 
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>100 Messages</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>200 Votes</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>125 Comments</Text>
                        </View>
                    </View>
                    <View style={styles.topicBottom}>
                        <Text style={styles.topicTime}>5 hrs ago</Text>
                        <TouchableOpacity style={styles.manageButton}>
                            <Text style={styles.manageButtonText}>Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.topicHolder}>
                    <Text style={styles.topicTitle}>
                        here is the title of the topic and some ideas about it and what it is
                    </Text>
                    <View style={styles.topicMetaHolder}>
                        <View style={styles.topicStatus}>
                                <Text style={styles.metaText}>Open</Text>
                        </View> 
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>100 Messages</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>200 Votes</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>125 Comments</Text>
                        </View>
                    </View>
                    <View style={styles.topicBottom}>
                        <Text style={styles.topicTime}>5 hrs ago</Text>
                        <TouchableOpacity style={styles.manageButton}>
                            <Text style={styles.manageButtonText}>Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.topicHolder}>
                    <Text style={styles.topicTitle}>
                        here is the title of the topic and some ideas about it and what it is
                    </Text>
                    <View style={styles.topicMetaHolder}>
                        <View style={styles.topicStatus}>
                                <Text style={styles.metaText}>Open</Text>
                        </View> 
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>100 Messages</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>200 Votes</Text>
                        </View>
                        <View style={styles.topicMeta}>
                            <Text style={styles.metaText}>125 Comments</Text>
                        </View>
                    </View>
                    <View style={styles.topicBottom}>
                        <Text style={styles.topicTime}>5 hrs ago</Text>
                        <TouchableOpacity style={styles.manageButton}>
                            <Text style={styles.manageButtonText}>Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}

                <View style={{height:100}}></View>
                
            </ScrollView>
            <View style={styles.addNew}>
                <Icon type='ionicon' name='ios-add-circle-sharp' size={50} color={'#496076'}/>
            </View>
                
        </View>
    )
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
        fontSize:18,
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
      
    }
});
