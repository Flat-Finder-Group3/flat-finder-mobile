import { FlatList, View, Text} from "react-native";
import { List } from 'react-native-paper'

export default function OwnListingCard ({item}) {

  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.address.city}, {item.address.country}</Text>
      {/* <Text>{item.status}</Text> */}
    </View>
  )

}