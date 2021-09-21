import React, { useState } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { Input,Button } from 'react-native-elements';
import RegisterForm from './RegisterForm';

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const[userPass, setUserPass] = useState('');
    const[ShowRegisterFrom, setShowRegisterFrom] = useState(false);
    const handleCreateAccountClick = ()=>{
       setShowRegisterFrom(true);
    }
    if(ShowRegisterFrom){
        return (
            <RegisterForm />
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.formHolder}>
              <Input placeholder="Mobile / Email"   
              onChangeText={value => setUserName(value)}/>
              <Input placeholder="Password"   
              onChangeText={value => setUserPass(value)} secureTextEntry={true}/>
              <Button
                title="Login"
                type="outline"
                buttonStyle={{borderColor:'#496076',borderRadius:10,}}
                containerStyle={{color:'red'}}
                titleStyle={{color:'#496076'}}
               />
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
    }
});
