import { CommonActions } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Button, StatusBar } from "react-native";
import { Text, BottomNavigation } from "react-native-paper";
import { styles } from "../../styles";
import { Avatar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Account({ navigation, route }) {

  const user = useSelector((state) => state.user);

  console.log("User in account! ", user);

  return (
    <View style={{ ...styles.container, gap: "10rem" }}>
      <Avatar.Image size={150} source={{ uri: user.avatar_url }} />
      <Text style={{ fontSize: 25, fontWeight: 600 }}>{user.name}</Text>
      <Text style={{ fontSize: 20, fontWeight: 400, color: "gray" }}>
        {user.email}
      </Text>
      <Button
        title="Logout"
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Sign in" }],
            })
          )
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}
