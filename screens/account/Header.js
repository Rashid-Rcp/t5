import React,{useContext} from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';

const Header = ({navigation, userData}) => {
    const [user, setUser ] = useContext(UserContext);
       const navigationHandler = ()=>{
        if (user.activeTab === 'discussionCreator'){
            navigation.navigate('DiscussionCreator');
        }
        else {
            navigation.navigate('Discussion');
        }
    };
    return (
        <View style={styles.container}>
           <TouchableOpacity onPress={navigationHandler} style={{flexDirection:'row'}} >
            <Icon
                name='ios-chevron-back-outline'
                type='ionicon'
                color='#c1f1dc'
                />
                {
                    userData && <Text style={styles.accountName}>{userData.name}</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#496076',
        paddingLeft:1,
        paddingRight:10,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:55,
    },
    accountName:{
        color:'#c1f1dc',
        fontSize:20,
        fontWeight:'700',
        paddingBottom:5,
    }
})

export default Header
