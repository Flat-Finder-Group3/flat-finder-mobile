import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Dimensions } from "react-native";
import { supabase } from "../utils/supabase";
import { Button, Input } from "react-native-elements";
import { Image } from "react-native-elements";
import UserService from "../services/UserService";
import { CommonActions } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userService = new UserService();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  async function signInWithEmail() {
    setLoading(true);
    const response = await userService.login(supabase, email, password);
    setLoading(false);
    if (response.message) {
      Alert.alert(response.message);
    } else {
      return response;
    }
  }

  async function onPressSignIn() {
    const user = await signInWithEmail();
    if (user.email) {
      dispatch(setUser(user));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Dashboard",
            },
          ],
        })
      );
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {/* <View style={{ borderWidth: 1, borderColor: "red" }}> */}

      {/* </View> */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={onPressSignIn} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      <Image
        source={{
          uri: "https://ewbcpghsdfeysreslsbk.supabase.co/storage/v1/object/public/assets/fdm.png",
        }}
        style={{ width: "100%", height: "50%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    paddingLeft: 12,
    paddingRight: 12,
    // borderWidth: 1,
    // borderColor: "red",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
    // borderWidth: 1,
    // borderColor: "red",
  },
  mt20: {
    marginTop: 20,
  },
});
