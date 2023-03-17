import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import InitialView from "./InitialView";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState, useEffect } from "react";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Quicksand: require("./assets/fonts/Quicksand-VariableFont_wght.ttf"),
          "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        });
      } catch {
        // handle error
      } finally {
        setFontsLoaded(true);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    //<View style={styles.container}>
    //  <Text>Open up App.js to start working on your app!</Text>
    //  <StatusBar style="auto" />
    //</View>
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <InitialView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2343",
    justifyContent: "center",
  },
});
