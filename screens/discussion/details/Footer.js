import React,{useState, useContext,useEffect} from 'react'
import { View, Text,StyleSheet,TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import BottomSheet from './BottomSheet'
import { ActiveTypeContext } from './ActiveTypeContext';
const Footer = () => {

    const[active, setActive] = useContext(ActiveTypeContext);
    const [showBS, setShowBS] = useState(false);
    const [comment, onChangeComment] = useState("");
    const [postIcon,setPostIcon] = useState(true);
    useEffect(() => {
            if(comment ===''){
                setPostIcon(false);
            }else{
                setPostIcon(true);
            }
    },[comment]);
    const postComment =()=>{
        onChangeComment('');
    }
    return (
        <>
        {
            showBS &&  <BottomSheet />
        }
        {
            active==='comments' && showBS?
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                onChangeText={text => onChangeComment(text)}
                value={comment}
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
                <Text style={styles.footerText}>101 Votes</Text>
                <Text style={styles.footerText}>100 Comments</Text>
                <Icon type="material-community" name="circle-expand" color="#c1f1dc" size={35} onPress={()=>{setShowBS(!showBS)}} style={styles.expandIcon}/>
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
