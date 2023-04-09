import React, { useEffect } from "react";
import {
  View,
} from "react-native";
import { Text, BottomNavigation, Button, Card } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { favListingSevice } from "../services/Instances";
import { unfavListing, addFavListing } from "../redux/favListingSlice";

export default function ListingSearchedCard({ item, handleMoreInfoPress }) {

  const favIds = useSelector(state => state.favListings.map(item => item.listing.id))
  console.log('Array of favIds!', favIds, item.id)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  async function handleFav(listing_id) {
    if (favIds.includes(listing_id)) {
      const result = await favListingSevice.removeFavListing(
        user.id,
        listing_id
      );
      console.log("Result of removal! ", result);
      dispatch(unfavListing(listing_id));
    } else {
      const result = await favListingSevice.addFavListing(user.id, listing_id);
      dispatch(addFavListing(result.data[0]));
    }
  }
  

  return (
    <Card style={{ marginBottom: "10%", marginTop: "10%" }}>
      <Card.Cover source={{ uri: item.images[0] }} />

      <Card.Title
        title={item.title}
        subtitle={<Text>£ {item.monthly_price} (pcm)</Text>}
        // left={() => <FontAwesome name="bed" size={24} color="black" />}
      />
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="map-marker" size={24} />
          <Text>
            &nbsp; {item.address.second_line}, {item.address.city} &nbsp;
          </Text>
          <Text>{"\n"}</Text>
          <Text>{item.key_features.beds} &nbsp;</Text>
          <FontAwesome name="bed" size={24} />
          <Text> &nbsp;</Text>
          <Text>{item.key_features.bathrooms} &nbsp;</Text>
          <FontAwesome name="bath" size={24} />
        </View>
        <View style={{ flex: 1 }}>
          <Text>Available now (L/S)</Text>
        </View>
      </Card.Content>

      <Card.Actions>
        {favIds.includes(item.id) ?
          <FontAwesome
            name="star"
            size={24}
            style={{ alignContent: "center" }}
            onPress={() => handleFav(item.id)}
          /> : 
          <FontAwesome name="star-o" size={24}
          onPress={() => handleFav(item.id)}
          />
        }
        <Button onPress={() => handleMoreInfoPress(item)}>More info</Button>
      </Card.Actions>
    </Card>
  );
}