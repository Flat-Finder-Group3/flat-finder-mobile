import { CommonActions } from "@react-navigation/native";
// import React from "react";
import * as React from "react";
import { DataTable, Title } from "react-native-paper";
import { View, StyleSheet, Button, StatusBar } from "react-native";
import { Text, BottomNavigation } from "react-native-paper";
import { styles } from "../styles";
import { Image, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Map from "../components/Map";
export default function ListingInfo({ item, navigation, route }) {
  // const user = route.params.user

  const user = useSelector((state) => state.user);
  const listing = useSelector((state) => state.selectedListing);
  console.log("LISTING INSIDE LISTING YO:", listing);
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 60;
  console.log("User in account! ", user);
  return (
    <>
      <Title>{listing.title}</Title>
      <View>
        <ScrollView
          pagingEnabled
          horizontal
          style={{ width, height, marginTop: "-50%" }}
        >
          {listing.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width, height, resizeMode: "contain" }}
            />
          ))}
        </ScrollView>
        <Title style={{ marginTop: "-50%" }}>Extra information</Title>
      </View>
      <ScrollView>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Rent</DataTable.Cell>
            <DataTable.Cell numeric>£{listing.monthly_price}</DataTable.Cell>
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
              {listing.address.first_line}, {listing.address.second_line},{" "}
              {listing.address.postcode}
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

          <Title>Description</Title>
          <Text>{listing.description}</Text>
          <Map coordinates={[listing.coordinates]} />
        </DataTable>
      </ScrollView>
    </>
  );
}

// export default ListingInfo;
