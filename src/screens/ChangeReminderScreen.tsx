import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import { showErrorToast, showSuccessToast } from '../utils/toast';

// Assuming you have a navigation object from React Navigation
const ChangeReminderScreen = ({ navigation }:{navigation: any}) => {
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top;

    const [date, setDate] = useState(new Date());

    const handleSaveReminder = () => {
        // Here you would save the selected time
        showSuccessToast("Reminder Set", `Your daily reminder is set for: ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`, 3000);        navigation.goBack();
    };  

    const handleCancel = () => {
        showErrorToast("Cancelled", "You have cancelled the reminder change.", 3000);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View
                className='bg-soundWell-primary 
                h-36 
                flex-row
                justify-start
                items-center
                px-4
                '
                style={{ paddingTop: paddingTop }}
            >
                <TouchableOpacity
                    className='
                    bg-gray-200
                    h-12
                    w-12
                    rounded-full
                    '
                    onPress={() => { navigation.goBack() }}
                >
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size={18}
                        color="#000"
                        style={{ alignSelf: 'center', marginTop: 12 }}
                    />
                </TouchableOpacity>
                <Text className='text-white text-2xl font-bold ml-4'>Change My Daily Reminder</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.pickerLabel}>Set Reminder Time</Text>
                
                {/* Time Picker */}
                <DatePicker
                    date={date}
                    onDateChange={setDate}
                    mode="time"
                    androidVariant="iosClone" // To match the visual style in the screenshot
                    locale="en"
                    is24hourSource="device"
                    textColor="#000"
                />

                {/* Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={handleCancel}>
                        <Text style={styles.cancelButton}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSaveReminder}>
                        <Text style={styles.okButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    pickerLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 30,
    },
    cancelButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888',
        marginHorizontal: 20,
    },
    okButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e3a8a', // Using the same blue from the header
        marginHorizontal: 20,
    },
});

export default ChangeReminderScreen;