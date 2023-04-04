import { CommonActions } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ConversationCard from "../../components/ConversationCard";
import { useSelector, useDispatch } from "react-redux";

export default function Inbox({
  navigation,
  user,
  conversations,
  loading,
  fetchData,
}) {
  const allMessages = useSelector((state) => state.allMessages);

  console.log("All messages in INBOX FROM REDUX 🟢🟢🟢: ", allMessages);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleConversationPress = (item) => {
    console.log("Here are the params to pass to FullChat component: ", item);
    navigation.navigate("Chat", {
      conversation: item,
      fetchData,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          Your chats <Text style={styles.count}>({conversations.length})</Text>
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ConversationCard
            item={item}
            onPress={() => handleConversationPress(item)}
          />
        )}
        data={conversations}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
  },
  count: {
    fontSize: 15,
  },
  headerContainer: {
    paddingBottom: 20,
  },
});
