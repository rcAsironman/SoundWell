import { Text as RNText, Platform } from 'react-native';

if (Platform.OS === 'android') {
  const TextAny = RNText as any; // bypass TS type error
  const defaultStyle = TextAny.defaultProps?.style || {};
  TextAny.defaultProps = {
    ...TextAny.defaultProps,
    style: [{ fontFamily: 'Roboto' }, defaultStyle],
  };
}



import "./global.css"
import {  View } from "react-native";
import LoginScreen from "./src/screens/authScreens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'react-native';
import RNBootSplash from "react-native-bootsplash"
import { useEffect } from "react";
import RegisterScreen from "./src/screens/authScreens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/authScreens/ForgotPasswordScreen";
import Toast from "react-native-toast-message";
import ToastComponent from "./src/components/ToastComponent";
import PersonalInfo from "./src/screens/PersonalInfo";
import HomeScreen from "./src/screens/HomeScreen";
import HeaderComponent from "./src/components/HeaderComponent";
import AudioRecordingScreen from "./src/screens/AudioRecordingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RootNavigation from "./src/navigation/RootNavigation";
import AudioRecorderAndPlayer from "./src/screens/AudioRecorderAndPlayer";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function App() {
  const statusBarColor = '#94abfe'; 
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      let microphonePermission;
      let storagePermission;
  
      // Request Microphone Permission
      if (Platform.OS === 'ios') {
          microphonePermission = PERMISSIONS.IOS.MICROPHONE;
      } else if (Platform.OS === 'android') {
          microphonePermission = PERMISSIONS.ANDROID.RECORD_AUDIO;
      }
  
      // Only call request if microphonePermission has a value
      if (microphonePermission) {
          const micResult = await request(microphonePermission);
          if (micResult === RESULTS.GRANTED) {
              console.log('Microphone permission granted.');
          } else {
              console.warn('Microphone permission denied.');
          }
      }
  
      // Request Storage/Photo Library Permission
      if (Platform.OS === 'ios') {
          storagePermission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      } else if (Platform.OS === 'android') {
          storagePermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      }
  
      // Only call request if storagePermission has a value
      if (storagePermission) {
          const storageResult = await request(storagePermission);
          if (storageResult === RESULTS.GRANTED) {
              console.log('Storage/Photo Library permission granted.');
          } else {
              console.warn('Storage/Photo Library permission denied.');
          }
      }
  };

    requestPermissions();
  }, []);
  
  return (
    <SafeAreaProvider  style={{flex: 1}}>
       <View style={{flex:1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={statusBarColor}
        translucent={false}
      />
      {/* <AudioRecorderAndPlayer/> */}
        <RootNavigation/>
        {/* <AudioRecordingScreen/> */}
        {/* <HomeScreen/> */}
        {/* <PersonalInfo/> */}
        {/* <ForgotPasswordScreen/> */}
        {/* <RegisterScreen/> */}
        {/* <LoginScreen/> */}
       <ToastComponent/>
       </View>
    </SafeAreaProvider>
  );
}