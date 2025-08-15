import { View,  FlatList, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { users } from '../data/users';
import Text  from '../components/Text';

// Define the type for a single user item
interface User {
  id: string; // Assuming id is a string, adjust if it's a number
  name: string;
  url: string;
}



// Define a type for the navigation stack's parameters.
// Replace 'RootStackParamList' with the actual name of your navigation stack param list.
type RootStackParamList = {
  AccountManagement: undefined;
  DeleteAccount: undefined;
};

// Define the props for the component using StackScreenProps
type DeleteAccountScreenProps = StackScreenProps<RootStackParamList, 'DeleteAccount'>;

const DeleteAccountScreen: FC<DeleteAccountScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  const handleDeleteAccount = (userId: string, userName: string) => {
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete ${userName}'s account? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            console.log(`Deleting user with ID: ${userId}`);
            // Your API call or state update logic goes here
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderProfileItem = ({ item }: { item: User }) => (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.url }}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{item.name}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteAccount(item.id, item.name)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className='flex-1'>
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
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            size={18}
            color="#000"
            style={{ alignSelf: 'center', marginTop: 12 }}
          />
        </TouchableOpacity>
        <Text className='text-white text-2xl font-bold ml-4'>Delete Account</Text>
      </View>

      {/* Scrollable body with profile cards */}
      <FlatList
        data={users}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderProfileItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardWrapper: {
    width: '48%',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    height: 220,
    alignItems: 'center',
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  nameText: {
    fontSize: 16,
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DeleteAccountScreen;