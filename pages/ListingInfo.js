import { CommonActions } from "@react-navigation/native";
// import React from "react";
import * as React from "react";
import { DataTable, Title, Card } from "react-native-paper";
import {
  View,
  StyleSheet,
  Button,
  StatusBar,
  SectionList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Text, Snackbar } from "react-native-paper";
// import { styles } from "../styles";
import { Image, ScrollView, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Map from "../components/Map";
import { forumPostService } from "../services/Instances";
import { setSelectedForumPosts } from "../redux/selectedForumPostsSlice";
import ForumPost from "../components/ForumPost";
import { setSnackBarVisibility } from "../redux/snackBarSlice";

export default function ListingInfo({ item, navigation, route }) {
  // const user = route.params.user

  const user = useSelector((state) => state.user);
  const listing = useSelector((state) => state.selectedListing);
  const forumPosts = useSelector((state) => state.selectedForumPosts);
  const visible = useSelector((state) => state.snackBar);

  const dispatch = useDispatch();
  console.log("LISTING INSIDE LISTING YO:", listing);
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 60;
  console.log("User in account! ", user);

  // const sectionListRef = useRef();

  useEffect(() => {
    (async () => {
      console.log("HERE IS THE FORUM IDDDDDD: ", listing.forum);
      const response = await forumPostService.getForumPosts(listing.forum);
      console.log("ForumPosts:::🔴🟢🔴🟢 ", response);
      dispatch(setSelectedForumPosts(response.data));
    })();
  }, []);

  console.log("ForumPosts:::🔴🟢🔴🟢 ", forumPosts);

  const DATA = [
    {
      title: "Listing Information",
      data: [listing],
    },
    {
      title: "Forum",
      data: forumPosts,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
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
          if (section.title === "Listing Information") {
            const listing = item;
            return (
              <>
                <Title style={{ textAlign: "center" }}>{listing.title}</Title>
                <View>
                  <ScrollView
                    pagingEnabled
                    horizontal
                    style={{
                      width,
                      height,
                      marginTop: "-40%",
                      borderRadius: 40,
                    }}
                  >
                    {listing.images.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image }}
                        style={{
                          width,
                          height,
                          resizeMode: "contain",
                          borderRadius: 40,
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
                <Title style={{ marginTop: "-40%", textAlign: "center" }}>
                  Extra information
                </Title>
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>Rent</DataTable.Cell>
                    <DataTable.Cell numeric>
                      £{listing.monthly_price}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Deposit</DataTable.Cell>
                    <DataTable.Cell numeric>£{listing.deposit}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Listing created on:</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {new Date(listing.created_at).toLocaleDateString()}
                    </DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>Address</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {listing.address.first_line},{" "}
                      {listing.address.second_line}, {listing.address.postcode}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Contract length</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {listing.contract_length} (months)
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Key features</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {listing.key_features.pets_allowed ? (
                        <FontAwesome name="home" size={24} />
                      ) : (
                        false
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>

                  <Title style={{ marginLeft: "4%" }}>Description</Title>
                  <Text style={{ marginLeft: "4%" }}>
                    {listing.description}
                  </Text>
                  <Map coordinates={[listing.coordinates]} />
                </DataTable>
              </>
            );
          } else if (section.title === "Forum") {
            if (section.data.length === 0) {
              return (
                <Card style={{ marginLeft: "0%", alignItems: "center" }}>
                  <Card.Content>
                    <Text>Nothing to show</Text>
                  </Card.Content>
                </Card>
              );
            } else {
              return <ForumPost item={item} />;
            }
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <Snackbar
        visible={visible}
        onDismiss={() => dispatch(setSnackBarVisibility(false))}
        action={{
          label: "Undo",
          onPress: () => {
            dispatch(setSnackBarVisibility(false));
          },
        }}
      >
        There is a new forum post on this listing.
      </Snackbar>
    </SafeAreaView>
  );
}

// export default ListingInfo;
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
  forumPostContainer: {
    // Add styles for the forum post container
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
  },
  forumPostTitle: {
    // Add styles for the forum post title
    fontSize: 18,
    fontWeight: "bold",
  },
  forumPostContent: {
    // Add styles for the forum post content
    fontSize: 16,
  },
});
