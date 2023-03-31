import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { Ionicons } from "@expo/vector-icons";

export default function LoginView({ navigation }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { password, icon, onClickIcon } = useTogglePasswordVisibility();

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("SIGNED IN!!");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.emailInput}
          placeholder="Email"
          onChangeText={setLoginEmail}
          value={loginEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          onChangeText={setLoginPassword}
          value={loginPassword}
          secureTextEntry={password}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Ionicons
          name={icon}
          color="black"
          onPress={onClickIcon}
          size={24}
          style={styles.icon}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}> Login </Text>
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
  header: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
  },
  passwordInput: {
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  emailInput: {
    width: "75%",
    fontSize: 18,
    marginTop: 40,
  },
  passwordInputError: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  button: {
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  icon: {
    paddingTop: 20,
  },
});
