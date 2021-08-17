/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.t5Font}> Discussion </Text>
      <Text style={styles.t5Font}> Podcast </Text>
      <Text style={styles.t5Font}> Advices </Text>
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
        paddingVertical:5,
    }
});

export default Header;
