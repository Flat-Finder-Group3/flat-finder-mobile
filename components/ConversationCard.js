import {
  View,
  StyleSheet,
  Text,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { Avatar } from "react-native-paper";
import GradientAvatar from "./GradientAvatar";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Badge } from 'react-native-paper';
import { userAgent } from "@googlemaps/google-maps-services-js";

export default function ConversationCard({
  item,
  navigation,
  onPress,
}) {
  // console.log("Item in convesation card: ", item)

  const allMessages = useSelector(state => state.allMessages);
  const [lastMessage, setLastMessage] = useState('');
  const [convoIndex, setConvoIndex] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    const conversationIndex = allMessages.findIndex(
      (conversation) =>
        conversation.length > 0 &&
        conversation[0].conversation_id === item.id
    );
    console.log('Here is the conversation index: ', conversationIndex)
    setConvoIndex(conversationIndex)
  }, [])

  const otherUser = item.user1.email ? item.user1 : item.user2;
  
  const initials = otherUser.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  const avatarSize = 80;
  const gradientColors = ["#FF6B92", "#4c669f"];

  useEffect(() => {
    if (convoIndex !== null && convoIndex >= 0){
      setLastMessage(allMessages[convoIndex][allMessages[convoIndex].length - 1])
      const count = allMessages[convoIndex].filter((message) => message.sender_id === otherUser.id && !message.is_read).length
      setBadgeCount(count)
    }
  }, [allMessages, convoIndex])


  useEffect(() => {
    console.log('Last MESSAGE: ⚡️⚡️⚡️⚡️⚡️🔴🔴', lastMessage)
  }, [])


  function getBadgeCount() {
    return convoIndex !== null && allMessages[convoIndex].filter((message) => !message.is_read).length
  }


  return (
    <TouchableOpacity onPress={onPress}>
      <View style={globalStyles.outline}>
        {otherUser.avatar_url ? (
          <Avatar.Image size={80} source={{ uri: otherUser.avatar_url }} />
        ) : (
          <GradientAvatar
            size={80}
            gradientColors={gradientColors}
            initials={initials}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.userName}>{otherUser.name}</Text>
          <Text>{lastMessage.sender_id === otherUser.id ? otherUser.name.split(' ')[0] : 'You'}: {lastMessage.content}</Text>
        </View>
        {badgeCount ? <Badge style={{alignSelf: 'center'}}>{badgeCount}</Badge> : <></>}
      </View>
    </TouchableOpacity>
  );
}

const globalStyles = StyleSheet.create({
  outline: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 10,
  },
  container: {
    display: "flex",
  },
  userName: {
    fontSize: 24,
    fontWeight: 600,
    alignSelf: "flex-start",
  },
});
// const gradientColors = ['#4c669f', '#3b5998', '#192f6a'];
