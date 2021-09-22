import React,{useState, useEffect,useContext} from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,Platform } from 'react-native';
import { Input,Button, Icon } from 'react-native-elements';
import LoginForm from './LoginForm';

import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const RegisterForm = ({navigation}) => {
    const[user,setUser] = useContext(UserContext);
    const[name,setName] = useState('');
    const[userName,setUserName] = useState('');
    const[email,setEmail] = useState('');
    const[phone,setPhone] = useState('');
    const[about,setAbout] = useState('');
    const[image,setImage] = useState('https://reactnative.dev/img/tiny_logo.png');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[showLoginForm, setShowLoginForm] = useState(false);
    const[isSubmitting,setIsSubmitting] = useState(false);
    const[validation,setValidation] = useState({
      'name':'',
      'user_name':'',
      'email':'',
      'phone':'',
      'about':'',
      'password':'',
      'confirm_password':'',
    })
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: .5,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    const handleShowLoginForm = ()=>{
        setShowLoginForm(true);
    }

    const handleRegister=()=>{
      let isNameValid = true;
      let isUserNameValid = true;
      let isEmailValid = true;
      let isPhoneValid = true;
      let isAboutValid = true;
      let isPasswordValid = true;
      let isConfirmPasswordValid = true;

      const format = /[!@#$%^&*() +\-=\[\]{};':"\\|,.<>\/?]+/;
      const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let validationData = {...validation}

      if(name!== ''){
        if(name.length < 3){
          validationData.name = "Minimum 3 characters required";
          isNameValid = false;
        }
        else if(name.length > 50){
          validationData.name = "Maximum 50 characters allowed";
          isNameValid = false;
        }
        else{
          validationData.name = "";
          isNameValid = true;
        }
      }
      else{
        validationData.name="Name is required";
        isNameValid = false;
      }

      if(userName !== ''){
        if(userName.length < 3){
          validationData.user_name = "Minimum 3 characters required";
          isUserNameValid = false;
        }
        else if(userName.length > 50){
          validationData.user_name = "Maximum 50 characters allowed";
          isUserNameValid = false;
        }
        else if(format.test(userName)){
          validationData.user_name = "Special characters not allowed,Space not allowed, _ is allowed";
          isUserNameValid = false;
        }
        else{
          console.log('else');
          validationData.user_name = "";
          isUserNameValid = true;
        }
      }
      else{
        validationData.user_name="User_name is required";
        isUserNameValid = false;
      }

      if(email !== ''){
        if(!emailFormat.test(String(email).toLowerCase())){
          validationData.email="Email is not valid";
          isEmailValid = false;
        }
        else{
          validationData.email="";
          isEmailValid = true;
        }
      }
      else{
        validationData.email="Email is required";
        isEmailValid = false;
      }

      if(phone !== ''){
        if(isNaN(phone) || phone.length !== 10){
          validationData.phone="Phone is not valid";
          isPhoneValid = false;
        }
        else{
          validationData.phone="";
          isPhoneValid = true;
        }
      }
      else{
        validationData.phone="Phone is required";
        isPhoneValid = false;
      }

      if(about.length>500){
        validationData.about="Maximum 500 characters Allowed";
        isAboutValid = false;
      }
      else{
        validationData.about="";
        isAboutValid = true;
      }
      if(password !== ''){
        if(password.length<4){
          validationData.password="Minimum 4 characters is required";
          isPasswordValid = false;
        }
        else{
          validationData.password="";
          isPasswordValid = true;
        }
      }
      else{
        validationData.password="Password is required";
        isPasswordValid = false;
      }
      if(confirmPassword !== ''){
        if(!password===confirmPassword){
          validationData.confirm_password="Password mismatch";
          isConfirmPasswordValid = false;
        }
        else{
          validationData.confirm_password="";
          isConfirmPasswordValid = true;
        }
      }
      else{
        validationData.confirm_password="Please confirm your password";
        isConfirmPasswordValid = false;
      }
      setValidation(validationData);
      if(isNameValid && isUserNameValid && isEmailValid && isPhoneValid && isAboutValid && isPasswordValid && isConfirmPasswordValid){
       setIsSubmitting(true);
        let formData = new FormData();
        let uriParts = image.split('.');
        let fileType = uriParts[uriParts.length - 1];
        formData.append('image', {
            uri:image,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });
        formData.append('name',name);
        formData.append('user_name',userName);
        formData.append('email',email);
        formData.append('phone',phone);
        formData.append('about',about);
        formData.append('password',password);
        axios.post(global.APILink+'/user',formData)
        .then(res=>{
          setIsSubmitting(false);
          console.log(res.data)
          let validationData = {...validation};
          validationData.user_name =  res.data.status === 'user_name_error' ? 'user_name is already exist' :'';
          validationData.email =  res.data.status === 'email_error' ? 'email is already exist' :'';
          validationData.phone =  res.data.status === 'phone_error' ? 'phone is already exist' :'';
          if(res.data.status === 'success'){
            userLogin(res.data.user_id);
          }
          else{
            setValidation(validationData);
          }
         
        })
        .catch(err=>console.log(err))
      }
    }

    const userLogin = async(user_id)=>{
      await SecureStore.setItemAsync('t5_user_id', user_id.toString());
      let userData = {...user};
      userData.id = user_id.toString();
      setUser(userData);
      navigation.navigate('Account');
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
                 errorMessage={validation.name}
              />
              <Input placeholder="User_name"
                onChangeText={value=>setUserName(value)}
                errorMessage={validation.user_name}
              />
              <Input placeholder="Email"
                onChangeText={value=>setEmail(value)}
                errorMessage={validation.email}
                keyboardType="email-address"
              />
              <Input placeholder="Phone"
                onChangeText={value=>setPhone(value)}
                errorMessage={validation.phone}
                keyboardType="phone-pad"
              />
              <Input placeholder="About your self (optional)"
                onChangeText={value=>setAbout(value)}
                multiline={true}
                numberOfLines={3}
                textAlignVertical={'top'}
                errorMessage={validation.about}
              />
              <Input placeholder="Password"
                onChangeText={value=>setPassword(value)}
                secureTextEntry={true}
                errorMessage={validation.password}
              />
              <Input placeholder="Confirm Password"
                onChangeText={value=>setConfirmPassword(value)}
                secureTextEntry={true}
                errorMessage={validation.confirm_password}
              />
              <Text style={{color:'#333333'}}>Profile picture (optional)</Text>
              <View style={styles.imageHolder}>
               <Image
                  source={{ uri: image }}
                  style={{ width: 50, height: 50,borderRadius:20,marginRight:20, }}
                />
                <Icon name="add-a-photo" type="materialIcon" size={30} color={"#333333"} onPress={pickImage} />

              </View>
             
              <Button type="outline" title={isSubmitting?'Submitting...':'Register'} 
              buttonStyle={{borderRadius:15,borderColor:'#496076',borderWidth:1}}
              titleStyle={{color:'#496076',fontSize:17}}
              onPress={handleRegister}
              disabled={isSubmitting}
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
