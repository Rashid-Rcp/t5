import React,{useEffect, useState, useContext, useCallback} from 'react'
import { View, Text,StyleSheet,Image,ScrollView, Platform } from 'react-native';
import axios from 'axios';
import { Icon,Input,Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
const EditProfile = ({navigation, route}) => {
  
    const[name, setName] = useState(route.params.userData.name);
    const[image, setImage] = useState(route.params.userData.image);
    const[phone, setPhone] = useState(route.params.userData.phone);
    const[email, setEmail] = useState(route.params.userData.email);
    const[about, setAbout] = useState(route.params.userData.about);
    const[userId, setUserId] = useState(route.params.userData.id);
    const[isSubmitting, setIsSubmitting] = useState(false);
    const[validation,setValidation] = useState({
        'name':'',
        'email':'',
        'phone':'',
        'about':''
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
    
      const handleUpdate=()=>{
        let isNameValid = true;
        let isEmailValid = true;
        let isPhoneValid = true;
        let isAboutValid = true;
  
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

        setValidation(validationData);
        if(isNameValid && isEmailValid && isPhoneValid && isAboutValid){
         setIsSubmitting(true);
          let formData = new FormData();
          let uriParts = image.split('.');
          let fileType = uriParts[uriParts.length - 1];
          formData.append('image', {
              uri:image,
              name: `photo.${fileType}`,
              type: `image/${fileType}`,
          });
          formData.append('id',userId);
          formData.append('name',name);
          formData.append('email',email);
          formData.append('phone',phone);
          formData.append('about',about);
          axios.post(global.APILink+'/user/update',formData)
          .then(res=>{
            setIsSubmitting(false);
            console.log(res.data)
            let validationData = {...validation};
            validationData.email =  res.data.status === 'email_error' ? 'email is already exist' :'';
            validationData.phone =  res.data.status === 'phone_error' ? 'phone is already exist' :'';
            if(res.data.status === 'success'){
             
            }
            else{
              setValidation(validationData);
            }
           
          })
          .catch(err=>console.log(err))
        }
      }

    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.holder}>
                    <View style={styles.imageHolder}>
                        <Image 
                            source={{uri:image.includes('file://')?image:global.Link+'/images/'+image}}
                            style={styles.userDP}
                        />
                        <Icon name="camera" type="ionicon" size={40} color='#333333' onPress={pickImage} />
                    </View>
                    <Input value={name} label='Name' onChangeText={text=>setName(text)} />
                    <Input value={phone} label='Phone' onChangeText={text=>setPhone(text)}/>
                    <Input value={email} label='Email' onChangeText={text=>setEmail(text)} />
                    <Input multiline={true} numberOfLines={5} value={about} label='About' onChangeText={text=>setAbout(text)} />
                    <Button type="outline" title="Update" 
                     onPress={handleUpdate}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default EditProfile;
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#d0dce7',
        flex:1,
        paddingHorizontal:5,
        paddingVertical:5,
    },
    holder:{
        backgroundColor:'#f7f7f7',
        borderWidth:1,
        borderColor:'#fff',
        paddingVertical:20,
        paddingHorizontal:5,
        borderRadius:10,
        },
    userDP:{
        width:70,
        height:70,
        borderRadius:15,
    },
    imageHolder:{
        flexDirection:'row',
        alignItems:'flex-end',
        marginBottom:20,
    }
})
