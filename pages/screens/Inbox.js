import {CommonActions} from '@react-navigation/native'
import React from 'react';
import {useState} from 'react'
import { View, Text, StyleSheet, Button, StatusBar, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConversationCard from '../../components/ConversationCard'


export default function Inbox({navigation, user, conversations, messages, loading, fetchData, setMessages}) {
  
  // console.log("Conversations in inbox, ", conversations)
  const [refreshing, setRefreshing] = useState(false)
  console.log('setMessages: ', setMessages)

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleConversationPress = (item, conversationMessages) => {
    console.log("Here are the params to pass to FullChat component: ", item, conversationMessages)
    navigation.navigate('Chat', { conversation: item, messages: conversationMessages, user, fetchData, setMessages});
  };
  
  return (

    <SafeAreaView  style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Your chats <Text style={styles.count}>({conversations.length})</Text></Text>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => <ConversationCard item={item} messages={messages} onPress={(conversationMessages) => handleConversationPress(item, conversationMessages)} />}
          data={conversations}
          keyExtractor={item => item.id}
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 700
  },
  count: {
    fontSize: 15
  },
  headerContainer: {
    paddingBottom: 20,
  }
});