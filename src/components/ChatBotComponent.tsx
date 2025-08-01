import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {    faRobot } from '@fortawesome/free-solid-svg-icons'

const ChatBotComponent = () => {
  return (
    <TouchableOpacity
    className='
    absolute
    z-10
    bottom-40
    right-10
    bg-soundWell-primary
    p-4
    rounded-full

    '
    style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    }}
    >
        <FontAwesomeIcon
            icon={faRobot}
            size={24}
            color="#fff"
            style={{ alignSelf: 'center' }}     
    />
      
    </TouchableOpacity>
  )
}

export default ChatBotComponent