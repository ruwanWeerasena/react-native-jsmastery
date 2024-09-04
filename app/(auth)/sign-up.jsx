import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

import { CreateUser } from "../../service";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "please fill all the fields");
    } else {
      try {
        setIsSubmitting(true);
        await CreateUser(form.username, form.email, form.password);

        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className=" bg-primary w-full h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 w-full  justify-center items-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-xl text-white font-semibold mt-10 font-psemibold">
            Register to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm((c) => ({ ...c, username: e }))}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm((c) => ({ ...c, email: e }))}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm((c) => ({ ...c, password: e }))}
            otherStyles="mt-7"
          />
          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            containerStyles={"mt-7 w-full"}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary-100"
              href={"/sign-in"}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
