import {
    View,
    Text,
    Platform,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    StyleSheet,
    TouchableOpacity

} from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer, faEnvelope } from '@fortawesome/free-solid-svg-icons/'
import { faEnvelope as farEnvelope, } from '@fortawesome/free-regular-svg-icons'

type UserInputs = {
    email: string;
    password: string;
}

const LoginScreen = () => {
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top; // Adjust padding for Android
    const paddingBottom = Platform.OS === 'android' ? insets.bottom : 0; // Adjust padding for Android


    const [userInputs, setUserInputs] = useState<UserInputs>({
        email: '',
        password: '',
    })

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 300,

                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className='flex-1 bg-white px-8 md:px-16'
                        style={{
                            paddingTop: paddingTop,
                            paddingBottom: paddingBottom,

                        }}
                    >
                        <View className='flex-row items-center justify-between md:mt-[80px]'>
                            <View>
                                <Text className='text-soundWell-textColor text-3xl font-semibold tracking-[1px] md:text-4xl'>Welcome to,</Text>
                                <Text className='text-soundWell-primary text-2xl font-semibold mt-[5px] tracking-[1px] md:text-3xl'>SoundWell</Text>
                            </View>

                            <Image
                                source={require("../../../assets/logo_only.png")}
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                        <Text className='text-2xl font-medium tracking-[1px] mt-8 md:text-[30px] md:mt-[105px]'>Login</Text>

                        <View className='mt-24'>
                            <TextInput
                                className='text-[18px] mt-[10px] border-b pb-2 pl-1 md:text-[28px] md:mt-[20px]'
                                placeholder='Email'
                                onChangeText={(text) => setUserInputs(prev => ({ ...prev, email: text }))}
                            />
                            <TextInput
                                placeholder='Password'
                                onChangeText={(text) => setUserInputs(prev => ({ ...prev, password: text }))}
                                className='text-[18px] mt-[50px] border-b pb-2 pl-1 md:text-[28px] md:mt-[90px]'
                            />
                        </View>
                        <View className='mt-[10px]'>
                            <Text className='text-soundWell-primary text-[12px] font-medium tracking-[1px] text-right md:mt-[30px] md:text-2xl'>Forgot password?</Text>
                        </View>
                    </View>
                    <View className='flex-1 items-center justify-end mt-40'>
                        <View className='w-full px-8'>
                            <TouchableOpacity className='bg-soundWell-primary rounded-full py-3 md:h-[70px] flex items-center justify-center'>
                                <Text className='text-white text-center font-semibold text-lg tracking-[1px] md:text-3xl'>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='flex-row items-center justify-center mt-[50px]'>
                            <Text className='text-soundWell-textColor text-[14px] font-medium tracking-[1px] md:text-2xl '>Don't have an account? </Text>
                            <Text className='text-soundWell-primary text-[14px] font-medium tracking-[1px] md:text-2xl '>Sign Up</Text>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
})