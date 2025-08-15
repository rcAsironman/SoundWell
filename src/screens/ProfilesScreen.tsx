import { View, FlatList, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React from 'react'
import ProfileCard from '../components/ProfileCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { users } from '../data/users'
import Text  from '../components/Text';

const ProfilesScreen = ({navigation}: {navigation: any}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;
  const windowWidth = Dimensions.get('window').width;

  return (
    <View className='flex-1'>
      <View
        className='bg-soundWell-primary h-36'
        style={{ paddingTop: paddingTop, 
          height: Platform.OS === 'android' ? paddingTop + 60 : paddingTop + 80
         }}
      >
        <Text className='text-white text-2xl font-bold p-4'>SoundWell</Text>
      </View>

      {/* Scrollable body */}
      <FlatList
        data={users}
        numColumns={windowWidth > 600 ? 4 : 2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {navigation.navigate('Home')}}
          >
                      <ProfileCard imgUrl={item?.url} name={item?.name} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        ListHeaderComponent={() => (
          <Text className='text-[16px] font-semibold mb-4'>Profiles</Text>
        )}
      />
    </View>
  );
};

export default ProfilesScreen;
