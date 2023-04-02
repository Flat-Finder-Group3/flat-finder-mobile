import {useState} from 'react'
import { View, TextInput, StyleSheet, Button, StatusBar, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DirectMessage from '../components/DirectMessage';

export default function FullChat({navigation, route}) {
  
    const { conversation, messages, user } = route.params;
    console.log("Conversation: ", conversation)
    console.log("messages: ", messages)
    console.log('user: ', user)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };


  return (
    <SafeAreaView  style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (<DirectMessage item={item} user={user} conversation={conversation}/>)}
        data={messages}
        keyExtractor={item => item.id}
      />
      <TextInput
        onChangeText={() => {}}
        value={undefined}
        placeholder="useless placeholder"
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  )

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