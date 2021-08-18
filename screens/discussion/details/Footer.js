import React,{useState} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import BottomSheet from './BottomSheet'
const Footer = () => {

    const [showBS, setShowBS] = useState(false);
    return (
        <>
        {
            showBS &&  <BottomSheet />
        }
       
        <View style={styles.container}>
            <Text style={styles.footerText}>100 Votes</Text>
            <Text style={styles.footerText}>100 Comments</Text>
            <Icon type="material-community" name="circle-expand" color="#c1f1dc" size={35} onPress={()=>{setShowBS(!showBS)}} style={styles.expandIcon}/>
        </View>
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
      }
});
export default Footer
