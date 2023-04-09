import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { styles } from '../../styles'
import TicketCard from "../../components/TicketCard";
import ListingSearchedCard from "../../components/ListingSearchedCard";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedListing } from "../../redux/selectedListingSlice";

import { SafeAreaView, SectionList } from "react-native";

export default function Home({
  navigation,
  route,
  tickets,
  ownListings,
  loading,
  fetchData,
}) {
  // favListings = favListings.map((item) => item.listing);
  const favListings = useSelector(state => state.favListings.map(item => item.listing));

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const DATA = [
    {
      title: "Saved Listings",
      data: favListings,
    },
    {
      title: "Own Listings",
      data: ownListings,
    },
    {
      title: "My Tickets",
      data: tickets,
    },
  ];

  function handleMoreInfoPress(item) {
    dispatch(setSelectedListing(item));
    navigation.navigate("Listing");
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading)
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionFooter={({ section }) => {
          if (section.data.length === 0) {
            return (
              <Card style={{ marginLeft: "0%", alignItems: "center" }}>
                <Card.Content>
                  <Text>Nothing to show</Text>
                </Card.Content>
              </Card>
            );
          }
        }}
        renderItem={({ section, item, setTickets, tickets }) => {
          // console.log(prop)
          console.log(section.title, section.data.length);
          if (section.title === "Saved Listings") {
            if (section.data.length === 0) {
              return (
                <Card style={{ marginLeft: "0%", alignItems: "center" }}>
                  <Card.Content>
                    <Text>Nothing to show</Text>
                  </Card.Content>
                </Card>
              );
            } else {
              return (
                <ListingSearchedCard
                  item={item}
                  handleMoreInfoPress={handleMoreInfoPress}
                />
              );
            }
          } else if (section.title === "Own Listings") {
            if (section.data.length === 0) {
              return (
                <Card style={{ marginLeft: "0%", alignItems: "center" }}>
                  <Card.Content>
                    <Text>Nothing to show</Text>
                  </Card.Content>
                </Card>
              );
            } else {
              return (
                <ListingSearchedCard
                  item={item}
                  handleMoreInfoPress={handleMoreInfoPress}
                />
              );
            }
          } else {
            return (
              <TicketCard
                item={item}
                setTickets={setTickets}
                tickets={tickets}
              />
            );
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
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