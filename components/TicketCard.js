import { FlatList, View, Text} from "react-native";
import { List } from 'react-native-paper'

export default function TicketCard ({item}) {

  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
      <Text>{item.status}</Text>
    </View>
  )

}