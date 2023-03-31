import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import 'react-native-url-polyfill/auto';
// import colorScheme from './utils/colorScheme.json'
// import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
// import { useColorScheme } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  adaptNavigationTheme
} from 'react-native-paper';

export default function App() {
  
  const Stack = createNativeStackNavigator();
  const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

  const theme = {
    ...DefaultTheme,
      "colors": {
        "primary": "rgb(52, 61, 255)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(224, 224, 255)",
        "onPrimaryContainer": "rgb(0, 0, 110)",
        "secondary": "rgb(92, 93, 114)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(225, 224, 249)",
        "onSecondaryContainer": "rgb(25, 26, 44)",
        "tertiary": "rgb(224, 224, 255)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(225, 224, 249)",
        // "onTertiaryContainer": "rgb(0, 0, 110)",
        "onTertiaryContainer": "rgb(25, 26, 44)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(255, 251, 255)",
        "onBackground": "rgb(27, 27, 31)",
        "surface": "rgb(255, 251, 255)",
        "onSurface": "rgb(27, 27, 31)",
        "surfaceVariant": "rgb(228, 225, 236)",
        "onSurfaceVariant": "rgb(70, 70, 79)",
        "outline": "rgb(119, 118, 128)",
        "outlineVariant": "rgb(199, 197, 208)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(48, 48, 52)",
        "inverseOnSurface": "rgb(243, 239, 244)",
        "inversePrimary": "rgb(190, 194, 255)",
        "elevation": {
          "level0": "transparent",
          "level1": "rgb(245, 242, 255)",
          "level2": "rgb(239, 236, 255)",
          "level3": "rgb(233, 230, 255)",
          "level4": "rgb(231, 228, 255)",
          "level5": "rgb(227, 224, 255)"
        },
        "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
        "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
        "backdrop": "rgba(48, 48, 56, 0.4)"
    }, // Copy it from the color codes scheme and then use it here
  };
  
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={LightTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Sign in"
            component={SignIn}
            options={{title: 'Welcome'}}
            />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerLeft: () => null}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});