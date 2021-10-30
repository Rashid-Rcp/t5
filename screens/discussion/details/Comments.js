import React,{useEffect, useState, useContext} from 'react'
import { View, Text,StyleSheet,ScrollView,Image,ActivityIndicator, ActivityIndicatorBase } from 'react-native'
import axios from 'axios'
import { UserContext } from '../../../context/UserContext'
import { Icon } from 'react-native-elements'
const Comments = ({discussionId, newComment, isBottom}) => {

    const[user, setUser] = useContext(UserContext);
    const[comments, setComments] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const[nextPageUrl, setNextPageUrl] = useState(null);
    const[isLoadingMore, setIsLoadingMore] = useState(false);
    useEffect(()=>{
        axios.get(global.APILink+'/discussion/comment/'+discussionId)
        .then(res=>{
            console.log(res.data);
            if(res.data.status === 'success'){
                setIsLoading(false);
                setComments(res.data.comments.data);
                setNextPageUrl(res.data.comments.next_page_url);
            }
        })
        .catch(err=>{console.log(err)})
    },[])

    useEffect(()=>{
        if(newComment){
            let commentList = [...comments];
            commentList.unshift(newComment);
            setComments(commentList);
        }
    },[newComment]);

    useEffect(()=>{
        if(isBottom && nextPageUrl !== null && !isLoadingMore){
            setIsLoadingMore(true);
            axios.get(nextPageUrl)
            .then(res=>{
                console.log('new');
                if(res.data.status === 'success'){
                    let commentList = [...comments,...res.data.comments.data];
                    setComments(commentList);
                    setNextPageUrl(res.data.comments.next_page_url);
                    setIsLoadingMore(false);
                }
            })
            .catch(err=>{console.log(err)})

        }
    },[isBottom])

    const deleteComment = (commentId)=>{
        axios.delete(global.APILink+'/discussion/comment/'+commentId)
        .then(res=>{
            if(res.data.status === 'success'){
                let commentList = [...comments];
                let index_remove = 0;
                commentList.forEach((comment, index)=>{
                    if(Number(comment.id) === Number(commentId)){
                        index_remove = index
                    }
                });
                commentList.splice(index_remove, 1);
                setComments(commentList);
            }
        })
        .catch(err=>{console.log(err)})
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };
         

    return (
        <>
        {
            isLoading && <View style={{flex:1,justifyContent:'center',alignItems:'center',height:100}}>
            <ActivityIndicator size="small" color="#496076" />
        </View>
        }
        {
            !isLoading && <View style={styles.container}>
            {
                comments.map((comment, index)=>{
                    return (
                    <View key={index} style={styles.commentHolder}>
                        <Image style={styles.userPic}
                        source={{
                                uri: global.Link+'/images/'+comment.image,
                        }} />
                        <View style={styles.textHoler}>
                        <Text style={styles.userName}>{comment.name}</Text>
                        <Text style={styles.comment}>{comment.comment}</Text>
                        </View>
                        {
                            Number(user.id) === Number(comment.user) && <View style={{position:'absolute',right:5, top:20}}>
                            <Icon type="MaterialIcon"  name="delete" size={25} color="#FF6666" onPress={()=>deleteComment(comment.id)}/>
                        </View>
                        }
                        
                    </View>
                    )
                })
            }
            </View>
        }
        {
            isLoadingMore && <View style={{ flex:1, justifyContent:'center',alignItems:'center',marginBottom:50}}>
                   <ActivityIndicator size="small" color="#496076" />
            </View>
        }
        
        
        </>
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
