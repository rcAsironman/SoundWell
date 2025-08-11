import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-native-slide-to-unlock';
import { StackScreenProps } from '@react-navigation/stack';

// Define the type for the navigation stack's parameters.
// Replace 'RootStackParamList' with your actual stack param list name.
type RootStackParamList = {
    AccountManagement: undefined;
    DeleteMyAccount: undefined;
};

// Define the props for the component using StackScreenProps
type DeleteMyAccountScreenProps = StackScreenProps<RootStackParamList, 'DeleteMyAccount'>;

const DeleteMyAccountScreen: FC<DeleteMyAccountScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top;

    // Hardcoded user data to be displayed on the screen
    const user = {
        name: "John Smith",
        email: "johnsmith@gmail.com",
        profileUrl: "/Users/kmangineni/Downloads/SoundWell/assets/profileImg.jpg" // Replace with actual user image
    };

    const handleDelete = () => {
        Alert.alert(
            'Account Deleted',
            'Your account has been successfully deleted.',
            [{ text: 'OK', onPress: () => navigation.navigate('AccountManagement') }]
        );
        // Add your actual account deletion logic here (e.g., API call)
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
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size={18}
                        color="#000"
                        style={{ alignSelf: 'center', marginTop: 12 }}
                    />
                </TouchableOpacity>
                <Text className='text-white text-2xl font-bold ml-4'>Delete</Text>
            </View>

            <View style={styles.contentContainer}>
                {/* Profile Section */}
                <View
                    className="
                        w-full
                        p-8
                        rounded-xl
                        items-center
                        mt-10
                    "
                    style={{
                        ...Platform.select({
                            ios: {
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.15,
                                shadowRadius: 3.84,
                            },
                            android: {
                                elevation: 5,
                            },
                        }),
                    }}
                >
                    <Image
                        source={{ uri: user.profileUrl }}
                        style={styles.profileImage}
                    />
                    <Text className='text-xl font-bold mt-2'>{user.name}</Text>
                    <Text className='text-base text-gray-500'>{user.email}</Text>
                </View>

                {/* Confirmation and Slider */}
                <View
                    className="
                        bg-gray-100
                        w-full
                        p-8
                        rounded-2xl
                        mt-4
                        items-center
                    "
                >
                    <Text className='text-lg text-center mb-6'>
                        Are you sure you want to delete your account?
                    </Text>
                    <View style={styles.sliderWrapper}>
                        <Slider
                            onEndReached={handleDelete}
                            containerStyle={{
                                margin: 8,
                                backgroundColor: 'white',
                                borderRadius: 50,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '95%',
                                height: 60
                            }}
                            sliderElement={
                               <View
                               className='
                               h-[60px]
                               w-[60px]
                               bg-soundWell-primary
                               justify-center
                               items-center
                               rounded-full
                               '
                               >
                                 <FontAwesomeIcon
                                icon={faAngleRight}
                                size={24}
                                />
                               </View>
                            }
                        >
                            <Text className='text-gray-400'>{'Delete My Account'}</Text>
                        </Slider>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    // The header styles are handled by className, so we'll only define styles for other components
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gold', // Placeholder color for the icon
    },
    sliderWrapper: {
        width: '100%',
        height: 60,
    },
    sliderContainer: {
        borderRadius: 30,
        backgroundColor: '#ccc',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderElementContainer: {
        backgroundColor: '#cdadad', // A red color for the delete slider thumb
    },
    sliderChildrenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DeleteMyAccountScreen;