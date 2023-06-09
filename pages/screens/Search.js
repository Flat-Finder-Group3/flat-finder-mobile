import { CommonActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedListing } from "../../redux/selectedListingSlice";
import ListingSearchedCard from "../../components/ListingSearchedCard";

export default function Search({ navigation, loading, listings, fetchData }) {
  console.log(
    "Listings in Search!",
    listings.map((listing) => listing.address.city)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);
  const dispatch = useDispatch();

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

  function handleMoreInfoPress(item) {
    dispatch(setSelectedListing(item));
    navigation.navigate("Listing");
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator animating={true} color={"Red"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Enter a city"
        onSubmitEditing={handleTextInputChange}
        // value={searchQuery}
      />
      {listings.filter(
        (listing) =>
          listing.address.city.toLowerCase() === searchQuery.toLowerCase()
      ).length === 0 ? (
        <Card
          style={{ marginLeft: "0%", alignItems: "center", marginTop: "10%" }}
        >
          <Card.Content>
            <Text>No listing found</Text>
          </Card.Content>
        </Card>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <ListingSearchedCard
              item={item}
              handleMoreInfoPress={handleMoreInfoPress}
            />
          )}
          data={listings.filter(
            (listing) =>
              listing.address.city.toLowerCase() === searchQuery.toLowerCase()
          )}
          keyExtractor={(item) => item.id}
        />
      )}
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
