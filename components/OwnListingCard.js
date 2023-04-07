import React from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";

export default function OwnListingCard({ item }) {
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
