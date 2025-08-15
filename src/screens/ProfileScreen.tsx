import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
    launchImageLibrary,
    type ImageLibraryOptions,
    type ImagePickerResponse,
} from 'react-native-image-picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Text  from '../components/Text';

// Local default image
const DEFAULT_PROFILE_IMAGE = require('/Users/kmangineni/Downloads/SoundWell/assets/profileImg.jpg');

const ProfileScreen = ({navigation}: {navigation: any}) => {
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top;

    const [profileImageUri, setProfileImageUri] = useState<string | null>();
    const [showImagePreview, setShowImagePreview] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%'], []);

    const imageSource = profileImageUri ? { uri: profileImageUri } : DEFAULT_PROFILE_IMAGE;

    const openBottomSheet = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const handleUploadImage = useCallback(() => {
        bottomSheetRef.current?.close();
        const options: ImageLibraryOptions = { mediaType: 'photo', quality: 0.8 };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('ImagePicker Error: ', response.errorCode);
                Alert.alert('Error', `ImagePicker Error: ${response.errorCode}`);
            } else if (response.assets && response.assets.length > 0) {
                const newUri = response.assets[0].uri;
                if (newUri) setProfileImageUri(newUri);
            }
        });
    }, []);

    const handleViewImage = useCallback(() => {
        bottomSheetRef.current?.close();
        setTimeout(() => {
            setShowImagePreview(true);
        }, 150);
    }, []);

    const handleClosePreview = useCallback(() => {
        // This is the key change: Hide the preview and reset the bottom sheet's state.
        setShowImagePreview(false);
        setTimeout(() => {
            bottomSheetRef.current?.close();
        }, 150);
    }, []);

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1">
                {/* Header */}
                <View
                    className="bg-soundWell-primary h-36 flex-row items-center px-4"
                    style={{ paddingTop }}
                >
                    <TouchableOpacity className="h-12 w-12 rounded-full bg-white items-center justify-center"
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                      })}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} size={18} color="#000" />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold ml-4">Profile</Text>
                </View>

                {/* Profile Image */}
                <View className="items-center" style={{ marginTop: 24 }}>
                    <TouchableOpacity onPress={openBottomSheet}>
                        <Image
                            source={imageSource}
                            style={{
                                height: 128,
                                width: 128,
                                borderRadius: 64,
                                borderWidth: 2,
                                borderColor: '#fff',
                            }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>

                <Text className="text-center text-lg font-semibold mt-6">John Smith</Text>
                <Text className="text-center text-lg font-semibold mt-2 mb-8">john@gmail.com</Text>

                <TouchableOpacity
                    className='
        bg-gray-200
        py-4
        items-center
        justify-center
        mt-8
        mx-8
        rounded-lg
        '
                    style={{
                        elevation: 2,

                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                    }}
                onPress={() => navigation.navigate('AccountManagement')}
                
                >
                    <Text className='
            font-semibold
            '>Account Management</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className='
        bg-gray-200
        py-4
        items-center
        justify-center
        mt-8
        mx-8
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
                    <Text className='
            font-semibold
            '>FAQ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className='
        bg-gray-200
        py-4
        items-center
        justify-center
        mt-8
        mx-8
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
                    <Text className='
            font-semibold
            '>Contact Us</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className='
        bg-red-500
        py-4
        items-center
        justify-center
        mt-8
        mx-8
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
                    <Text className='
            font-semibold
            '>Logout</Text>
                </TouchableOpacity>

                {/* Bottom Sheet */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose
                >
                    <BottomSheetView className="flex-1 p-6 items-center">
                        <TouchableOpacity
                            onPress={handleViewImage}
                            className="w-full p-4 bg-gray-100 rounded-lg mb-2 items-center"
                        >
                            <Text className="text-lg">View Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleUploadImage}
                            className="w-full p-4 bg-gray-100 rounded-lg mb-2 items-center"
                        >
                            <Text className="text-lg">Upload a New Image</Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>
            </View>

            {/* Full-screen Preview */}
            {showImagePreview && (
                <View className="bg-gray-100 items-center justify-center w-full h-full">
                    <TouchableOpacity
                        onPress={handleClosePreview}
                        className="absolute top-12 right-6 p-2 rounded-full bg-white"
                    >
                        <FontAwesomeIcon icon={faTimes} size={24} color="black" />
                    </TouchableOpacity>
                    <View
                        className='h-64 w-64 rounded-full'
                    >
                        <Image
                            source={imageSource}
                            style={{ width: '100%', height: '100%', borderRadius: 50, }}
                            resizeMode="cover"
                        />
                    </View>
                </View>
            )}



        </GestureHandlerRootView>
    );
};

export default ProfileScreen;