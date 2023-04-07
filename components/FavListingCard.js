import React from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { Text, BottomNavigation, Button, Card } from "react-native-paper";

export default function FavListing({ item }) {
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 60;
  return (
    <>
      <View style={{ marginTop: "-60%", paddingTop: "-30%" }}>
        <ScrollView pagingEnabled horizontal style={{ width, height }}>
          {item.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{
                width,
                height,
                resizeMode: "contain",
              }}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}
