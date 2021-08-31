/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={[styles.iconHolder,styles.selected]}>
        <Image
          style={styles.headerIcon}
          source={require('../../assets/images/discussion-icon-t5.png')}
        />
      </View>
     
      <View style={styles.iconHolder}>
        <Image
          style={styles.headerIcon}
          source={require('../../assets/images/podcast-icon-t5.png')}
        />
      </View>
      <View style={styles.iconHolder}>
        <Image
          style={styles.headerIcon}
          source={require('../../assets/images/advice-icon-t5.png')}
        />
      </View>
      <View style={styles.DPHolder}>
        <Image
          style={styles.headerDP}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    t5Font :{
        fontFamily:'roboto_regular',
        fontSize:18,
        paddingVertical:10,
        color:'#c1f1dc',
    },
    headerContainer:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#496076',
        paddingHorizontal:10,
        paddingVertical:7,
    },
    headerIcon:{
      width:30,
      height:30,
      resizeMode:'contain',
    },
    iconHolder:{
      backgroundColor:'#c1f1dc',
      borderRadius:100,
      width:40,
      height:40,
      justifyContent:'center',
      alignItems:'center',
      
    },
    headerDP:{
      width:33,
      height:33,
      resizeMode:'contain',
      borderRadius:100,
    },
    DPHolder:{
      backgroundColor:'#c1f1dc',
      borderRadius:100,
      width:35,
      height:35,
      justifyContent:'center',
      alignItems:'center',
      
    },
    selected:{
      backgroundColor:'#f7f7f7',
    }

});

export default Header;
