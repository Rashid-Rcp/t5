import React,{useState, useEffect,useContext} from 'react'
import { View, Text,StyleSheet,Dimensions,ScrollView, Animated } from 'react-native'
import BottomSheetHeader from './BottomSheetHeader';
import Votes from './Votes';
import Comments from './Comments';
import { ActiveTypeContext } from './ActiveTypeContext';

const BottomSheet = ({discussionId, socketChanel, newComment}) => {
  const [expand, setExpand] = useState(false);
  const[active, setActive] =useContext(ActiveTypeContext);
  const animation= new Animated.Value(0);
  const[isBottom, setIsBottom] = useState(0);


  const handleScroll = ({layoutMeasurement, contentOffset, contentSize})=>{
    let scrolling = contentOffset.y;
    if(scrolling > 100){
      setExpand(true);
    }
    const paddingToBottom = 20;
    if( layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom){
       setIsBottom(isBottom+1);
      }
  }
  useEffect(()=>{
    if(expand){
      Animated.timing(animation, {
        toValue: Dimensions.get('window').height*.7,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
    else{
      Animated.timing(animation, {
        toValue: Dimensions.get('window').height*.5,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  },[expand]);

    return (
      <>
        <View style={styles.overlay}></View>
        <Animated.View style={[styles.contentHolder,{height:animation}]} >
            <BottomSheetHeader/>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  nestedScrollEnabled={true} 
             onScroll={({nativeEvent})=>{handleScroll(nativeEvent)}} >
                {active === 'votes'?  <Votes discussionId={discussionId} socketChanel={socketChanel} /> : <Comments discussionId={discussionId} newComment={newComment} isBottom={isBottom} />}
            </ScrollView>
        </Animated.View>
      </>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 54,
    bottom: 0,
    left: 0,
    right:0,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',height:'85.8%',
  },
  contentHolder: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right:0,
    backgroundColor:'#f7f7f7',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderWidth:1,
    borderColor:'#fff',
    borderBottomWidth:0,
  },
  contentItem:{
    backgroundColor:'#f7f7f7',
    borderRadius:20,
    padding:10,
    marginVertical:5,
  },
  itemTitle:{
    fontSize:18,
    color:'#333333'
  },
  itemMeta:{
    justifyContent:'space-between',
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    marginTop:10,
    marginBottom:10
  },
  metaText:{
    color:'#333333',
  },
  metaStatus:{
    backgroundColor:'#a3d39c',
    paddingVertical:1,
    paddingHorizontal:8,
    borderRadius:20
  }

});