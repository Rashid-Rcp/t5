import React from 'react'
import { View, Text,StyleSheet,ScrollView } from 'react-native'
import Header from './Header'
import Profile from './Profile'
import ClubOwn from './ClubOwn'
import ClubAdmin from './ClubAdmin'
import ClubFollow from './ClubFollow'

const Account = () => {
    return (
        <View style={styles.container}>
           <Header/>
           <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <Profile/>
            <ClubOwn/>
            <ClubAdmin/>
            <ClubFollow/>
           </ScrollView>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#d0dce7',
        flex:1,
    }
})
