import React,{useEffect,useState} from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
const Header = ({discussion,navigation}) => {

   const[discussionDetails, setDiscussionDetails] = useState([{topic:'----------------',dp:'',club:'---------',time:'----'}]);
   useEffect(()=>{
       if(discussion.length>0){
           setDiscussionDetails(discussion)
       }
   },[discussion])

   let topic  =  discussionDetails[0].topic.length<30?discussionDetails[0].topic: discussionDetails[0].topic.slice(0, 30)+'...'; 
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
             <View style={styles.clubDPHolder}>
                <Icon
                    name='ios-chevron-back-outline'
                    type='ionicon'
                    color='#c1f1dc'
                    />
                <Image
                    style={styles.clubDP}
                    source={{
                    uri: global.Link+'/images/club/'+discussionDetails[0].dp,
                    }}
                />
            </View>
            </TouchableOpacity>
            <View style={styles.topicHolder}>
                <Text style={styles.topic}>{topic}</Text>
                <View style={styles.topicMetaHolder}>
                    <Text style={styles.topicMeta}>@{discussionDetails[0].club}</Text>
                    <Text style={styles.topicMeta}>{discussionDetails[0].time}</Text>
                </View>
            </View> 
            <View style={styles.settings}>
                <Icon
                name='dots-three-vertical'
                type='entypo'
                color='#c1f1dc'
                onPress={()=>{}}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#496076',
        paddingLeft:1,
        paddingRight:10,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:55,
    },
    clubDPHolder:{
        flexDirection:'row',
        alignItems:'center',
       marginLeft:-3
    },
    clubDP:{
        width:40,
        height:40,
        borderRadius:100,
        
    },
    settings:{

    },
    topicHolder:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingLeft:10,

    },
    topicMetaHolder:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    topic:{
        color:'#c1f1dc',
        fontSize:17
    },
    topicMeta:{
        color:'#c1f1dc',
        fontSize:13,
        paddingRight:10
    }
})

export default Header
