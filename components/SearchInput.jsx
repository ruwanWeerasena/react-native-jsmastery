import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
const SerchInput = ({
  initialQuery,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="border-2 flex-row border-black-200 w-full h-16 items-center px-4 space-x-4 bg-black-100  rounded-2xl focus:border-secondary">
      <TextInput
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        className="text-sm mt-0.5 text-white flex-1 w-full justify-center font-pregular "
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search"
            );
          }
          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image className="w-5 h-5" source={icons.search} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SerchInput;
