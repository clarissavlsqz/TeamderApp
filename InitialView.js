import React from "react";
import {
  Alert,
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import LocalImages from "./assets/images/LocalImages";

export default function InitialView() {
  return (
    <View style={styles.container}>
      <Image source={LocalImages.logo} style={styles.logo} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Login Button pressed")}
      >
        <Text style={styles.text}> Login </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Sign Up Button pressed")}
      >
        <Text style={styles.text}> Sign Up </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  button: {
    backgroundColor: "#98D7D0",
    alignItems: "center",
    borderRadius: 25,
    width: "80%",
    marginTop: 25,
  },

  text: {
    fontSize: 18,
    color: "#2B2343",
    paddingVertical: 10,
    fontFamily: "Poppins-Bold",
  },

  logo: {
    width: 500,
    height: 500,
  },
});
