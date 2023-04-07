import {View, Text, StyleSheet, StatusBar} from 'react-native'
import { Avatar } from "react-native-paper";
import GradientAvatar from './GradientAvatar';
import UserAvatar from './UserAvatar';

export default function ForumPost({item}) {

  const {author} = item
  // const avatarSize = 10;
  return (
    <View style={styles.forumPostContainer}>             
      <UserAvatar item={item} avatarSize={40}/>
      <View style={styles.postBody}>
        <Text style={styles.forumPostTitle}>{author.name}</Text>
        <Text style={styles.forumPostContent}>{item.content}</Text>
      </View>
    </View>
  )

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
  },
  forumPostContainer: {
    // Add styles for the forum post container
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: 'row',
    gap: 10
  },
  forumPostBody: {
    flexDirection: 'column',
  },
  forumPostTitle: {
    // Add styles for the forum post title
    fontSize: 13,
    fontWeight: "bold",
  },
  forumPostContent: {
    // Add styles for the forum post content
    fontSize: 16,
  },
  
});
