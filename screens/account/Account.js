import React,{useEffect, useState, useContext} from 'react'
import { View, Text,StyleSheet,ScrollView,TouchableOpacity, RefreshControl } from 'react-native'
import Header from './Header';
import Profile from './Profile';
import ClubOwn from './ClubOwn';
import ClubAdmin from './ClubAdmin';
import ClubFollow from './ClubFollow';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
const Account = ({navigation, route}) => {

    const[user, setUser] = useContext(UserContext);
    const[isLoading ,setIsLoading] = useState(true);
    const[userData, setUserData] = useState({});
    const[clubsAdmin, setClubsAdmin] = useState({data:[],nex_page_url:null});
    const[clubsFollow, setClubsFollow] = useState({data:[],nex_page_url:null});
    const[reload, setReload]  = useState(0);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(()=>{
        if (typeof route.params !== 'undefined') {
            //console.log('kok');
            const{refresh} = route.params;
            if(refresh){
                setReload(reload + 1);
            }
        }
    },[route]);

    useEffect(()=>{
        if( user.loaded && 0 !== Number(user.id) ){
            axios.get(global.APILink+'/user/data/'+user.id)
            .then(res=>{
                setIsLoading(false);
                setRefresh(false);
                if (res.data.status === 'success'){
                    setUserData(res.data.userData);
                    setClubsAdmin(res.data.clubsAdmin);
                    setClubsFollow(res.data.clubsFollow);
                }
            })
            .catch(err=>{console.log(err);});
        }
    },[user, reload]);

    const onRefresh = ()=>{
        setRefresh(true);
        setReload(reload + 1);
    };

    return (
        <View style={styles.container}>
           <Header navigation={navigation} userData={userData} />
           <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={onRefresh}
                />}
            >
            <Profile navigation={navigation} userData={userData}/>
            {/* <ClubOwn/> */}
            <ClubAdmin navigation={navigation} clubsAdmin={clubsAdmin}/>
            <ClubFollow navigation={navigation} clubsFollow={clubsFollow}/>
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
