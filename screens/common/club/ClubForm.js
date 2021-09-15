import React,{useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input,Button,CheckBox } from 'react-native-elements';
const ClubForm = () => {

    const[clubName, setClubName] = useState('');
    const[clubDescription, setClubDescription] = useState('');
    const[clubTags, setClubTags] = useState('');

    const submitClubFormStep1= ()=>{
        console.log('ok');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Club</Text>
            <View style={styles.formHolder}>
                <View style={styles.formGroup}>
                    <Input placeholder="Enter club name here" 
                    label="Club Name"
                    labelStyle={styles.label}
                    inputContainerStyle={styles.textBoxContainer}
                    style={styles.textBox}
                    onChangeText={value => setClubName(value)} />
                </View>
                <View style={styles.formGroup}>
                    <Input placeholder="Enter club tags here, separated by comma." 
                    label="Club Tags"
                    labelStyle={styles.label}
                    inputContainerStyle={styles.textBoxContainer}
                    style={styles.textBox}
                    multiline = {true}
                    numberOfLines = {2}
                    onChangeText={value => setClubTags(value)} />
                </View> 
                <View style={styles.formGroup}>
                    <Input placeholder="Enter club description here." 
                    label="Club Description"
                    labelStyle={styles.label}
                    style={styles.textBox}
                    inputContainerStyle={styles.textBoxContainer}
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText={value => setClubDescription(value)} />
                </View>
                <View style={styles.formGroup}>
                    <CheckBox
                    left
                    title='Its Public'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={false}
                    textStyle={{color:'#333333'}}
                    containerStyle={{backgroundColor:'#f7f7f7',borderColor:'#f7f7f7',paddingHorizontal:0,paddingVertical:0,}}
                    />
                    <Text style={styles.helperText}>Anyone can join to the club and view all contents.</Text>
                </View>
                <View style={styles.formGroup}>
                    <CheckBox
                    left
                    title='Its Private'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={false}
                    textStyle={{color:'#333333'}}
                    containerStyle={{backgroundColor:'#f7f7f7',borderColor:'#f7f7f7',paddingHorizontal:0,paddingVertical:0,}}
                    />
                    <Text style={styles.helperText}>Only admin can add members to the club, and only members can view the contents.</Text>
                </View>
                
                <View style={styles.buttonHolder}>
                    <Button title="Next" type="outline" onPress={submitClubFormStep1} />
                </View>
                
            </View>
        </View>
    )
}

export default ClubForm

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        marginVertical:50,
        paddingVertical:50,
        backgroundColor:'#f7f7f7',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:20,
        padding:10,
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
    }
    
});