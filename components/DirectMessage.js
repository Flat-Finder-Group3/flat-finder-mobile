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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DirectMessage({ item, conversation, user }) {
  // console.log("Item in direct message: ", item);
  // console.log(item.content);
  const lastMessage =
    item.content[item.content.length - 1][
      item.content[item.content.length - 1].length - 1
    ];
  // console.log(lastMessage);

  const author =
    item.sender_id === user.id
      ? user
      : conversation.user1.email
      ? conversation.user1
      : conversation.user2;
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  const avatarSize = 35;
  const gradientColors = ["#FF6B92", "#4c669f"];

  const isFromUser = author.id === user.id;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedTime = formatter.format(date);
    return formattedTime.toUpperCase();
  };

  const formattedCreatedAt = formatDate(item.created_at);

  return (
    <View
      style={
        isFromUser ? globalStyles.outlineSender : globalStyles.outlineReceiver
      }>
      {author.avatar_url ? (
        <Avatar.Image size={avatarSize} source={{ uri: author.avatar_url }} />
      ) : (
        <GradientAvatar
          size={avatarSize}
          gradientColors={gradientColors}
          initials={initials}
        />
      )}
      <View
        style={
          isFromUser ? globalStyles.senderBubble : globalStyles.receiverBubble
        }>
        <Text
          style={[
            isFromUser
              ? globalStyles.senderMessage
              : globalStyles.receiverMessage,
            { maxWidth: 200, flexWrap: "wrap" },
          ]}>
          {item.content.trim()}
        </Text>
        <View
          style={
            isFromUser ? globalStyles.senderInfo : globalStyles.receiverInfo
          }>
          <Text
            style={
              isFromUser ? globalStyles.senderTime : globalStyles.receiverTime
            }>
            {formattedCreatedAt}
          </Text>
          <MaterialCommunityIcons
            name={
              isFromUser
                ? item.is_read
                  ? "eye-check-outline"
                  : "eye-remove-outline"
                : "eye-check-outline"
            }
            size={14}
            style={
              isFromUser
                ? globalStyles.senderIsRead
                : globalStyles.receiverIsRead
            }
          />
        </View>
      </View>
    </View>
  );
}

const globalStyles = StyleSheet.create({
  outlineReceiver: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  outlineSender: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: "row-reverse",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  senderBubble: {
    borderRadius: 20,
    // backgroundColor: '#4c669f',
    backgroundColor: "#2196F3",
    padding: 10,
  },
  receiverBubble: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    padding: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 600,
    alignSelf: "flex-start",
  },
  senderMessage: {
    color: "#ffffff",
    fontSize: 17,
    // borderWidth: 1,
    // borderColor: "red",
    textAlign: "left",
  },
  receiverMessage: {
    color: "#1f1f1f",
    fontSize: 17,
  },
  senderInfo: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    minWidth: 60,
  },
  receiverInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 60,
  },
  senderTime: {
    fontSize: 10,
    color: "white",
  },
  receiverTime: {
    fontSize: 10,
  },
  senderIsRead: {
    color: "#BBDEFB",
  },
  receiverIsRead: {
    color: "#A9A9A9",
  },
});
