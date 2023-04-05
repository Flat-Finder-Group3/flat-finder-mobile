import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import DirectMessage from "../components/DirectMessage";
import { addMessage } from "../redux/messagesSlice";
import MessageService from "../services/messageService";
import { addMessageToSelectedConvo } from "../redux/selectedConvoSlice";

export default function FullChat({ navigation, route }) {
  const { conversation, fetchData } = route.params;

  const allMessages = useSelector((state) => state.allMessages);
  const user = useSelector((state) => state.user);
  const convoMessages = useSelector((state) => state.selectedConvo)

  const [currentMessages, setCurrentMessages] = useState([]);
  const [previousState, setPreviousState] = useState(null);

  useEffect(() => {
    console.log("Current messages change 🟢🟢: ", currentMessages);
  }, [currentMessages]);

  useEffect(() => {
    if (previousState) {
      console.log("Here is previous state:🟢🟢🟢🟢", previousState);
      console.log("Here is the new state:🟢🟢🟢🟢 ", allMessages);
    }
  }, [allMessages, previousState]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   for (const exchanges of allMessages) {
  //     if (exchanges[0].conversation_id === conversation.id) {
  //       setCurrentMessages(exchanges);
  //       break;
  //     }
  //   }
  // }, []);

  const [refreshing, setRefreshing] = useState(false);
  const [content, setContent] = useState("");

  console.log(content);
  const messageService = new MessageService();

  async function handleSendMessage() {
    //async addMessage(sender_id, content, recipient_id){
    if (content) {
      const receiver =
        conversation.user1 === user.id
          ? conversation.user2.id
          : conversation.user1.id;
      const result = await messageService.addMessage(
        user.id,
        content,
        receiver
      );
      setContent("");
      const new_message = result.data[0];
      console.log("Message we got back: ", new_message);
      setCurrentMessages((prev) => prev.concat([new_message]));
      setPreviousState(allMessages);
      dispatch(addMessageToSelectedConvo(new_message))
      dispatch(addMessage(new_message));
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    // <SafeAreaView  style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 20}
      style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <DirectMessage item={item} user={user} conversation={conversation} />
        )}
        data={convoMessages}
        keyExtractor={(item) => item.id}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? -80 : 20}>
        <View style={styles.inputAndSendContainer}>
          <TextInput
            onChangeText={(e) => setContent(e)}
            value={content}
            style={styles.input}
            placeholder="Type your message..."
          />
          <Button
            icon={"send-circle"}
            style={styles.send}
            onPress={handleSendMessage}>
            Send
          </Button>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "red",
    marginBottom: 40,
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
  },
  keyboardAvoidingView: {
    borderWidth: 1,
    borderColor: "red",
    flexDirection: "row",
    // flex: 1
  },
  scrollView: {
    flewGrow: 1,
  },
  inputAndSendContainer: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    // borderColor: 'red',
    borderColor: "#e1e3e1",
    flexDirection: "row",
    flexGrow: 1,
    width: 380,
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#e1e3e1',
    borderRadius: 10,
    padding: 5,
    // height: 30,
    fontSize: 20,
    flewGrow: 1,
    width: 290,
    // flex: 1
  },
  send: {
    borderWidth: 1,
    // borderColor: '#e1e3e1',
  },
});
