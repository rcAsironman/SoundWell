import { View, Text, Image, TouchableOpacity  } from 'react-native'
import React from 'react'

const HelpfulLinkCardComponent = ({imgUrl, url}:{imgUrl: string, url: string}) => {
  return (
    <TouchableOpacity 
    className='
    bg-soundWell-primary
    h-40
    w-64
    rounded-lg
    m-2
    '
    >
      <Image
      source={{uri: imgUrl}}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
      }}
      />
    </TouchableOpacity >
  )
}

export default HelpfulLinkCardComponent