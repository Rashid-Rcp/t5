import React,{useState, useEffect, version} from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, TouchableOpacity,ScrollView } from 'react-native'
import * as Contacts from 'expo-contacts';
import { Button,Image,Icon } from 'react-native-elements';
import axios from 'axios';

const ClubMembers = ({navigation, newClub, clubId, backTo}) => {
   
    const[userContact, setUserContact] =useState([]);
    const[members, setMembers] = useState([]);
    const[getMembers, setGetMembers] = useState(false);
    const[contactError, setContactError ] = useState('');
    const[addingMembers, setAddingMembers]  =useState(false);
  

    useEffect(() => {
        if(clubId === '0'){
            return false;
        }
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });
            if (data.length > 0) {
                let phoneNumbers = [];
                data.map((item)=>{
                    let numbers = item.phoneNumbers;
                    numbers.map((item)=>{
                        let number = item.number.replace(/\s/g,'');
                        number = number.replace( /-/g, "" );
                        if(number.length>10){
                            let f3 = number.slice(0, 3);
                            let f2 =  number.slice(0, 2);
                            if(f3 === '+91'){
                                number = number.slice(3,13)
                            }
                            else if(f2 === '91'){
                                number = number.slice(2,12)
                            }
                        }
                        if(number.length === 10){
                            phoneNumbers.push(number)
                        }
                    }); 
                })
                phoneNumbers = phoneNumbers.filter(val => !members.includes(val));
               
                if(phoneNumbers.length !== 0){
                    let numberList = [];
                    axios.post(global.APILink+'/user/numbers',{numbers:JSON.stringify(phoneNumbers),newClub:newClub,clubId:clubId})
                    .then(res=>{
                        setGetMembers(true);
                       
                        if(res.data.status === 'success'){
                            const users = res.data.users;
                            users.map((item)=>{
                                item['selected'] = false;
                                numberList.push(item);
                            })
                            setUserContact(numberList);
                        }
                        else if(res.data.status === 'no_users'){
                            setContactError('No users found from your contact list');
                        }
                    })
                    .catch(err=>{console.log(err);setContactError('An error occurred, please try again later')})
                }
            }
            else{
                console.log('no contact found on phone');
                setContactError('No contacts found from your phone');
            }
            }
            else{
                setContactError('Please enable contact list read permission to continue');
                console.log('no permission');
            }
        })()
      }, [clubId])
 

    const handleSelectMembers = (contact)=>{
      let UC = [...userContact];
      UC.map((item,index)=>{
        if(item.phone === contact){
            if(item.selected){
                UC[index].selected = false;
            }else{
                UC[index].selected = true;
            }
        }
      });
      setUserContact(UC);
    }

    const addSelectedMembers = ()=>{
        let selectedUsers=[];
        userContact.map((item)=>{
            if(item.selected){
                selectedUsers.push(item.id)
            }
        });

        if(selectedUsers.length===0){
            setContactError('Please select any contact from the list');
        }
        else{
            setContactError('');
            setAddingMembers(true);
            axios.post(global.APILink+'/club/members',{members:selectedUsers,clubId:clubId})
            .then(res=>{
                setAddingMembers(false)
                console.log(res.data);
                if(res.data.status === 'success'){
                    navigation.navigate(backTo);
                }
            })
            .catch(err=>{console.log(err);setContactError('An error occurred, please try again later');setAddingMembers(false)})
        }
    }

    return (
            <View style={styles.contactListHolder}>
                <Text style={styles.title}>Add members from your contact list</Text>
                <View style={styles.buttonHolder2}>
                    <Button
                    title="Do it later"
                    type="outline"
                        containerStyle={{borderRadius:10,borderWidth:1,borderColor:'#496076'}}
                        titleStyle={{color:'#496076',padding:10}}
                    />
                    <View style={{marginLeft:10}}>
                    <Button
                        title="Add selected"
                        type="outline"
                        containerStyle={{borderRadius:10,borderWidth:1,borderColor:'#496076'}}
                        titleStyle={{color:'#496076',padding:10}}
                        onPress={addSelectedMembers}
                        disabled={addingMembers}
                    />
                    </View>
                </View>
                {
                    !getMembers &&
                    <View>
                        <Text>Reading your contact list...</Text>
                    </View>
                }
                {
                contactError!==''&&<Text style={{fontSize:20}}>{contactError}</Text>
                }
                <ScrollView>
                {  userContact.map((contact,index)=>{
                    return(
                    <TouchableOpacity key={index} onPress={()=>handleSelectMembers(contact.phone)}>
                    <View  style={styles.contactItemHolder}>
                        <Image
                        source={{ uri: global.Link+'/images/'+contact.image }}
                        style={styles.contactDP}
                        />
                        <View style={styles.contactMeta}>
                            <Text style={styles.metaText}>{contact.name}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[{marginRight:10,},styles.metaText]}>{contact.phone}</Text>
                                {
                                contact.selected && 
                                    <Icon
                                    type="ionicon"
                                    name="checkmark-circle"
                                    size={20}
                                    color="#496076"
                                    iconStyle={{padding:0,backgroundColor:'#f7f7f7'}}
                                    />
                                }
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                    )
                })
                }
               
                <View style={styles.invite}>
                    <Text style={styles.inviteText}>Invite your friends to T5</Text>
                </View>
            </ScrollView>
        </View>

    )
}

export default ClubMembers
const styles = StyleSheet.create({
    container:{ 
      
    },
    contactDP:{
        width:45,
        height:45,
        borderRadius:15,
    },
    contactItemHolder:{
        flexDirection:'row',
        marginVertical:8,
    },
    contactMeta:{
        paddingLeft:10,
        color:'#333333'
    },
    buttonHolder2:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:20,
        alignItems:'center'
    },
    contactListHolder:{
       paddingBottom:250,
    },
    mainTitle:{
        fontSize:20,
        fontWeight:'bold',
        
        color:'#333333',
        textAlign:'center'
    },
    title:{
        fontSize:17,
       
        paddingBottom:10,
        color:'#333333'
    },
    metaText:{
        color:'#333333'
    },
    invite:{
       marginTop:50,
       marginBottom:20,
        padding:10,
        backgroundColor:'#d0dce7',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#fff'
    },
    inviteText:{
        textAlign:'center',
        color:'#333333'
    }
})
