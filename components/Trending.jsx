import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as AnimaTable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const ZoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const ZoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  console.log("activeee", activeItem.id, "ssss", item.id);

  return (
    <AnimaTable.View
      className="mr-5"
      animation={activeItem == item.id ? ZoomIn : ZoomOut}
      duration={500}
    >
      {play ? (
        <Video
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          source={{ uri: item._data.video }}
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
          className="relative justify-center items-center"
        >
          <ImageBackground
            resizeMode="cover"
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            source={{ uri: item._data.thumbnail }}
          />
          <Image
            resizeMode="contain"
            source={icons.play}
            className="w-12 h-12 absolute "
          />
        </TouchableOpacity>
      )}
    </AnimaTable.View>
  );
};
const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      ListHeaderComponent={() => <></>}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
