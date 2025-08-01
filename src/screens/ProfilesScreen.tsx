import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ProfileCard from '../components/ProfileCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { users } from '../data/users'
import HeaderComponent from '../components/HeaderComponent'

const ProfilesScreen = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  return (
    <View className='flex-1'>
      {/* Header */}
      <HeaderComponent/>
      <View
        className='bg-soundWell-primary h-36'
        style={{ paddingTop: paddingTop }}
      >
        <Text className='text-white text-2xl font-bold p-4'>SoundWell</Text>
      </View>

      {/* Scrollable body */}
      <FlatList
        data={users}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProfileCard imgUrl={item?.url} name={item?.name} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={() => (
          <Text className='text-[16px] font-semibold mb-4'>Profiles</Text>
        )}
      />
    </View>
  );
};

export default ProfilesScreen;
