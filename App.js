import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {default as DiscussionHome} from './screens/discussion/Home';
import {default as DiscussionDetails} from './screens/discussion/details/Details';
import {default as DiscussionCreatorHome} from './screens/discussion/HomeCreator';
import {default as AddNewDiscussion} from './screens/discussion/creator/AddNew'
import {default as ManageDiscussion} from './screens/discussion/creator/Manage'
import {default as CreatorAllComments} from './screens/discussion/creator/AllComments'
import {default as ClubDetails} from './screens/club/ClubDetails';
import {default as ClubList} from './screens/club/ClubList';
import {default as ClubMembers} from './screens/club/ClubMembers';
import {default as ClubDiscussions} from './screens/club/ClubDiscussions';
import EditProfile from './screens/account/EditProfile';
import  {default as PublicProfile} from './screens/account/PublicProfile';
import {default as Search} from './screens/common/Search';
import Account from './screens/account/Account'
import ClubForm from './screens/common/club/ClubForm';
import { UserProvider } from './context/UserContext';
import * as SecureStore from 'expo-secure-store';
const DiscussionStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const DiscussionCreatorStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function discussionCreatorStackScreen(){
  return (
  <DiscussionCreatorStack.Navigator>
    <DiscussionCreatorStack.Screen name="DiscussionCreatorHome" component={DiscussionCreatorHome} options={{headerShown:false}} />
    <DiscussionCreatorStack.Screen name="AddNewDiscussion" component={AddNewDiscussion} options={{headerShown:false}} />
    <DiscussionCreatorStack.Screen name="CreateClub" component={ClubForm} options={{headerShown:false}} />
    <DiscussionCreatorStack.Screen name="ManageDiscussion" component={ManageDiscussion} options={{headerShown:false}} />
    <DiscussionCreatorStack.Screen name="CreatorAllComments" component={CreatorAllComments} options={{title:'Comments',headerStyle: {backgroundColor: '#f7f7f7'}}} />
  </DiscussionCreatorStack.Navigator>
  )
}
function discussionStackScreen(){
  return (
    <DiscussionStack.Navigator>
      <DiscussionStack.Screen name="DiscussionHome"  component={DiscussionHome} options={{headerShown:false}}/>
      <DiscussionStack.Screen name="DiscussionDetails" component={DiscussionDetails} options={{headerShown:false}}/>
      <DiscussionStack.Screen name="ClubDetails" component={ClubDetails}
        options={{title:"Club details", headerStyle: {
          backgroundColor: '#496076',
        },
        headerTintColor: '#c1f1dc',
        headerTitleStyle: {
          color:'#c1f1dc',
        },}}/>
        <DiscussionStack.Screen name="Search" component={Search} 
        options={{title:"Search a topic", headerStyle: {
          backgroundColor: '#496076',
        },
        headerTintColor: '#c1f1dc',
        headerTitleStyle: {
          color:'#c1f1dc',
        },}}/>
    </DiscussionStack.Navigator>
  );
}

function accountStackScreen(){
  return(
    <AccountStack.Navigator>
      <AccountStack.Screen name="AccountMain"  component={Account} options={{headerShown:false}}/>
      <AccountStack.Screen name="ClubList" component={ClubList}  options={{title:"Clubs", headerStyle: {
              backgroundColor: '#496076',
            },
            headerTintColor: '#c1f1dc',
            headerTitleStyle: {
              color:'#c1f1dc',
            },}}/>
      <AccountStack.Screen name="ClubDetails" component={ClubDetails}
        options={{title:"Club details", headerStyle: {
              backgroundColor: '#496076',
            },
            headerTintColor: '#c1f1dc',
            headerTitleStyle: {
              color:'#c1f1dc',
            },}}/>
      <AccountStack.Screen name="EditProfile" component={EditProfile} 
        options={{title:"Edit profile", headerStyle: {
              backgroundColor: '#496076',
            },
            headerTintColor: '#c1f1dc',
            headerTitleStyle: {
              color:'#c1f1dc',
            },}}/>
      <AccountStack.Screen name="PublicProfile" component={PublicProfile} 
        options={{title:"Profile", headerStyle: {
              backgroundColor: '#496076',
            },
            headerTintColor: '#c1f1dc',
            headerTitleStyle: {
              color:'#c1f1dc',
            },}}/>
      <AccountStack.Screen name="DiscussionDetails" component={DiscussionDetails} options={{headerShown:false}}/>
      <AccountStack.Screen name="ClubDiscussions" component={ClubDiscussions}
      options={{title:'Club discussions', headerStyle: {
        backgroundColor: '#496076',
      },
      headerTintColor: '#c1f1dc',
      headerTitleStyle: {
        color:'#c1f1dc',
      },}}/>
      <AccountStack.Screen name="ClubMembers" component={ClubMembers}
      options={{title:'Club members', headerStyle: {
        backgroundColor: '#496076',
      },
      headerTintColor: '#c1f1dc',
      headerTitleStyle: {
        color:'#c1f1dc',
      },}}/>


    </AccountStack.Navigator>
  )
}


export default function App() {

  global.APILink = 'http://192.168.43.50:80/t5-laravel/t5-app/public/api';
  global.Link = 'http://192.168.43.50:80/t5-laravel/t5-app/public';

  const[initial,setInitial] = useState('');
  // const[fontLoaded, setFontLoaded] = useState(false);
  useEffect(()=>{
    const getInitialScreen = async ()=>{
      try{
        const activeTab = await SecureStore.getItemAsync('t5_active_tab');
        if(activeTab){
          setInitial(activeTab);
        }
        else{
          setInitial('discussionNormal'); 
        }
      }
      catch(e){
        console.log(e);
      }
    }
    getInitialScreen();

  },[])

  if(!initial){
    return (<></>);
  }
  return (
    <UserProvider>
    <NavigationContainer>
      <Tab.Navigator tabBar={()=>{}}>
        <Tab.Screen name="Initial" component={initial==='discussionNormal'?discussionStackScreen:discussionCreatorStackScreen} options={{headerShown:false}}/>
        <Tab.Screen name="DiscussionCreator" component={discussionCreatorStackScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Discussion" component={discussionStackScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Account" component={accountStackScreen} options={{headerShown:false}}/>
      </Tab.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}