import { CommonActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, Button, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Search({ navigation, loading, listings, fetchData }) {
  console.log(
    "Listings in Search!",
    listings.map((listing) => listing.address.city)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  const handleTextInputChange = (event) => {
    event.persist(); // Retain the event object

    const eventType = event.type;
    const textValue = event.nativeEvent.text;
    setSearchQuery(textValue);
  };

  function renderItem({ item }) {
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
          <FontAwesome
            name="star"
            size={24}
            style={{ alignContent: "center" }}
          />
          <Button>More info</Button>
        </Card.Actions>
      </Card>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onSubmitEditing={handleTextInputChange}
        // value={searchQuery}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
        data={listings.filter(
          (listing) =>
            listing.address.city.toLowerCase() === searchQuery.toLowerCase()
        )}
        keyExtractor={(item) => item.id}
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
});
