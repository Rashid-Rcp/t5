import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'
const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.clubDPHolder}>
                <Icon
                    name='ios-chevron-back-outline'
                    type='ionicon'
                    color='#c1f1dc'
                    />
                <Image
                    style={styles.clubDP}
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>
            <View style={styles.topicHolder}>
                <Text style={styles.topic}>Here is the title of the topic </Text>
                <View style={styles.topicMetaHolder}>
                    <Text style={styles.topicMeta}>@fundfolio</Text>
                    <Text style={styles.topicMeta}>2hrs ago</Text>
                </View>
            </View>
            <View style={styles.settings}>
                <Icon
                name='dots-three-vertical'
                type='entypo'
                color='#c1f1dc'
                onPress={()=>{}}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#496076',
        paddingLeft:1,
        paddingRight:10,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:55,
    },
    clubDPHolder:{
        flexDirection:'row',
        alignItems:'center',
       marginLeft:-3
    },
    clubDP:{
        width:40,
        height:40,
        borderRadius:100,
        
    },
    settings:{

    },
    topicHolder:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingLeft:10,

    },
    topicMetaHolder:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    topic:{
        color:'#c1f1dc',
        fontSize:17
    },
    topicMeta:{
        color:'#c1f1dc',
        fontSize:13,
        paddingRight:10
    }
})

export default Header
