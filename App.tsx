import "./global.css"
import { Text, View } from "react-native";
import LoginScreen from "./src/screens/authScreens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Platform } from 'react-native';
import RNBootSplash from "react-native-bootsplash"
import { useEffect } from "react";

export default function App() {
  const statusBarColor = '#DA2820'; // or '#DA2829'
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    const init = async () => {
      // Simulate some loading (e.g., API, fonts, etc)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 2 seconds

      // Then hide splash
      RNBootSplash.hide({ fade: true });
    };

    init();
  }, []);
  return (
    <SafeAreaProvider  style={{flex: 1}}>
       {isAndroid && (
        <View style={{ height: 24, backgroundColor: statusBarColor }} />
      )}

      <StatusBar
        barStyle="dark-content"
        backgroundColor={statusBarColor}
        translucent={false}
      />
         <LoginScreen/>
    </SafeAreaProvider>
  );
}