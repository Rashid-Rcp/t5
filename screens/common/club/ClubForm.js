import React,{useState, useContext, useEffect} from 'react'
import { View, Text, StyleSheet,ScrollView,Image,Platform } from 'react-native'
import { Input,Button,CheckBox,Icon } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import ClubMembers from './ClubMembers';
import { UserContext } from '../../../context/UserContext';


const ClubForm = ({ route, navigation }) => {

    const[user,setUser] = useContext(UserContext);
    const[clubName, setClubName] = useState('');
    const[clubDescription, setClubDescription] = useState('');
    const[clubTags, setClubTags] = useState('');
    const[clubType,setClubType] = useState('');
    const[clubDP, setClubDP] = useState(global.Link+'/images/T5/t5-club-icon.png');
    const[step1Success, setStep1Success] = useState(false);
    const[isSubmitting, setIsSubmitting] = useState(false);
    const {backTo} = route.params;
    const[validation, setValidation] = useState({
        'name':'',
        'tags':'',
        'description':'',
        'type':''
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
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: .2,
        });
    
        if (!result.cancelled) {
          setClubDP(result.uri);
        }
      };
    
    const submitClubFormStep1= ()=>{
       let nameValid =true;
       let tagsValid = true;
       let descriptionValid = true;
       let typeValid = true;
       let validationData = {...validation}
       if(clubName!==''){
            if(clubName.length<3 ||clubName.length>10 ){
                validationData.name='Club name length must be in between 3 and 10';
                nameValid = false;
            }
            else{
                validationData.name = '';
                nameValid = true;
            }
       }
       else{
           validationData.name='Club name required';
           nameValid = false;
       }

       if(clubTags !==''){
           if(clubTags.length > 200){
            validationData.tags='Maximum of 200 characters allowed';
            tagsValid = true
           }else{
            validationData.tags='';
            tagsValid = true
           }
       }
       else{
        validationData.tags = 'Club tags required';
        tagsValid = false;
       }
       
       if(clubDescription !== ''){
        if(clubDescription.length>250){
            validationData.description = 'Maximum of 250 characters allowed';
            descriptionValid = false;
        }
        else{
            validationData.description ='';
            descriptionValid = true;
        }
       }
       else{
           validationData.description='Club description is required';
           descriptionValid = false;
       }
       if(clubType !== ''){
        validationData.type = '';
        typeValid = true;
       }else{
        validationData.type = 'Select a club type';
        typeValid = false;
       }
       setValidation(validationData);

       if(nameValid && tagsValid && descriptionValid && typeValid){
            setIsSubmitting(true);
            let formData = new FormData();
            let uriParts = clubDP.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('image', {
                uri:clubDP,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            formData.append('user',user.id);
            formData.append('clubName',clubName);
            formData.append('clubTags',clubTags);
            formData.append('clubDescription',clubDescription);
            formData.append('clubType',clubType);
            axios.post(global.APILink+'/club/create',formData)
            .then(res=>{
                console.log(res.data);
                if(res.data.status === 'club_exist'){
                    let validationData = {...validation}
                    validationData.name = 'Club name is already exist'

                }else if(res.data.status === 'success'){
                    let userData = {...user};
                    userData.clubId = res.data.club; 
                    setUser(userData);
                    setStep1Success(true);
                } else{

                }
                setIsSubmitting(false)
            })
            .catch(err=>{console.log(err);setIsSubmitting(false)})
       }
    }

    return (
        <View style={styles.mainContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Club</Text>
            {
                !step1Success &&   
                <ScrollView>
                <View style={styles.formHolder}>
                    <View style={styles.imgHolder}>
                        <Image 
                        style={styles.clubDP}
                        source={{uri:clubDP}}
                        />
                        <Icon type="ionicon" name="ios-camera" size={45} color={"#496076"} onPress={pickImage} />
                    </View>
                <View style={styles.formGroup}>
                    <Input placeholder="Enter club name here" 
                    label="Club Name"
                    labelStyle={styles.label}
                    inputContainerStyle={styles.textBoxContainer}
                    style={styles.textBox}
                    onChangeText={value => setClubName(value)}
                    errorMessage={validation.name}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Input placeholder="Enter club tags here, separated by comma." 
                    label="Club Tags"
                    labelStyle={styles.label}
                    inputContainerStyle={styles.textBoxContainer}
                    style={styles.textBox}
                    multiline = {true}
                    numberOfLines = {2}
                    onChangeText={value => setClubTags(value)}
                    errorMessage={validation.tags} />
                </View> 
                <View style={styles.formGroup}>
                    <Input placeholder="Enter club description here." 
                    label="Club Description"
                    labelStyle={styles.label}
                    style={styles.textBox}
                    inputContainerStyle={styles.textBoxContainer}
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText={value => setClubDescription(value)} 
                    errorMessage={validation.description}
                    />
                </View>
                <View style={styles.formGroup}>
                    <CheckBox
                    onPress={()=>{setClubType('public')}}
                    left
                    title='Its Public'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={clubType==='public'?true:false}
                    textStyle={{color:'#333333'}}
                    containerStyle={{backgroundColor:'#f7f7f7',borderColor:'#f7f7f7',paddingHorizontal:0,paddingVertical:0,}}
                    />
                    <Text style={styles.helperText}>Anyone can join to the club and view all contents.</Text>
                </View>
                <View style={styles.formGroup}>
                    <CheckBox
                    onPress={()=>{setClubType('private')}}
                    left
                    title='Its Private'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={clubType==='private'?true:false}
                    textStyle={{color:'#333333'}}
                    containerStyle={{backgroundColor:'#f7f7f7',borderColor:'#f7f7f7',paddingHorizontal:0,paddingVertical:0,}}
                    />
                    <Text style={styles.helperText}>Only admin can add members to the club, and only members can view the contents.</Text>
                </View>
                <View>
                    <Text style={{color:'red',marginLeft:20,marginTop:10}}>{validation.type}</Text>
                </View>
                <View style={styles.buttonHolder}>
                    <Button title={isSubmitting?'Submitting...':'Next'} type="outline" onPress={submitClubFormStep1}
                    titleStyle={{color:'#496076'}}
                    disabled={isSubmitting}
                    buttonStyle={{borderRadius:10,borderWidth:1,borderColor:'#496076'}}
                    />
                </View>
            </View>
            </ScrollView>
            }
            {
            step1Success && 
            <ClubMembers navigation={navigation} newClub={false} clubId={user.clubId} backTo={backTo} />
        }
        </View>
        </View>
       
    )
}

export default ClubForm

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"#d0dce7",
        flex:1,
    },
    container:{
        backgroundColor:'#f7f7f7',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:20,
        marginHorizontal:5,
        marginTop:20,
        paddingHorizontal:5,
        paddingTop:20,
        paddingBottom:100,
    },
    title:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'700',
        marginBottom:50,
    },
    label:{
        color:'#333333'
    },
    textBox:{
        fontSize:15,
        paddingVertical:0,
        color:"#333333",
        textAlignVertical: 'top',
        paddingTop:10,
    },
    textBoxContainer:{
        borderBottomColor:'#ccc'
    },
    buttonHolder:{
        width:'50%',
        alignSelf:'center',
        marginTop:50,
    },
    helperText:{
        color:'#333333',
        paddingLeft:15,
    },
    imgHolder:{
        marginBottom:20,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    clubDP:{
        width:60,
        height:60,
        borderRadius:20,
        marginRight:10,
        borderWidth:2,
        borderColor:'#333333'
    }
    
});