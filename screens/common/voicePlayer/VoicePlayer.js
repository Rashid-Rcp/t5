import React,{useCallback,useState, useEffect} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import RangeSlider from 'rn-range-slider';
import Thumb  from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import { Audio } from 'expo-av';
import {Icon} from 'react-native-elements';

const VoicePlayer = ({soundUrl, duration}) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const[progressPosition, setProgressPosition] = useState(0);
  const[durationMills, setDurationMills] = useState();
  const[positionMills,setPositionMills ] = useState();
  const [playingSound, setPlayingSound] = useState();
  const[isPlaying, setIsPlaying] = useState(false);
  const[voiceDuration, setVoiceDuration] = useState({m:0,s:0});

  useEffect(() => {
    return playingSound
      ? () => {
          console.log('Unloading Sound');
          playingSound.unloadAsync(); }
      : undefined;
  }, []);

  useEffect(()=>{
    let VD= {...voiceDuration};
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    VD.m=minutes;
    VD.s=seconds;
    setVoiceDuration(VD);

  },[duration])

  const onTouchEndHandle=(low)=>{
      if(!playingSound){
        return;
      }
    let position = (low/100)*durationMills;
    console.log('end');
    console.log(low);
    console.log(position)
    setProgressPosition(low);
    playingSound.playFromPositionAsync(position);
  }

  const onTouchStartHandle = () =>{
    if(playingSound != null){
       playingSound.pauseAsync();
     }
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
        { uri: soundUrl },
        { progressUpdateIntervalMillis: 1000},
        onPlaybackStatusUpdate
    );
    console.log('Playing Sound');
    await sound.playAsync(); 
    setPlayingSound(sound);
    setIsPlaying(true);
   
}

const pauseSound = ()=>{
    if(playingSound != null){
       playingSound.pauseAsync();
       setIsPlaying(false);
     }
}
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
        setIsPlaying(false)
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  }
    return (
        <View style={styles.container}>
            <View style={{flex:1}}>
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
                <Text style={{color:'#333333',marginTop:3}}>{voiceDuration.m}:{voiceDuration.s}</Text>
            </View>
            <Icon type="antdesign" name={isPlaying?"pausecircle":"play"} color={'#496076'}
             onPress={isPlaying?pauseSound :playSound} size={40}
             containerStyle={{marginBottom:20,}}
             />
        </View>
    )
}

export default VoicePlayer;
const styles = StyleSheet.create({
 container:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
 }
});
