import React,{useState, createContext, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const AccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
axios.interceptors.request.use(
    config=>{
        config.headers.authorization = `Bearer ${AccessToken}`;
        return config;
    },
    error=>{
        return Promise.reject(error)
    }
);

export const UserContext = createContext();

export const UserProvider = (props)=>{

    const [user, setUser] = useState({
        'id':'0',
        'club':false,
        'loaded':false,
        'discussionMode':'normal',
        'activeTab':'discussionNormal'
    });
    
    useEffect(() => {

        const get_user = async()=>{
            try {
                const user_id = await SecureStore.getItemAsync('t5_user_id');
                const discussionMode = await SecureStore.getItemAsync('t5_discussion_mode');
                const activeTab = await SecureStore.getItemAsync('t5_active_tab');
                let userData = {...user};
        
                if(user_id){
                   userData.id = user_id;
                   // userData.id = '0';
                   await axios.get(global.APILink+'/user/club/'+user_id)
                    .then(res=>{
                        if(res.data.status === 'success'){
                            userData.club = true;
                        }
                    })
                    .catch(err=>console.log(err))
                }
                if(discussionMode) {
                    userData.discussionMode = discussionMode;
                }
                if(activeTab){
                    userData.activeTab = activeTab;
                }
                userData.loaded = true;
                setUser(userData);
              } catch (e) {
                console.log(e);
              }
        }
        get_user();


        // const logoutUserAccount = ()=>{
        //     //delete secure store
        //     SecureStore.deleteItemAsync('t4_user_id');
        //     let userData = {...user};
        //     userData.id='0';
        //     setUser(userData);
           
            
        // }

        //logoutUserAccount();
    
        
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}