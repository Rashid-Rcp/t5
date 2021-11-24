/* eslint-disable prettier/prettier */
import React,{ useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';
import BottomSheet from './BottomSheet';

const Footer = ({navigation}) => {
 
  const [suggestion, setSuggestion] = useState(false);
  const bottomSheetHandle =()=>{
    setSuggestion(!suggestion);
  }
  return (
    <>
    <View style={styles.footerContainer}>
      <TouchableWithoutFeedback onPress={()=>navigation.navigate('Search')}>
        <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,}}>
          <Icon type="fontisto" name="search" color="#c1f1dc" size={24} onPress={bottomSheetHandle} style={styles.expandIcon}/>
          <Text style={{color:'#c1f1dc',fontSize:17,paddingLeft:10}}>Search a topic</Text>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Icon type="material-community" name="circle-expand" color="#c1f1dc" size={35} onPress={bottomSheetHandle} style={styles.expandIcon}/>
      </View>
    </View>
    {
      suggestion &&<BottomSheet navigation={navigation}/>
    }
    </>
  );
};

const styles = StyleSheet.create({
    leftIconContainerStyle:{
      backgroundColor:'#496076',
    },
    inputContainerStyle:{
      backgroundColor:'#496076',
    },
    inputStyle:{
      color:'#c1f1dc',
    },
    searchIcon:{
      color:'#c1f1dc',
      fontSize:40,
    },
    containerStyle:{
      backgroundColor:'#496076',
      borderTopWidth:0,
      borderBottomWidth:0,
      padding:0,
    },
    expandIcon:{
      paddingRight:10,
    },
    expandIconClose:{
      backgroundColor:'red'
    },
    expandIconCloseHolder:{
     flex:1,
     flexDirection:'row',
     justifyContent:'flex-end',
     paddingRight:10,
     paddingBottom:5,
    },
    footerContainer:{
      backgroundColor:'#496076',
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      position:'relative',
      zIndex:2,
      paddingVertical:7,

    }
});

export default Footer;
