import { View, Text, TouchableOpacity, ScrollView, Button, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import ProgressIndicator from '../components/ProgressIndicator'
import Tts from 'react-native-tts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import AudioLottie from '/Users/kmangineni/Downloads/SoundWell/assets/AudioRecording.json'
import { startRecording, stopRecording } from '../services/AudioService';
import { Player } from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';


const AudioRecordingScreen = ({ navigation }: { navigation: any }) => {

    const currentStep = 5;
    const totalSteps = 6;
    const audioText = `Karthik`




    const [isRecordingStarted, setIsRecordingStarted] = useState(false);
    const [isPlayClicked, setIsPlayClicked] = useState(false);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);


    // State for playback
    const [player, setPlayer] = useState<Player | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);

    useEffect(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.4);

        const startSub = Tts.addListener('tts-start', () => setIsPlayClicked(true));
        const finishSub = Tts.addListener('tts-finish', () => setIsPlayClicked(false));

        return () => {
            startSub.remove();
            finishSub.remove();
        };
    }, []);

    useEffect(() => {
        return () => {
            if (player) player.destroy();
        };
    }, [player]);

    const handleSpeak = async () => {
        if (!isPlayClicked) {
            Tts.speak(audioText);
        }
        else {
            Tts.stop();
        }
    }

    const handleRecording = () => {
        Tts.stop();
        setIsRecordingStarted(true);
        startRecording();

    }

    const handleRecordingStop = async () => {
        setIsRecordingStarted(false)
        try {
            const path = await stopRecording();
            Alert.alert(path);
            setRecordingUri(path);
        } catch (e) {
            console.error('Failed to stop recording:', e);
        }
    }

    const startPlayback = (uri: string) => {
        if (player) player.destroy();

        const newPlayer = new Player(uri, { autoDestroy: false });
        newPlayer.play(() => {
            setIsPlaying(true);
            setAudioDuration(newPlayer.duration);

            const interval = setInterval(() => {
                newPlayer.getCurrentTime((time) => setPlaybackPosition(time));
            }, 500);

            newPlayer.on('ended', () => {
                setIsPlaying(false);
                clearInterval(interval);
            });
        });
        setPlayer(newPlayer);
    };

    const stopPlayback = () => {
        if (player) {
            player.stop();
            setIsPlaying(false);
            setPlaybackPosition(0);
        }
    };

    const handlePlaybackToggle = () => {
        if (isPlaying) {
            stopPlayback();
        } else if (recordingUri) {
            startPlayback(recordingUri);
        }
    };

    const skipSeconds = (seconds: number) => {
        if (player && recordingUri) {
            let newPosition = playbackPosition + (seconds * 1000);
            newPosition = Math.max(0, Math.min(newPosition, audioDuration));
            player.seek(newPosition);
            setPlaybackPosition(newPosition);
        }
    };

    return (
        <View style={{
            flex: 1,

        }}
            className='
    '
        >
            <HeaderComponent />
            <View
                className='
       flex-1
       px-6
       '
            >
                <View
                    className='
        flex-row
        justify-between
        items-center
        mt-8
        '
                >
                    <Text className='text-xl '>Prompts {currentStep} of {totalSteps} — Read Aloud</Text>
                    <TouchableOpacity>
                        <Text className='
                text-red-500
                font-semibold
                text-xl
                '
                            onPress={() => { navigation.navigate('Home') }}
                        >Exit</Text>
                    </TouchableOpacity>
                </View>
                <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

                <View
                    className='
         flex-row
         justify-evenly
         items-start
         mt-8
         h-64
         px-2
         py-2
         '
                >
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={{
                            marginRight: 10,
                        }}
                    >
                        <Text
                            className='
                               text-[16px] 
                              '>
                            {audioText}
                        </Text>
                    </ScrollView>

                    <TouchableOpacity
                        onPress={handleSpeak}
                        disabled={isRecordingStarted}
                        className='
                        px-4
                        py-2
                        rounded-full
                        
                    '
                        style={{
                            backgroundColor: isRecordingStarted ? 'gray' : 'black'
                        }}
                    >
                        <Text
                            className='
            font-bold
            text-white
            '>{

                                isPlayClicked ? "stop" : "play"
                            }</Text>
                    </TouchableOpacity>

                </View>

                {recordingUri && (
                    <>
                     <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={audioDuration}
                            value={playbackPosition}
                            onSlidingComplete={(value) => player?.seek(value)}
                            
                        />
                        <View style={styles.playbackControls}>
                            <Button title="5s Back" onPress={() => skipSeconds(-5)}  />
                            <Button title={isPlaying ? "Stop" : "Play"} onPress={handlePlaybackToggle}  />
                            <Button title="5s Forward" onPress={() => skipSeconds(5)}  />
                        </View>

                    </>
                )}


                <View
                    style={{ flex: 1 }}
                    className='
               flex-col
               justify-end
               mb-28
               '
                >

                    {
                        isRecordingStarted ? (<>
                            <LottieView
                                source={AudioLottie}
                                style={{
                                    height: 80,
                                    width: 100,
                                    alignSelf: 'center',
                                }}
                                autoPlay
                                loop={true}
                            />
                        </>) : (
                            <Text
                                className='text-gray-300
                            text-xl
                            mb-6
                            '
                            >
                                Ready to record? Click the button to get started.
                            </Text>
                        )
                    }

                    <TouchableOpacity
                        className='
                flex-row
                justify-center
                items-center
                py-6
                mb-4
                mt-2
                rounded-full

                '
                        style={{
                            backgroundColor: isRecordingStarted ? 'black' : '#94abfe'
                        }}
                        onPress={() => {
                            isRecordingStarted ? handleRecordingStop() : handleRecording()
                        }}
                    >
                        <Text
                            className='font-semibold'
                            style={{
                                color: isRecordingStarted ? 'white' : 'black'
                            }}
                        >
                            {
                                isRecordingStarted ? "Stop Recording" : "Start Recording"
                            }
                        </Text>
                        {
                            !isRecordingStarted && (
                                <FontAwesomeIcon
                                    icon={faMicrophone}
                                    size={18}
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AudioRecordingScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    sentenceText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 40,
    },
    playbackControls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    loader: {
      marginTop: 20,
    },
  });