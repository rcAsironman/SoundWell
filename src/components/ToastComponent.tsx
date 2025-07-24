import { View, Text } from 'react-native'
import React from 'react'
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastColors } from '../constants/colors';

const ToastComponent = () => {

    const insets = useSafeAreaInsets();
    const paddingTop = insets.top; // Adjust padding for Android
    return (
        <Toast
            config={{
                success: ({ text1, text2 }) => (
                   <View className='w-[80%] rounded-[20px] py-4 px-4' 
                   style={{
                    marginTop: paddingTop - 10,
                    backgroundColor: ToastColors.success || '#4CAF50', // Default to green if not defined
                   }}
                   >
                        <Text className='text-lg font-semibold' style={{color: ToastColors.textColor}}>{text1}</Text>
                        <Text className='text-sm' style={{color: ToastColors.textColor}}>{text2}</Text>
                   </View>
                ),
                warning: ({ text1, text2 }) => (
                    <View className='w-[80%] rounded-[20px] py-4 px-4'
                    style={{
                        marginTop: paddingTop - 10,
                        backgroundColor: ToastColors.warning || '#FF9800', // Default to yellow if not defined
                    }}
                    >
                        <Text className='text-lg font-semibold' style={{color: ToastColors.textColor}}>{text1}</Text>
                        <Text className='text-sm' style={{color: ToastColors.textColor}}>{text2}</Text>
                    </View>
                ),
                error: ({ text1, text2 }) => (
                    <View className='w-[80%] rounded-[20px] py-4 px-4'
                    style={{
                        marginTop: paddingTop - 10,
                        backgroundColor: ToastColors.error || '#F44336', // Default to red if not defined
                    }}
                    >
                        <Text className='text-lg font-semibold' style={{color: ToastColors.textColor}}>{text1}</Text>
                        <Text className='text-sm' style={{color: ToastColors.textColor}}>{text2}</Text>
                    </View>
                ),
            }}

        />
    )
}

export default ToastComponent