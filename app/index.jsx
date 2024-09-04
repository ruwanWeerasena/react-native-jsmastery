import "react-native-url-polyfill/auto";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
  const { user, isLoggedIn } = useGlobalContext();
  console.log("user", user);

  if (user && isLoggedIn) {
    return <Redirect href={"/home"} />;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white text-center font-bold">
              Discover Endless Possibilites With{" "}
              <Text className=" text-secondary-200 ">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className=" text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title={"Continue "}
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles={"w-full mt-7"}
            textStyles={""}
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
// <View className="flex-1 justify-center items-center bg-white">
//   <Text className="text-3xl font-pblack">Aora</Text>
//   <StatusBar style="auto" />
//   <Link href="/home" style={{ color: "blue" }}>
//     Go to Home
//   </Link>
// </View>
