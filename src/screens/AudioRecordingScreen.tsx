import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import ProgressIndicator from '../components/ProgressIndicator'
import Tts from 'react-native-tts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import AudioLottie from '/Users/kmangineni/Downloads/SoundWell/assets/AudioRecording.json'

const AudioRecordingScreen = ({navigation}: {navigation: any}) => {

    const currentStep = 5;
    const totalSteps = 6;
    const audioText = `Karthik`
    
    


    const [isRecordingStarted, setIsRecordingStarted] = useState(false);
    const [isPlayClicked, setIsPlayClicked] = useState(false);

    useEffect(() => {
        // Initialize TTS
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.4); // Set the speech rate (optional)


        const handleTtsStart = () => {
            setIsPlayClicked(true);
        };

        const handleTtsFinish = () => {
            setIsPlayClicked(false);
        };

        Tts.addEventListener('tts-start', handleTtsStart)

        Tts.addEventListener('tts-finish', handleTtsFinish)

         // Clean up listeners when the component unmounts
         return () => {
            Tts.removeEventListener('tts-start', handleTtsStart);
            Tts.removeEventListener('tts-finish', handleTtsFinish);
        };
    }, []);

    const handleSpeak = async () => {
        if(!isPlayClicked){
            Tts.speak(audioText);
        }
        else{
            Tts.stop();
        }
    }

    const handleRecording = () => {
        setIsRecordingStarted(true);
        Tts.stop();
    }

    const handleRecordingStop = () => {
        setIsRecordingStarted(false)
    }

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
                onPress={() => {navigation.navigate('Home')}}
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
                        backgroundColor: isRecordingStarted? 'gray' : 'black'
                    }}
                    >
                        <Text
                            className='
            font-bold
            text-white
            '>{

                isPlayClicked? "stop" : "play"
            }</Text>
                    </TouchableOpacity>

                </View>

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
                    backgroundColor: isRecordingStarted? 'black' : '#94abfe'
                }}
                        onPress={() => {
                            isRecordingStarted ? handleRecordingStop() : handleRecording()
                        }}
                    >
                        <Text
                            className='font-semibold'
                            style={{
                                color: isRecordingStarted? 'white' : 'black'
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

export default AudioRecordingScreen