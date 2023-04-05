import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebaseConfig";
import { useUserContext } from "../src/context/user-context";

export default function ProfileView() {
  const { user } = useUserContext();

  const onLogout = () => {
    auth.signOut();
  };

  if (user === null) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Text style={styles.profileText}>
        {" "}
        <Text style={styles.boldText}>Name:</Text> {user.firstName}{" "}
        {user.lastName}
      </Text>
      <Text style={styles.profileText}>
        {" "}
        <Text style={styles.boldText}>Email:</Text> {user.email}
      </Text>
      <Text style={styles.profileText}>
        {" "}
        <Text style={styles.boldText}>Personality:</Text> {user.personality}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}> Logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#98D7D0",
    alignItems: "center",
    borderRadius: 25,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});
