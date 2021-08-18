import React,{useState, useContext} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,TouchableHighlight } from 'react-native'
import { ActiveTypeContext } from './ActiveTypeContext';

const BottomSheetHeader = () => {
    const[active, setActive] =useContext(ActiveTypeContext);
    const handleOnPress = (type)=>{
        setActive(type);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleHolder} onPress={()=>{handleOnPress('votes')}}>
                <Text style={[styles.title,styles.titleLeft,active==='votes'?styles.active:'']}>Votes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleHolder} onPress={()=>{handleOnPress('comments')}}>
                <Text style={[styles.title,styles.titleRight,active==='comments'?styles.active:'']}>Comments</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       height:60,
       flexDirection:'row',
    },
    titleHolder:{
        flex:1,
    },
    title: {
        paddingVertical:15,
        fontSize:18,
        color:'#333333',
        backgroundColor:"#ccc",
        flex:1,
        textAlign:'center',
        borderColor:'#fff',
        borderWidth:1,
        borderBottomWidth:0,
        
    },
    titleLeft:{
        borderTopLeftRadius:20,
    },
    titleRight:{
    borderTopRightRadius:20,
    },
    active:{
        backgroundColor:"#f7f7f7",
    }

});

export default BottomSheetHeader
