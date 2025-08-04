import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import ProgressIndicator from '../components/ProgressIndicator'
import Tts from 'react-native-tts';



const AudioRecordingScreen = () => {

    const currentStep = 5;
    const totalSteps = 6;
    const audioText = 'Karthik plays a piano perfectly.'

    useEffect(() => {
    // Initialize TTS
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5); // Set the speech rate (optional)
    }, []);

    const handleSpeak = () => {
        Tts.speak(audioText);
    }
  return (
    <View style={{
        flex: 1,

    }}
    className='
    '
    >
        <HeaderComponent/>
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
                '>Exit</Text>
            </TouchableOpacity>
        </View>
         <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps}/>

         <View
         className='
         flex-row
         justify-between
         items-center
         mt-8
         '
         >
         <Text
         className='
         text-[18px] 
         font-semibold
         '>{audioText}</Text>
         <TouchableOpacity
         onPress={handleSpeak}
         className='
         bg-black
            px-4
            py-2
            rounded-full
         '
         >
            <Text
            className='
            font-bold
            text-white
            '>play</Text>
         </TouchableOpacity>
         </View>
       </View>
    </View>
  )
}

export default AudioRecordingScreen