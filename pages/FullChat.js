import React, { useState } from 'react';
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
} from 'react-native';
import {Button, Icon} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import DirectMessage from '../components/DirectMessage';
import MessageService from '../services/messageService'

export default function FullChat({navigation, route}) {
  
    const { conversation, messages, user, fetchData, setMessages} = route.params;
    console.log("Conversation: ", conversation)
    console.log("messages: ", messages)
    console.log('user: ', user)
    console.log('setMessages ', setMessages)

  const [refreshing, setRefreshing] = useState(false);
  const [content, setContent] = useState('');

  console.log(content)
  const messageService = new MessageService()


  async function handleSendMessage() {
    //async addMessage(sender_id, content, recipient_id){
    if (content) {
      const receiver = conversation.user1 === user.id ? conversation.user2.id : conversation.user1.id
      const result = await messageService.addMessage(user.id, content, receiver)
      const new_message = result.data[0]
      console.log("Message we got back: ", new_message)

      //TODO: update state so that message shows on the screen

      
      // setMessages(prev => {
      //   console.log({prev})
      //   for (const conv of prev){
      //     if (conv.id === new_message.conversation_id){
      //       conv.concat([new_message])
      //       return prev;
      //     }
      //   }
      // })
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.container}>
              <FlatList
                style={{flex: 1}}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />  
                }
                renderItem={({item}) => (<DirectMessage item={item} user={user} conversation={conversation}/>)}
                data={messages}
                keyExtractor={item => item.id}
                />
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                    style={styles.keyboardAvoidingView}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? -55 : 20}
                    >
                    <View style={styles.inputAndSendContainer}>
                    <TextInput
                      onChangeText={(e) => setContent(e) }
                      value={content}
                      style={styles.input}
                      placeholder="Type your message..."
                      />
                      <Button icon={'send-circle'} style={styles.send} onPress={handleSendMessage}>Send</Button>
                    </View>
                  </KeyboardAvoidingView>
              <StatusBar style="auto" />
      </KeyboardAvoidingView>
        // </SafeAreaView>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 40
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
  },
  keyboardAvoidingView: {
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row'
    // flex: 1
  },
  scrollView : {
    flewGrow: 1
  },
  inputAndSendContainer: {
    borderWidth: 1,
    // borderColor: 'red',
    borderColor: '#e1e3e1',
    flexDirection: 'row',
    flexGrow: 1,
    width: 380
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#e1e3e1',
    borderRadius: 10,
    padding: 5,
    // height: 30,
    fontSize: 20,
    flewGrow: 1,
    width: 290
    // flex: 1
  },
  send: {
    borderWidth: 1,
    // borderColor: '#e1e3e1',
    
  }
});