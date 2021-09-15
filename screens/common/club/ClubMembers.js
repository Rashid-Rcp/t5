import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, TouchableOpacity } from 'react-native'
import * as Contacts from 'expo-contacts';
import { Button,Image,Icon } from 'react-native-elements';

const ClubMembers = () => {

   
    const[userContact, setUserContact] =useState([]);
    const[showUserContact, setShowUserContact] = useState(false);
    const[members, setMembers] = useState([]);
    const[getMembers, setGetMembers] = useState(false);

    useEffect(()=>{ //get club members list from DB
        setMembers([]);
        setGetMembers(true);
    },[])


    async function addMembers(){
       
        if(getMembers){
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
                let numberList = [];
                phoneNumbers.map((item)=>{
                    numberList.push({'number':item,'selected':false})
                });
                setUserContact(numberList);
                setShowUserContact(true);
            }
            else{
                console.log('no contact found on phone');
            }
            }
            else{
                console.log('no permission');
            }
        }
    }

    const handleAddMember = (contact)=>{
      let UC = [...userContact];
      UC.map((item,index)=>{
        if(item.number === contact){
            if(item.selected){
                UC[index]={'number':contact,'selected':false}
            }else{
                UC[index]={'number':contact,'selected':true}
            }
        }
      });
      setUserContact(UC);
    }

    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.container}>
                {
                   !showUserContact && <View style={styles.buttonHolder}>
                    <Button title="Add Members" type="outline" onPress={addMembers} />
                </View>
                }
                {
                showUserContact && <View style={styles.contactListHolder}>
                <Text style={styles.title}>From your contact list</Text>
                <View style={styles.buttonHolder2}>
                    
                    <Button
                        icon={
                            <Icon
                            type="ionicon"
                            name="close-circle"
                            size={40}
                            color="#496076"
                            iconStyle={{margin:0,padding:0,backgroundColor:'#f7f7f7'}}
                            />
                        }
                        buttonStyle={{width:45,height:45,padding:0,backgroundColor:'#f7f7f7'}}
                    />
                    <View style={{marginLeft:10}}>
                    <Button
                        icon={
                            <Icon
                            type="ionicon"
                            name="checkmark-circle"
                            size={40}
                            color="#496076"
                            iconStyle={{margin:0,padding:0,backgroundColor:'#f7f7f7'}}
                            />
                        }
                        buttonStyle={{width:50,height:50,padding:0,backgroundColor:'#f7f7f7'}}
                    />
                    </View>
                </View>
                </View>
                }
                {
                 members.length !== 0 &&  <Text style={styles.title}>Members</Text>
                }
                
                {
                showUserContact && 
                userContact.map((contact,index)=>{
                    return(
                    <TouchableOpacity key={index} onPress={()=>handleAddMember(contact.number)}>
                    <View  style={styles.contactItemHolder}>
                        <Image
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                        style={styles.contactDP}
                        />
                        <View style={styles.contactMeta}>
                            <Text style={styles.metaText}>@Anna</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[{marginRight:10,},styles.metaText]}>{contact.number}</Text>
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

            </View>
        </View>
    )
}

export default ClubMembers
const styles = StyleSheet.create({
    container:{ 
        marginHorizontal:10,
        marginVertical:20,
        backgroundColor:'#f7f7f7',
        borderWidth:1,
        borderColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:20,
        borderRadius:20,
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
        marginBottom:10,
        alignItems:'center'
    },
    contactListHolder:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    title:{
        fontSize:17,
        fontWeight:'bold',
        paddingBottom:10,
        color:'#333333'
    },
    metaText:{
        color:'#333333'
    }
})
