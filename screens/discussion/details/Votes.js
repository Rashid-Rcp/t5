import React from 'react'
import { View, Text, StyleSheet,Image,TouchableHighlight } from 'react-native'

const Votes = () => {
    return (
        <View style={styles.container}>
            
            <View style={styles.voteItem}>
                <View style={styles.participantHolder}>
                    <Image
                        style={styles.participantDP}
                        source={{
                        uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                        }}
                    />
                    <View style={styles.voteHolder}>
                        <View style={styles.percentageContainer}>
                            <Text style={[styles.percentage,{width:'60%'}]}>60%</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.name}>@anna</Text>
            </View>
            <View style={styles.voteItem}>
                <View style={styles.participantHolder}>
                    <Image
                        style={styles.participantDP}
                        source={{
                        uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                        }}
                    />
                    <View style={styles.voteHolder}>
                        <View style={styles.percentageContainer}>
                            <Text style={[styles.percentage,{width:'50%'}]}>50%</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.name}>@anna</Text>
            </View>
            <View style={styles.voteItem}>
                <View style={styles.participantHolder}>
                    <Image
                        style={styles.participantDP}
                        source={{
                        uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                        }}
                    />
                    <View style={styles.voteHolder}>
                        <View style={styles.percentageContainer}>
                            <Text style={[styles.percentage,{width:'20%'}]}>20%</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.name}>@anna</Text>
            </View>
            <View style={styles.voteItem}>
                <View style={styles.participantHolder}>
                    <Image
                        style={styles.participantDP}
                        source={{
                        uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                        }}
                    />
                    <View style={styles.voteHolder}>
                        <View style={styles.percentageContainer}>
                            <Text style={[styles.percentage,{width:'20%'}]}>20%</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.name}>@anna</Text>
            </View>
            <View style={styles.voteItem}>
                <View style={styles.participantHolder}>
                    <Image
                        style={styles.participantDP}
                        source={{
                        uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                        }}
                    />
                    <View style={styles.voteHolder}>
                        <View style={styles.percentageContainer}>
                            <Text style={[styles.percentage,{width:'20%'}]}>20%</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.name}>@anna</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
 container:{
    backgroundColor:'#f7f7f7',
    padding:10,
    marginHorizontal:1,
    marginVertical:10,
    
 },
 voteItem:{
     marginBottom:15,
 },
 participantHolder:{
     flexDirection:'row',
     alignItems:'center',
 },
 participantDP:{
     width:60,
     height:60,
     borderRadius:15,
 },
 voteHolder:{
     flex:1,
 },
 percentageContainer:{
     backgroundColor:'#ebebeb',
     height:40,
     borderRadius:20,
     marginLeft:5,
     padding:2,
 },
 percentage:{
     backgroundColor:'#82ca9c',
     color:'#fff',
     height:'100%',
     borderColor:'#fff',
     borderWidth:1,
     borderRadius:20,
     textAlign:'right',
     lineHeight:35,
     paddingRight:10,
 },
 name:{
     marginTop:2,
     color:'#333333',
     fontSize:13
 }


});
export default Votes
