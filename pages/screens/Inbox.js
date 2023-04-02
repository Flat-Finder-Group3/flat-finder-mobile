import {CommonActions} from '@react-navigation/native'
import React from 'react';
import {useState} from 'react'
import { View, StyleSheet, Button, StatusBar, FlatList, RefreshControl } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { styles } from '../../styles';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConversationCard from '../../components/ConversationCard'


export default function Inbox({navigation, user, conversations, messages, loading, fetchData}) {
  
  // console.log("Conversations in inbox, ", conversations)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleConversationPress = (item) => {
    navigation.navigate('Chat', { conversation: item });
  };
  
  return (

    <SafeAreaView  style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => <ConversationCard item={item} messages={messages} onPress={() => handleConversationPress(item)} />}
          data={conversations}
          keyExtractor={item => item.id}
        />
        <StatusBar style="auto" />
    </SafeAreaView>


    // <View style={styles.container} >
    //     <Text>I wish I had something in my inbox but i dont!!</Text>
    //       <Button 
    //         title='Logout'
    //         onPress={() => navigation.dispatch(
    //           CommonActions.reset({
    //             index: 0,
    //             routes: [{ name: 'Sign in' }],
    //           }))}
    //       />
    //     <StatusBar style="auto" />
    //   </View>
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
  },
});