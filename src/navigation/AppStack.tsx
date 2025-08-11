import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AccountManagementScreen from "../screens/AccountManagementScreen";
import AudioRecordingScreen from "../screens/AudioRecordingScreen";
import PersonalInfo from "../screens/PersonalInfo";
import ProfileScreen from "../screens/ProfileScreen";
import ProfilesScreen from "../screens/ProfilesScreen";
import ChangeReminderScreen from "../screens/ChangeReminderScreen";
import ChangeReminderStyleScreen from "../screens/ChangeReminderStyleScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import DeleteMyAccountScreen from "../screens/DeleteMyAccountScreen";

const Stack = createNativeStackNavigator();
const len = 1;
export const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {
                len > 0 && (
                    <Stack.Screen name="Profiles" component={ProfilesScreen} />

                )
            }
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
            <Stack.Screen name="AudioRecording" component={AudioRecordingScreen} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ChangeReminder" component={ChangeReminderScreen} />
            <Stack.Screen name="ChangeReminderStyle" component={ChangeReminderStyleScreen} />
            <Stack.Screen name="DeleteFamilyMember" component={DeleteAccountScreen} />
            <Stack.Screen name="DeleteAccount" component={DeleteMyAccountScreen} />
        </Stack.Navigator>
    )
}