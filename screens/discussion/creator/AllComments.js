import React,{useState, useEffect} from 'react'
import { View, Text,StyleSheet,Image,ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios'

const AllComments = ({route, navigation}) => {
    const {discussionId} = route.params;
    const[isLoading, setIsLoading] = useState(true);
    const[comments, setComments] = useState([]);
    useEffect(()=>{
        axios.get(global.APILink+'/discussion/all_comments/'+discussionId)
        .then(res=>{
            setIsLoading(false);
            if(res.data.status === 'success'){
                setComments(res.data.comments);
            }
        })
        .catch(err=>{console.log(err);setIsLoading(false)})
    },[])
    return (
        <View style={styles.container}>
                {
                    isLoading && <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size="small" color="#496076" />
                    </View>
                }
                {
                    !isLoading && <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    
                    <View style={styles.wrapper}>
                    {
                        comments.map((comment, index)=>{
                            return (
                            <View key={index} style={styles.commentHolder}>
                                <Image style={styles.memberDP}
                                source={{
                                        uri: global.Link+'/images/'+comment.user_image,
                                }} />
                                <View style={styles.textHoler}>
                                    <Text style={styles.textColor}>{comment.user_name}</Text>
                                    <Text style={styles.textColor}>{comment.comment}</Text>
                                </View>
                            </View>
                            );
                        })
                    }
                    </View>
                    </ScrollView>
                }
        </View>
    )
}

export default AllComments
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#d0dce7',
        paddingHorizontal:5,
        paddingVertical:5,
    },
    wrapper:{
        flex:1,
        backgroundColor:'#f7f7f7',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:5
    },
    commentHolder:{
        flexDirection:'row',
        marginVertical:5,
    },
    memberDP:{
        width:50,
        height:50,
        borderRadius:10,
        resizeMode:'contain'
   },
   textHoler: {
    paddingHorizontal:10,
    marginRight:35,
    },
    textColor:{
        color:"#333333"
    }
});
