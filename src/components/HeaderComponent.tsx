import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'


const HeaderComponent = () => {
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top;
    const nav = useNavigation();
    return (
        <View
            className='bg-soundWell-primary 
            h-36 
            flex-row
            justify-between
            items-center
            px-4
            '
            style={{ paddingTop: paddingTop }}
        >
            {/* Header */}
            <Text className='text-white text-2xl font-bold'>SoundWell</Text>
            <TouchableOpacity className='
            bg-gray-200
            h-12
            w-12
            rounded-full
            '
            onPress={() => {nav.navigate('Profile')}}
            >
                <FontAwesomeIcon
                    icon={faUser}
                    size={18}
                    color="#000"
                    style={{ alignSelf: 'center', marginTop: 12 }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderComponent