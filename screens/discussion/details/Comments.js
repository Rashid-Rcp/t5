import React from 'react'
import { View, Text,StyleSheet,ScrollView,Image } from 'react-native'

const Comments = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.commentHolder}>
                    <Image style={styles.userPic}
                    source={{
                            uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                    }} />
                    <View style={styles.textHoler}>
                    <Text style={styles.userName}>@Anna</Text>
                    <Text style={styles.comment}>the comment</Text>
                    </View>
                   
                </View>
                <View style={styles.commentHolder}>
                    <Image style={styles.userPic}
                    source={{
                            uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                    }} />
                    <View style={styles.textHoler}>
                    <Text style={styles.userName}>@Anna</Text>
                    <Text style={styles.comment}>the comment</Text>
                    </View>
                   
                </View>
                <View style={styles.commentHolder}>
                    <Image style={styles.userPic}
                    source={{
                            uri: 'https://dhub.in/t5/demo/img/a46bd3b29ade415c4c754f7a5c2c618c.jpg',
                    }} />
                    <View style={styles.textHoler}>
                    <Text style={styles.userName}>@Anna</Text>
                    <Text style={styles.comment}>the comment</Text>
                    </View>
                   
                </View>
            </ScrollView>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userPic:{
        width:40,
        height:40,
        borderRadius:10,
    },
    textHoler: {
        paddingHorizontal:10,
    },
    userName:{
        color:'#333333',
        fontWeight: "bold",
       
    },
    comment:{
        color:'#333333',
        fontWeight: "normal"
    },
    commentHolder:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginHorizontal:5,
        paddingVertical:10,
        borderColor:'#ccc',
        borderBottomWidth:1
    }

});

export default Comments
