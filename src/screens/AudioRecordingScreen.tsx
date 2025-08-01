import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import ProgressIndicator from '../components/ProgressIndicator'

const AudioRecordingScreen = () => {
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
       px-4
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
            <Text className='text-xl '>Sentences 1/6</Text>
            <TouchableOpacity>
                <Text className='
                text-red-500
                font-semibold
                text-xl
                '>Exit</Text>
            </TouchableOpacity>
        </View>
         <ProgressIndicator/>
       </View>
    </View>
  )
}

export default AudioRecordingScreen