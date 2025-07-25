import "./global.css"
import { Text, View } from "react-native";
import LoginScreen from "./src/screens/authScreens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Platform } from 'react-native';
import RNBootSplash from "react-native-bootsplash"
import { useEffect } from "react";
import RegisterScreen from "./src/screens/authScreens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/authScreens/ForgotPasswordScreen";
import Toast from "react-native-toast-message";
import ToastComponent from "./src/components/ToastComponent";
import PersonalInfo from "./src/screens/PersonalInfo";

export default function App() {
  const statusBarColor = 'white'; // or '#DA2829'
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);
  return (
    <SafeAreaProvider  style={{flex: 1}}>
       <View style={{flex:1, backgroundColor: 'white'}}>
       {isAndroid && (
        <View style={{ height: 24, backgroundColor: statusBarColor }} />
      )}

      <StatusBar
        barStyle="dark-content"
        backgroundColor={statusBarColor}
        translucent={false}
      />
      <PersonalInfo/>
        {/* <ForgotPasswordScreen/> */}
         {/* <RegisterScreen/> */}
         {/* <LoginScreen/> */}
       <ToastComponent/>
       </View>
    </SafeAreaProvider>
  );
}