import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showSuccessToast, showWarningToast, showErrorToast } from '../../utils/toast';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';



const Timer = 5;
const ForgotPasswordScreen = () => {

  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;
  const paddingBottom = insets.bottom; // Adjust padding for Android
  const [hasOtpSent, setHasOtpSent] = useState(false);
  const [email, setEmail] = useState('karthik@gmail.com');
  const [otp, setOtp] = useState('');
  const [isSendOtpClicked, setIsSendOtpClicked] = useState(false);
  const [timer, setTimer] = useState(Timer);
  const emailRef = useRef<TextInput>(null);

  useEffect(() => {

    let countdownTimer: NodeJS.Timeout | null = null;
    console.log("Timer started");
    if(timer > 0 && isSendOtpClicked && hasOtpSent) {
      countdownTimer = setInterval(() => {
        setTimer((previousTime) => previousTime - 1);
        console.log("Timer: ", timer);
      }, 1000)
    }

    if( timer === 0) {
      setHasOtpSent(false);
      setTimer(Timer);
    }

    return () => clearInterval(countdownTimer!);
  }, [timer, isSendOtpClicked, hasOtpSent])


  const handleOtpTrigger = () => {
      // Simulate sending OTP
      showSuccessToast("OTP Sent", "Please check your email for the OTP.", 3000);
      setHasOtpSent(true);
  }

  const handleSendOtp = () => {
    if (email.length > 0 && email.includes('@') && email.includes('.')) {
      setIsSendOtpClicked(true);
      setOtp('');
      handleOtpTrigger();
    }
    else if (email.length === 0) {
      showWarningToast("Empty Email", "Please enter your email address.", 3000);
    }
    else {
      showErrorToast("Invalid Email", "Please enter a valid email address.", 3000);
    }
  }

  const handleEditEmail = () => {
    setIsSendOtpClicked(false);
  }

  const handleVerifyOtp = () => {

    if( otp.length === 6) {
      showSuccessToast("OTP Verified", "Your OTP has been verified successfully.", 3000);
      // Navigate to the next screen or reset password
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
       
          <View className='flex-1 bg-white px-8 md:px-16'
            style={{
              paddingTop: paddingTop,
              paddingBottom: paddingBottom,

            }}
          >
            <View className='flex-row items-center justify-between md:mt-[80px] mt-[30px]'>
              <View>
                <Text className='text-soundWell-textColor text-3xl font-semibold tracking-[1px] md:text-4xl'>Update your </Text>
                <Text className='text-soundWell-textColor text-3xl font-semibold tracking-[1px] md:text-4xl'>password in just</Text>
                <Text className='text-soundWell-textColor text-3xl font-semibold tracking-[1px] md:text-4xl'>a few steps.</Text>
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

            <View
              className='mt-[90px] md:mt-[50px] mb-[20px] md:mb-[40px]'
            >
              {
                !isSendOtpClicked && (
                  <>
                    <TextInput
                      ref={emailRef}
                      placeholder='Email'
                      value={email}
                      className='text-[18px] mt-[10px] border-b pb-2 pl-1 md:text-[28px] md:mt-[20px]'
                      onChangeText={setEmail}
                      style={{
                        letterSpacing: 0,
                      }}
                    />
                    <TouchableOpacity
                      onPress={handleSendOtp}
                      className='mt-24 bg-soundWell-primary rounded-full py-3 px-6 items-center justify-center md:py-6'
                    >
                      <Text className='text-white text-xl font-semibold md:text-2xl'>Send OTP</Text>
                    </TouchableOpacity>
                  </>
                )
              }
              {
                isSendOtpClicked && (
                  <>
                    <View className='flex-row'>
                      <Text className='text-lg mb-4 text-gray-500 mr-4'>{email}</Text>
                      <TouchableOpacity
                        onPress={handleEditEmail}>
                        <FontAwesomeIcon icon={faPencil} size={20} color="#000" />
                      </TouchableOpacity>

                    </View>
                    <Text className='text-soundWell-textColor text-[14px] md:text-[24px] font-regular'>Please check your email for the OTP.</Text>
                    <TextInput
                      placeholder='Verification Code'
                      maxLength={6}
                      onChangeText={setOtp}
                      value={otp}
                      style={{
                        letterSpacing: otp.length > 0 ? 10: 0,
                        textAlign: otp.length === 0 ? "left" :'center',
                      }}
                      keyboardType='numeric'
                      className='text-[18px] mt-[50px] border-b pb-2 pl-1 md:text-[28px] md:mt-[20px]'
                    />


                    <TouchableOpacity
                      onPress={handleVerifyOtp}
                      className={` ${isSendOtpClicked && otp.length === 6 ? "bg-soundWell-primary" : "bg-gray-400"} mt-24  rounded-full py-3 px-6 items-center justify-center md:py-6`}
                    >
                      <Text className='text-white text-xl font-semibold md:text-2xl'>Verify OTP</Text>
                    </TouchableOpacity>

                    <View className='mt-12 items-center'>
                      {
                        hasOtpSent ? (
                          <Text className='text-sm text-gray-500 md:text-xl'>{`Resend OTP in ${timer} second(s)`}</Text>
                        )
                        :
                        (
                          <TouchableOpacity
                          onPress={handleOtpTrigger}
                          >
                            <Text className='text-sm text-soundWell-primary md:text-xl'>Resend OTP</Text>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                  </>
                )
              }

            </View>

          </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ForgotPasswordScreen;