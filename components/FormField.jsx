import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPw, setShowPw] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 flex-row border-black-200 w-full h-16 items-center px-4 bg-black-100  rounded-2xl focus:border-secondary">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          className="flex-1 w-full justify-center text-white font-psemibold text-base"
          onChangeText={handleChangeText}
          secureTextEntry={title == "Password" && !showPw}
        />
        {title == "Password" && (
          <TouchableOpacity onPress={() => setShowPw((c) => !c)}>
            <Image
              className="w-6 h-6"
              source={!showPw ? icons.eye : icons.eyeHide}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
