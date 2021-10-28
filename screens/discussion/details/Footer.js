import React,{useState, useContext,useEffect} from 'react'
import { View, Text,StyleSheet,TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import BottomSheet from './BottomSheet'
import { ActiveTypeContext } from './ActiveTypeContext';
import Pusher from 'pusher-js';
import pusherConfig from '../../common/pusher.json';
const Footer = ({vote,comment,votes,comments, discussionId}) => {

    const[active, setActive] = useContext(ActiveTypeContext);
    const [showBS, setShowBS] = useState(false);
    const [commentText, onChangeCommentText] = useState("");
    const [postIcon,setPostIcon] = useState(true);
   
    useEffect(() => {
            if(commentText ===''){
                setPostIcon(false);
            }else{
                setPostIcon(true);
            }
    },[commentText]);
    const postComment =()=>{
        onChangeCommentText('');
    }
    return (
        <>
        {
            showBS &&  <BottomSheet discussionId={discussionId} />
        }
        {
            active==='comments' && showBS?
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                onChangeText={text => onChangeCommentText(text)}
                value={commentText}
                placeholder="Post a comment"
                placeholderTextColor="#c1f1dc"
                />
                {
                    postIcon ? <Icon type="ionicon" name="ios-send-sharp" color="#c1f1dc" size={35} onPress={postComment} style={styles.expandIcon}/>
                    : <Icon type="material-community" name="circle-expand" color="#c1f1dc" size={35} onPress={()=>{setShowBS(!showBS)}} style={styles.expandIcon}/>
                }
                
            </View>
            :
            <View style={styles.container}>
                {
                    vote && <Text style={styles.footerText}>{votes??'0'} {votes>1?'Votes':'Vote'}</Text>
                } 
                {
                    comment && <Text style={styles.footerText}>{comments??'0'} {comment>1?'Comments':'Comment'}</Text>
                }
                <View style={{flex:vote&&comment?0:1,flexDirection:'row',justifyContent:'flex-end'}}>
                    <Icon type="material-community" name="circle-expand" color="#c1f1dc" size={35} onPress={()=>{setShowBS(!showBS)}} style={styles.expandIcon}/>
                </View>
            </View>
        }
       
        </>
    )
}
const styles= StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#496076',
        paddingVertical:5,
        paddingHorizontal:10,
        height:55,
    },
    expandIcon:{
        paddingRight:10,
      },
      footerText:{
          color:'#c1f1dc',
          fontSize:17
      },
      input:{
          color:'#c1f1dc',
      }
});
export default Footer
