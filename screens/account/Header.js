import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'
const Header = () => {
    return (
        <View style={styles.container}>
            <Icon
                name='ios-chevron-back-outline'
                type='ionicon'
                color='#c1f1dc'
                />
                <Text style={styles.accountName}>@Anna</Text>
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
    accountName:{
        color:'#c1f1dc',
        fontSize:20,
        fontWeight:'700',
        paddingBottom:5,
    }
})

export default Header
