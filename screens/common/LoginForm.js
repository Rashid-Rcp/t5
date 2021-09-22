import React, { useState, useContext } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { Input,Button } from 'react-native-elements';
import RegisterForm from './RegisterForm';
import { UserContext } from '../../context/UserContext';

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const LoginForm = ({navigation}) => {
    const[user, setUser] = useContext(UserContext);
    const[userName, setUserName] = useState('');
    const[userPass, setUserPass] = useState('');
    const[ShowRegisterFrom, setShowRegisterFrom] = useState(false);
    const[isSubmitting, setIsSubmitting] = useState(false);
    const[loginFailed, setLoginFailed] = useState(false);
    const[networkFailed, setNetworkFailed] = useState(false);
    const[validation, setValidation] = useState({
        'user':'',
        'password':''
    });

    const handleUserLogin = ()=>{
        let isUserValid = true;
        let isPasswordValid = true;
        let validationData = {...validation}
        setLoginFailed(false);
        setNetworkFailed(false);
        const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(userName!==''){
            if(!emailFormat.test(String(userName).toLowerCase()) && isNaN(userName)){
                validationData.user="Invalid Mobile / Email";
                isUserValid = false;
              }
              else if(!isNaN(userName) && userName.length !== 10){
                validationData.user="Invalid Mobile / Email";
                isUserValid = false;
              }
              else{
                validationData.user="";
                isUserValid = true;
              }
        }else{
            validationData.user='Mobile / Email required';
            isUserValid = false;
        }
        if(userPass !== ''){
            validationData.password='';
            isPasswordValid=true;
        }else{
            validationData.password='Password required';
            isPasswordValid=false;
        }
        setValidation(validationData);
        if(isUserValid && isPasswordValid){
            setIsSubmitting(true);
            axios.post(global.APILink+'/login',{user:userName,password:userPass})
            .then(res=>{
                console.log(res.data)
                setIsSubmitting(false);
               if (res.data.status === 'success'){
                userLogin(res.data.userId)
               }
               else{
                setLoginFailed(true);
               }
            })
            .catch(err=>{console.log(err);setIsSubmitting(false);setNetworkFailed(true)})
        }
    }

    const userLogin = async(userId)=>{
        await SecureStore.setItemAsync('t5_user_id', userId.toString());
        let userData = {...user};
        userData.id = userId.toString();
        setUser(userData);
        navigation.navigate('Account');
      }

    const handleCreateAccountClick = ()=>{
       setShowRegisterFrom(true);
    }

    if(ShowRegisterFrom){
        return (
            <RegisterForm navigation={navigation} />
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.formHolder}>
              <Input placeholder="Mobile / Email"   
              onChangeText={value => setUserName(value)}
              errorMessage={validation.user}
              />
              <Input placeholder="Password"   
              onChangeText={value => setUserPass(value)} secureTextEntry={true}
              errorMessage={validation.password}
              />
              <Button
                title={isSubmitting?'submitting...':'Login'}
                type="outline"
                buttonStyle={{borderColor:'#496076',borderRadius:10,borderWidth:1,}}
                titleStyle={{color:'#496076',fontSize:17,}}
                onPress={handleUserLogin}
                disabled={isSubmitting}
               />
               {
                   networkFailed && <View>
                       <Text style={styles.error}>An error occurred, please try again later</Text>
                   </View>
               }
               {
                   loginFailed && <View>
                       <Text style={styles.error}>Invalid Mobile/Email or Password</Text>
                   </View>
               }
               <TouchableOpacity onPress={handleCreateAccountClick}>
                   <Text style={styles.text}>Create a new account</Text>
               </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginForm
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#f7f7f7",
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:15,
        margin:15,
        marginTop:50,
        borderWidth:1,
        borderColor:'#fff',

    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        color:'#333333'
    },
    formHolder:{

    },
    text:{
        fontSize:17,
        marginTop:20,
        marginBottom:10,
        alignSelf:'flex-end',
        color:'#496076'
    },
    error:{
        color:'red',
        fontSize:17,
    }
});
