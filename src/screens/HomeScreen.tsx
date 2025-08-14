import { View, Text, FlatList, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HeaderComponent from '../components/HeaderComponent'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { helpfulLinks } from '../data/helpfulLinks';
import HelpfulLinkCardComponent from '../components/HelpfulLinkCardComponent';
import ChatBotComponent from '../components/ChatBotComponent';



const HomeScreen = ({navigation}: {navigation: any}) => {
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top;

    return (
        <View className='flex-1'>
            <HeaderComponent />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 1,
                }}
            >
                <TouchableOpacity
                onPress={() => navigation.navigate('Profiles')}
                >
                    <View className='
            flex
            flex-row
            justify-start
            items-center
            mt-4
            px-4
            '
            
            >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size={18}
                            color='#000'
                        />
                        <Text className='ml-2 text-black text-lg font-semibold'>Profiles</Text>
                    </View>
                </TouchableOpacity>
                <Text
                    className='
        text-xl
        mt-8
        px-4
        '
                >
                    We are ready to check your voice health today.
                </Text>
                <TouchableOpacity
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 5,
                    }}
                    className='
        bg-soundWell-primary
        flex
        justify-center
        items-center
        p-4
        rounded-lg
        w-[90%]
        self-center
        mt-8
        '
            
        onPress={() => navigation.navigate('AudioRecording')}
                >
                    <Text
                        className='
            text-2xl
            text-white
            font-semibold
            '
                    >Start</Text>
                </TouchableOpacity>

                <Text
                    className='
        mt-24
        text-2xl
        text-black
        font-semibold
        px-4
        '
                >
                    Helpful Links
                </Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 6,
                        marginTop: 12,
                        paddingHorizontal: 4,
                    }}
                    data={helpfulLinks}
                    renderItem={({ item }) => (
                        <HelpfulLinkCardComponent imgUrl={item.img} url={item.url} />
                    )}
                />
            </ScrollView>
            <ChatBotComponent/>
        </View>
    );
};

export default HomeScreen;
