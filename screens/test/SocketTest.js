import React,{useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Pusher from 'pusher-js';
import pusherConfig from './pusher.json';
import axios from 'axios';

const SocketTest = () => {

    const[test,setTest] = useState('loading2..');
  
     const pusher = new Pusher(pusherConfig.key, pusherConfig); // (1)
    
        const chatChannel = pusher.subscribe('test'); // (2)
            chatChannel.bind('pusher:subscription_succeeded', () => { // (3)
                console.log('connected');
                
        });
        chatChannel.bind('server.created', function (data) {
            console.log('form socket');
            console.log(data.answer);
          });

        // chatChannel.bind('discussionAnswer', (data) => { // (4)
        //     console.log('koko');
        //     handleAnswer(data);
        // });
        // console.log('==================')
        // console.log(pusher);
        // console.log('==================')
    useEffect(()=>{
        
    },[]);

    const handleAnswer = (data)=>{
        console.log('from socket');
        console.log(data);
    }

    const testSocket = ()=>{
        axios.post(global.APILink+'/test',{test:'working..'})
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{console.log(err)})
    }
    return (
        <View>
            <Text>Socket test</Text>
            <Button title="CLICK" onPress={testSocket} />
        </View>
    )
}

export default SocketTest;
