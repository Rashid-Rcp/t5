import React,{useState, useEffect, useCallback} from 'react'
import { View, Text,StyleSheet, TouchableOpacity,Button, PermissionsAndroid } from 'react-native'
// import { Constants } from 'react-native-unimodules';
import { Audio } from 'expo-av';
import {Icon} from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
//import RNFetchBlob from 'rn-fetch-blob';
import RangeSlider from 'rn-range-slider';

import Thumb  from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';

const AudioTest = () => {
  
    const [recording, setRecording] = useState();
    const [playingSound, setPlayingSound] = useState();
    const[soundUrl, setSoundUrl] = useState('https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3');
    const[isPlaying, setIsPlaying] = useState(false);
    const[progressPosition, setProgressPosition] = useState(0);
    const[durationMills, setDurationMills] = useState();
    const[positionMills,setPositionMills ] = useState();
    //console.log( FileSystem.documentDirectory);
    const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

    async function saveTOLocal(){
      RNFetchBlob.fs.exists(soundUrl)
      .then((exist) => {
          console.log(`file ${exist ? '' : 'not'} exists`)
      })
      .catch(() => {  })
    const API = 'http://192.168.43.50:80/t5-laravel/T5-APP/public/api/upload_test';
     await RNFetchBlob.fetch('POST', API, {
        'Content-Type' : 'multipart/form-data',
      }, 
      [
        { name : 'name', data : 'user'},
        { name : 'testAudio', filename : 'testAudio.m4a', type:'audio/m4a', data: RNFetchBlob.wrap(soundUrl)}
      ])
      .then((res) => {
        console.log(res.text())
      })
      .catch((err) => {
        // error handling ..
      })
    }

    useEffect(() => {
      return playingSound
        ? () => {
            console.log('Unloading Sound');
            playingSound.unloadAsync(); }
        : undefined;
    }, []);

    

    // console.log(Constants.systemFonts);
    const onPlaybackStatusUpdate = (status)=>{
      if (status.isLoaded) {
        //console.log(status.positionMillis);
        //console.log(status.durationMillis);
        let Position = (status.positionMillis/status.durationMillis)*100;
       // console.log(Position);
        setDurationMills(status.durationMillis);
        setPositionMills(status.positionMillis)
        setProgressPosition(Position)

        if (status.didJustFinish && !status.isLooping) {
          setProgressPosition(0);
        }
      } else {
        if (status.error) {
          console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }
      }
    }

   

    async function playSound() {
        console.log('Loading Sound');
        console.log(soundUrl);
        const { sound } = await Audio.Sound.createAsync(
            { uri: soundUrl },
            { progressUpdateIntervalMillis: 1000},
            onPlaybackStatusUpdate
        );
       
        console.log('Playing Sound');
        await sound.playAsync(); 
        setPlayingSound(sound);
       
    }
    async function startRecording() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync(
            {
              isMeteringEnabled: true,
              android: {
                extension: '.acc',
                outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AAC_ADTS,
                audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                sampleRate: 44100,
                numberOfChannels: 2,
                bitRate: 128000,
              },
              ios: {
                extension: '.caf',
                audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
                sampleRate: 44100,
                numberOfChannels: 2,
                bitRate: 128000,
                linearPCMBitDepth: 16,
                linearPCMIsBigEndian: false,
                linearPCMIsFloat: false,
              }
            }
          );
          setRecording(recording);
          console.log('Recording started');
         const status =  recording.getStatusAsync();
         console.log(status);
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }
    
      async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        setSoundUrl(uri);
        console.log('Recording stopped and stored at', uri);
      }

      function getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);
    
        const padWithZero = number => {
          const string = number.toString();
          if (number < 10) {
            return "0" + string;
          }
          return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
      }
      
      const onTouchEndHandle=(low)=>{
      
        let position = (low/100)*durationMills;
        console.log('end');
        setProgressPosition(low)
        playingSound.playFromPositionAsync(position);
      }

      const onTouchStartHandle = () =>{
        if(playingSound != null){
           playingSound.pauseAsync();
         }
      }

      const handleOnValueChanged = (low)=>{
      
        if(playingSound != null){
         // playingSound.pauseAsync();
        }
        
      }

    return (
        <View style={styles.container}>
            <Text>Audio Test</Text>
            <Button
             title={recording ? 'Stop Recording' : 'Start Recording'}
             onPress={recording ? stopRecording : startRecording}
            />
             <Button title="Play Sound" onPress={playSound} />
             <View style={styles.playHolder}>
              <Icon type="antdesign" name={isPlaying?"pausecircle":"play"} color={'#333333'} onPress={playSound} size={50}/>
              <RangeSlider
               min={0} 
               max={100} 
               step={1}
               low={progressPosition}
               disableRange={true}
               renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              onTouchEnd={onTouchEndHandle}
              onTouchStart = {onTouchStartHandle}
             // onValueChanged={handleOnValueChanged} 
              />
             </View>
             <Button title="Save Sound" onPress={saveTOLocal} />
           
        </View>
    )
}

export default AudioTest

const styles = StyleSheet.create({
    container:{

    },
    playHolder:{
      marginVertical:10,
      backgroundColor:'#f7f7f7',
      paddingHorizontal:20,
    }
})
