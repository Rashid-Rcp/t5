/* eslint-disable prettier/prettier */
import React,{useContext} from 'react';
import {View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import { UserContext } from '../../context/UserContext';
import * as SecureStore from 'expo-secure-store';

const Header = ({navigation}) => {
  const[user, setUser] = useContext(UserContext);
  const handleDiscussionLongPress = async()=>{
    let userData = {...user};
    if(userData.discussionMode === 'normal'){
      userData.discussionMode = 'creator';
      userData.activeTab='discussionCreator';
      await SecureStore.setItemAsync('t5_discussion_mode', 'creator');
      await SecureStore.setItemAsync('t5_active_tab', 'discussionCreator');
      setUser(userData);
      navigation.navigate('DiscussionCreator');
    }
    else{
      userData.discussionMode = 'normal';
      userData.activeTab='discussionNormal';
      await SecureStore.setItemAsync('t5_discussion_mode', 'normal');
      await SecureStore.setItemAsync('t5_active_tab', 'discussionNormal');

      setUser(userData);
      navigation.navigate('Discussion');
    }
  }

  const handleDiscussionPress =()=>{
    let userData = {...user};
    if(userData.discussionMode === 'normal'){
      userData.activeTab='discussionNormal';
      setUser(userData);
      navigation.navigate('Discussion');
    }
    else{
      userData.activeTab='discussionCreator';
      setUser(userData);
      navigation.navigate('DiscussionCreator');
    }
  }
  
  return (
    <View style={styles.headerContainer}>
      <View style={[styles.iconHolder,user.activeTab==='discussionNormal'?{backgroundColor:'#f7f7f7'}:'#A9F2FB']}>
        <TouchableOpacity onLongPress={handleDiscussionLongPress} onPress={handleDiscussionPress}>
        <Image
          style={styles.headerIcon}
          source={require('../../assets/images/discussion-icon-t5.png')}
        />
        </TouchableOpacity>
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
      backgroundColor:'#A9F2FB',
    }

});

export default Header;
