import React from 'react';
import { StyleSheet, View,  TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faBell, faBan } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { showSuccessToast } from '../utils/toast';
import Text  from '../components/Text';

const ChangeReminderStyleScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  // Function to handle the button press for "Notification"
  const handleNotificationPress = () => {
    // Implement your logic here
    console.log('Notification button pressed!');
    showSuccessToast("",'Notification style changed successfully!');
  };

  // Function to handle the button press for "Stop notifying me"
  const handleStopNotifyingPress = () => {
    // Implement your logic here
    console.log('Stop notifying me button pressed!');
    showSuccessToast("",'You will no longer receive notifications.');
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
        <Text className='text-white text-2xl font-bold ml-4'>Change Reminder Style</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button]} onPress={handleNotificationPress}>
          <Text style={styles.buttonText}>Notification</Text>
          <FontAwesomeIcon icon={faBell} size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.disabledButton]} onPress={handleStopNotifyingPress}>
          <Text style={styles.buttonText}>Stop notifying me</Text>
          <FontAwesomeIcon icon={faBan} size={20} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    padding: 20,
    marginTop: 100,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#dcdcdc',
  },
});

export default ChangeReminderStyleScreen;