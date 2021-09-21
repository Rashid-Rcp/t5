import React,{useContext} from 'react'
import { View, Text, StyleSheet,StatusBar, ScrollView,TouchableOpacity } from 'react-native'
import Header from '../common/Header';
import Footer from '../common/Footer';

import { UserContext } from '../../context/UserContext';
const Home = ({navigation}) => {

  const [user,setUser] = useContext(UserContext);
 
    return (
        <View style={styles.mainContainer}>
            <StatusBar />
            <Header navigation={navigation}/>
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  onScroll={event=>{handleScroll(event)}}>
             <View style={styles.contentItem}>
               <TouchableOpacity onPress={()=>{navigation.navigate('DiscussionDetails')}}>
                <Text style={styles.itemTitle}>What are the important thing to notice while developing a prototype?</Text>
                <View style={styles.itemMeta}>
                  <Text style={styles.metaText}>10 hrs ago</Text>
                  <Text style={styles.metaText}>@startup_health</Text>
                  <View style={styles.metaStatus}><Text  style={styles.metaText}>Open</Text></View>
                </View>
              </TouchableOpacity>
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
            </View>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    t5Font: {
       
    },
    mainContainer:{
        flex: 1,
    },
    container:{
        flex:1,
        backgroundColor:'#d0dce7',
        paddingHorizontal:5,
        paddingTop:5,
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

export default Home
