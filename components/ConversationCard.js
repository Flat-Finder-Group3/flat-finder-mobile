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

export default function ConversationCard({
  item,
  navigation,
  messages,
  onPress,
}) {
  // console.log("Item in convesation card: ", item)
  const otherUser = item.user1.email ? item.user1 : item.user2;
  const initials = otherUser.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  const avatarSize = 80;
  const gradientColors = ["#FF6B92", "#4c669f"];
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
          <Text>{item.id}</Text>
        </View>
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
