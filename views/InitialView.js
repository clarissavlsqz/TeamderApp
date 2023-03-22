import React from "react";
import {
  Alert,
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import LocalImages from "../assets/images/LocalImages";

export default function InitialView({ navigation }) {
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
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.text}> Sign Up </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B2343",
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
