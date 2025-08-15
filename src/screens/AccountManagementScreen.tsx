import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Text  from '../components/Text';

const AccountManagementScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  const navigateBack = () => {
    navigation.goBack(); // Assuming you are using React Navigation
  };

  const Button = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
            {/* Header */}
            <TouchableOpacity className='
            bg-gray-200
            h-12
            w-12
            rounded-full
            '
            onPress={() => {navigation.reset({
              index: 0,
              routes: [{ name: 'Profile' }],
            })}}
            >
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    size={18}
                    color="#000"
                    style={{ alignSelf: 'center', marginTop: 12 }}
                />
            </TouchableOpacity>
            <Text className='text-white text-2xl font-bold ml-4'>Account Management</Text>
            
        </View>
{/* Buttons */}
<View style={styles.buttonsContainer}>
        {/* Change My Daily Reminder Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangeReminder')}
          className='
          bg-gray-200
          py-4
          items-center
          justify-center
          mt-8
          mx-4
          rounded-lg
          '
          style={{
              elevation: 2,
  
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
          }}
        >
          <Text className='font-semibold'>Change My Daily Reminder</Text>
        </TouchableOpacity>

        {/* Change Reminder Style Button */}
        <TouchableOpacity
          className='
          bg-gray-200
          py-4
          items-center
          justify-center
          mt-8
          mx-4
          rounded-lg
          '
          style={{
              elevation: 2,
  
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
          }}

          onPress={() => navigation.navigate('ChangeReminderStyle')}
        >
          <Text className='font-semibold'>Change Reminder Style</Text>
        </TouchableOpacity>

        {/* Delete My Family Member Account Button */}
        <TouchableOpacity
          onPress={() => {navigation.navigate('DeleteFamilyMember')}}
          className='
          bg-gray-200
          py-4
          items-center
          justify-center
          mt-8
          mx-4
          rounded-lg
          '
          style={{
              elevation: 2,
  
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
          }}
>
          <Text className='font-semibold'>Delete My Family Member Account</Text>
        </TouchableOpacity>

        {/* Delete My Account Button */}
        <TouchableOpacity
          onPress={() => {navigation.navigate('DeleteAccount')}}
          className='
          bg-red-500
          py-4
          items-center
          justify-center
          mt-8
          mx-4
          rounded-lg
          '
          style={{
              elevation: 2,
  
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
          }}

        >
          <Text className='text-white font-semibold'>Delete My Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light grey background
  },
  
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#dc2626', // Red color
    marginBottom: 32,

  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default AccountManagementScreen;