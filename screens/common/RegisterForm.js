import React,{useState} from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity, Touchable } from 'react-native';
import { Input,Button, Icon } from 'react-native-elements';
import LoginForm from './LoginForm';

const RegisterForm = () => {
    const[name,setName] = useState('');
    const[userName,setUserName] = useState('');
    const[email,setEmail] = useState('');
    const[phone,setPhone] = useState('');
    const[about,setAbout] = useState('');
    const[image,setImage] = useState('https://reactnative.dev/img/tiny_logo.png');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[showLoginForm, setShowLoginForm] = useState(false);

    const handleShowLoginForm = ()=>{
        setShowLoginForm(true);
    }

    if(showLoginForm){
        return (
            <LoginForm/>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.formHolder}>
              <Input placeholder="Name"
                 onChangeText={value => setName(value)}
              />
              <Input placeholder="User_name"
                onChangeText={value=>setUserName(value)}
              />
              <Input placeholder="Email"
                onChangeText={value=>setEmail(value)}
              />
              <Input placeholder="Phone"
                onChangeText={value=>setPhone(value)}
              />
              <Input placeholder="About your self (optional)"
                onChangeText={value=>setAbout(value)}
                multiline={true}
                numberOfLines={3}
                textAlignVertical={'top'}
              />
              <Input placeholder="Password"
                onChangeText={value=>setPassword(value)}
                secureTextEntry={true}
              />
              <Input placeholder="Confirm Password"
                onChangeText={value=>setConfirmPassword(value)}
                secureTextEntry={true}
              />
              <Text style={{color:'#333333'}}>Profile picture (optional)</Text>
              <View style={styles.imageHolder}>
               <Image
                  source={{ uri: image }}
                  style={{ width: 50, height: 50,borderRadius:20,marginRight:20, }}
                />
                <Icon name="folder-images" type="entypo" size={30} color={"#333333"} />

              </View>
             
              <Button type="outline" title="Register" 
              buttonStyle={{borderRadius:15,borderColor:'#496076'}}
              titleStyle={{color:'#496076'}}
              />
              <TouchableOpacity onPress={handleShowLoginForm}>
                 <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
              
            </View>
        </View>
    )
}

export default RegisterForm

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#f7f7f7",
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:15,
    margin:15,
    marginTop:50,
    marginBottom:100,
    borderWidth:1,
    borderColor:'#fff',
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    color:'#333333'
},
text:{
    fontSize:17,
    marginTop:20,
    marginBottom:10,
    alignSelf:'flex-end',
    color:'#496076',
    marginRight:30,
},
imageHolder:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
    marginTop:5,
}
})
