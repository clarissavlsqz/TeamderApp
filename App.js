import { StyleSheet } from "react-native";
import InitialView from "./views/InitialView";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import BottomTabNav from "./components/BottomTabNav";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand-VariableFont_wght.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    //<View style={styles.container}>
    //  <Text>Open up App.js to start working on your app!</Text>
    //  <StatusBar style="auto" />
    //</View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Initial"
          component={InitialView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginView}
        />
        <Stack.Screen
          name="Tab"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2343",
    justifyContent: "center",
  },
});
