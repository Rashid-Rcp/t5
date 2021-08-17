/* eslint-disable prettier/prettier */
import React,{ useState, useRef, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import { SearchBar, Icon} from 'react-native-elements';
import BottomSheet from './BottomSheet';

const Footer = () => {
 
  const [search,setSearch] = useState(''); 
  const updateSearch = (search)=>{ setSearch(search) }
  const [suggestion, setSuggestion] = useState(false);

  return (
    <>
    <View style={styles.footerContainer}>
      <View style={{flex:1}}>
        <SearchBar
          placeholder="Search a topic"
          value={search}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          placeholderTextColor ="#c1f1dc"
          searchIcon = {<Icon type="antdesign" name="search1" color="#c1f1dc" size={25}/>}
          onChangeText={updateSearch}
        />
      </View>
      <View>
      <Icon type="material-community" name="circle-expand" color="#c1f1dc" size={35} onPress={()=>setSuggestion(!suggestion)} style={styles.expandIcon}/>
      </View>
    </View>
    {
      suggestion && <BottomSheet/>
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
      justifyContent:"flex-start",
      flexDirection:'row',
      alignItems:'center',
      position:'relative'
    }
});

export default Footer;
