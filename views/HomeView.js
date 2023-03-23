import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

export default function HomeView() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
