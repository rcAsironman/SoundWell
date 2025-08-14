import { View, Text, TouchableOpacity, ScrollView, Button, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import ProgressIndicator from '../components/ProgressIndicator'
import Tts from 'react-native-tts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faArrowRotateLeft, faArrowRotateRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import AudioLottie from '/Users/kmangineni/Downloads/SoundWell/assets/AudioRecording.json'
import { Player } from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';
import {
    startRecording,
    stopRecording,
    startPlayback,
    stopPlayback,
    seekPlayback,
    getDuration
} from '../services/AudioService';


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
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

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
        startRecording(currentStep);

    }

    const handleStopRecording = () => {
        const audioPath = stopRecording();
        setIsRecordingStarted(false);
        setRecordingUri(audioPath); // Assuming the recorded file is saved as 'hello.aac'
    }

    const handlePlaybackToggle = () => {
        if (!recordingUri) return;

        if (isPlaying) {
            stopPlayback();
            setIsPlaying(false);
        } else {
            
            startPlayback(
                (pos) => setPosition(pos),       // updates slider
                () => {                          // playback ended
                    setIsPlaying(false);
                    setPosition(0);
                },
                (dur) => setDuration(dur)        // set duration after player is ready
            );
            setIsPlaying(true);
        }
    };



    const skipSeconds = (seconds: number) => {
        seekPlayback(position + seconds * 1000);
        setPosition(position + seconds * 1000);
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
                        disabled={isRecordingStarted || isPlaying}
                        className='
                        px-4
                        py-2
                        rounded-full
                        
                    '
                        style={{
                            backgroundColor: isRecordingStarted || isPlaying ? 'gray' : 'black'
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
                            thumbTintColor='black'
                            minimumTrackTintColor='black'
                            minimumValue={0}
                            maximumValue={duration}
                            value={position}
                            onSlidingComplete={(value) => seekPlayback(value)}
                        />


                        <View style={styles.playbackControls}>
                            <TouchableOpacity
                                onPress={() => skipSeconds(-3)}
                                className='
                                bg-black
                                justify-center
                                items-center
                                rounded-full
                                p-2
                                h-12
                                w-12
                                '
                            >
                                <FontAwesomeIcon
                                    icon={faArrowRotateLeft}
                                    size={20}
                                    style={{ color: 'white' }} />

                                <Text className="
                                absolute
                                text-white
                                text-[5px]
                                font-semibold
                                
                                ">3s</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={handlePlaybackToggle} 
                            className='
                            mt-2
                            '
                            >
                                <FontAwesomeIcon
                                    icon={isPlaying ? faPause : faPlay}
                                    size={30}
                                    style={{ color: 'black' }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => skipSeconds(3)}
                                className='
                                bg-black
                                justify-center
                                items-center
                                rounded-full
                                p-2
                                h-12
                                w-12
                                '
                            >
                                <FontAwesomeIcon
                                    icon={faArrowRotateRight}
                                    size={20}
                                    style={{ color: 'white' }} />

                                <Text className="absolute
                                text-white
                                text-[5px]
                                font-semibold
                                ">3s</Text>
                            </TouchableOpacity>
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
                        onPress={isRecordingStarted ? handleStopRecording : handleRecording}
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
        color: 'black',
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