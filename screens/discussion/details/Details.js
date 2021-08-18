import React,{useState} from 'react'
import { View, Text,StatusBar,StyleSheet,TouchableHighlight } from 'react-native'
import Header from '../../common/type2/Header'
import Footer from './Footer'
import ActiveTypeContextProvider from './ActiveTypeContext';

const Details = () => {

    return (
        <ActiveTypeContextProvider>
            <View style={styles.mainContainer}>
                <StatusBar />
                <Header />
                <View style={styles.container}>

                </View>
                <Footer />
            </View>
        </ActiveTypeContextProvider>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    container:{
        flex:1,
        backgroundColor:'#d0dce7',
        paddingHorizontal:5,
        paddingTop:5,
    },
});

export default Details
