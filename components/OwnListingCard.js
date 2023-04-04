import React from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";

export default function OwnListingCard({ item }) {
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 60;
  return (
    <View style={{ marginBottom: "90%" }}>
      <ScrollView
        pagingEnabled
        horizontal
        style={{ width, height, marginTop: "-50%" }}
      >
        {item.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width, height, resizeMode: "contain" }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
