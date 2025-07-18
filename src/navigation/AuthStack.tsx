import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={require('../screens/authScreens/LoginScreen').default} />
            <Stack.Screen name="Register" component={require('../screens/authScreens/RegisterScreen').default} />
            <Stack.Screen name="ForgotPassword" component={require('../screens/authScreens/ForgotPasswordScreen').default} />
        </Stack.Navigator>
    )
}