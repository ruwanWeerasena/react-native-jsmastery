import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";

import EmptyState from "../../components/EmptyState";
import { useEffect } from "react";
import { searchPosts } from "../../service";
import useFirebase from "../../lib/useFirebase";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useFirebase(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);
  console.log(posts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <Text className="font-pmedium text-gray-100 text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <SearchInput
              initialQuery={query}
              placeholder={"Search for a video topic"}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No videos Found"}
            subtitle={"No videos found for this search query"}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
