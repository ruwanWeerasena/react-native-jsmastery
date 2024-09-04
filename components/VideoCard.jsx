import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    _data: { title, thumbnail, video, creator },
  },
}) => {
  const [play, setPlay] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  useEffect(() => {
    const fetchCreator = async () => {
      const creatorDoc = await creator.get();
      if (creatorDoc.exists) {
        setCreatedUser(creatorDoc.data());
      }
    };
    fetchCreator();
  }, [creator]);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border   border-secondary-100 justify-center items-center p-0.5">
            <View
              className={`flex items-center  h-full  w-full justify-center rounded-lg bg-teal-300`}
            >
              <Text className={` text-black rounded-lg font-pbold  text-lg `}>
                {createdUser?.username.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-sm"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs text-gray-100 font-pregular"
            >
              {createdUser?.username}
            </Text>
          </View>
          <View className="pt-2">
            <Image
              resizeMode="contain"
              className="w-5 h-5"
              source={icons.menu}
            />
          </View>
        </View>
      </View>
      {play ? (
        <Video
          className="w-full h-60 rounded-xl mt-3"
          source={{ uri: video }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            resizeMode="cover"
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 "
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMode="contain"
            source={icons.play}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
