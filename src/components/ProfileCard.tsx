import { View, Text, Image, Platform } from 'react-native';
import React from 'react';

const ProfileCard = ({ imgUrl, name }: { imgUrl: string, name: string }) => {
  return (
    <View
      className="
        bg-white 
        h-[200px] 
        w-40 
        rounded-[15px] 
        m-4
      "
      style={{
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Elevation for Android
        elevation: 5,
      }}
    >
      <View
        className="
          bg-green-500 
          rounded-full 
          items-center 
          justify-center 
          self-center 
          mt-4 
          h-24 
          w-24 
          overflow-hidden
        "
      >
        <Image
          source={{ uri: imgUrl }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
      </View>

      <Text
        className="
          text-soundWell-primary 
          text-xl 
          font-regular 
          self-center 
          mt-4
        "
      >
        {name}
      </Text>
    </View>
  );
};

export default ProfileCard;
