import React,{useState, useEffect} from 'react'
import { View, Text,StyleSheet,Dimensions,ScrollView, Animated } from 'react-native'

const BottomSheet = () => {
 
  const [expand, setExpand] = useState(false);
  const animation= new Animated.Value(0);
  const handleScroll = (event)=>{
    let scrolling = event.nativeEvent.contentOffset.y;
    if(scrolling > 100){
      setExpand(true);
    }
  }
  useEffect(()=>{
    if(expand){
      Animated.timing(animation, {
        toValue: Dimensions.get('window').height*.8,
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
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  onScroll={event=>{handleScroll(event)}}>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>10 hrs ago</Text>
                <Text style={styles.metaText}>@startup_health</Text>
                <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
              </View>
            </View>
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
    bottom: 50,
    left: 0,
    right:0,
    backgroundColor:'#d0dce7',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    paddingTop:20,
    paddingHorizontal:5,
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