import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import FullChat from "./pages/FullChat";
import "react-native-url-polyfill/auto";
// import colorScheme from './utils/colorScheme.json'
// import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
// import { useColorScheme } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { theme } from "./utils/utils";

export default function App() {
  const Stack = createNativeStackNavigator();
  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={LightTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Sign in"
              component={SignIn}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerLeft: () => null }}
            />
            <Stack.Screen name="Chat" component={FullChat} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
