import React,{useState, createContext, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext();

export const UserProvider = (props)=>{

    const [user, setUser] = useState({
        'id':'0',
        'discussionMode':'normal',
        'activeTab':'discussionNormal'

    });
    
    useEffect(() => {

        const get_user = async()=>{
            try {
              //  const user_id = await SecureStore.getItemAsync('t4_user_id');
                const discussionMode = await SecureStore.getItemAsync('t5_discussion_mode');
                const activeTab = await SecureStore.getItemAsync('t5_active_tab');
                let userData = {...user};
                if(discussionMode) {
                    userData.discussionMode = discussionMode;
                }
                if(activeTab){
                    userData.activeTab = activeTab;
                }
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