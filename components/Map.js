import React, { useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

const Map = ({ coordinates }) => {
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [markerIndex, setMarkerIndex] = useState(0);
  const zoom = coordinates.length > 1 ? 2 : 15;
  console.log(coordinates);
  function toggleMarker(index) {
    setMarkerIndex(index);
    setInfoWindowVisible(!infoWindowVisible);
  }

  return (
    <>
      <MapView style={{ flex: 1 }} region={coordinates[0]} zoomEnabled={true}>
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            onPress={() => toggleMarker(index)}
          >
            {infoWindowVisible && markerIndex === index && (
              <Callout onClose={() => setInfoWindowVisible(false)}>
                <View>
                  <Text>Flatify rocksssss</Text>
                  <Text>project of the year</Text>
                </View>
              </Callout>
            )}
          </Marker>
        ))}
      </MapView>
    </>
  );
};
export default Map;
