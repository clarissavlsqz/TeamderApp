import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { A } from "@expo/html-elements";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  useTogglePasswordVisibility,
  useTogglePasswordVisibilitySignUp,
} from "../src/hooks/useTogglePasswordVisibility";
import { Ionicons } from "@expo/vector-icons";

const personalityTypes = [
  { label: "INTJ", value: "INTJ" },
  { label: "INTP", value: "INTP" },
  { label: "ENTJ", value: "ENTJ" },
  { label: "ENTP", value: "ENTP" },
  { label: "INFJ", value: "INFJ" },
  { label: "INFP", value: "INFP" },
  { label: "ENFJ", value: "ENFJ" },
  { label: "ENFP", value: "ENFP" },
  { label: "ISTJ", value: "ISTJ" },
  { label: "ISFJ", value: "ISFJ" },
  { label: "ESTJ", value: "ESTJ" },
  { label: "ESFJ", value: "ESFJ" },
  { label: "ISTP", value: "ISTP" },
  { label: "ISFP", value: "ISFP" },
  { label: "ESTP", value: "ESTP" },
  { label: "ESFP", value: "ESFP" },
];

async function storeUserInfo(
  firstName,
  lastName,
  email,
  password,
  personality
) {
  let userUID;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      userUID = user.uid;
      console.log("TRY ", userUID);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  try {
    console.log(userUID);
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, userUID), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      personality: personality,
    });
    console.log("Document written with ID: ", userUID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default function SignUpView({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordSignUp, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personality, setPersonality] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(false);
  const { password, icon, onClickIcon } = useTogglePasswordVisibility();
  const { passwordConf, iconConf, onClickIconConf } =
    useTogglePasswordVisibilitySignUp();

  function validatePassword() {
    if (passwordSignUp != confirmPassword) {
      setPasswordMessage(true);
    } else {
      setPasswordMessage(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Let's create your account</Text>
      <TextInput
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First name"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last name"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setPassword}
          value={passwordSignUp}
          placeholder="Password"
          style={styles.passwordInput}
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

      <View
        style={
          passwordMessage
            ? styles.passwordErrorInputContainer
            : styles.inputContainer
        }
      >
        <TextInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm password"
          style={styles.passwordInput}
          secureTextEntry={passwordConf}
          onBlur={validatePassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Ionicons
          name={iconConf}
          color="black"
          onPress={onClickIconConf}
          size={24}
          style={styles.icon}
        />
      </View>

      {passwordMessage ? (
        <Text style={styles.passwordError}>Password does not match</Text>
      ) : null}

      <SelectList
        setSelected={setPersonality}
        data={personalityTypes}
        save="value"
        search={false}
        placeholder="Select your personality"
        boxStyles={styles.box}
        dropdownStyles={styles.dropdown}
        inputStyles={styles.input}
      />
      <Text style={styles.redirectText}>
        If you don't know your personality, you can discover it by completing
        this{" "}
        <A
          href="https://www.16personalities.com/free-personality-test"
          style={{ color: "blue", fontWeight: "bold" }}
        >
          quiz
        </A>
      </Text>
      <TouchableOpacity
        onPress={() =>
          storeUserInfo(firstName, lastName, email, passwordSignUp, personality)
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}> Create </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "74.8%",
    fontSize: 18,
    marginTop: 40,
  },
  textInputError: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  passwordInput: {
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  box: {
    width: "65%",
    marginTop: 40,
  },
  dropdown: {
    position: "absolute",
    width: "69.6%",
    marginTop: 40,
  },
  input: {
    width: "100%",
  },
  redirectText: {
    width: "60%",
    marginTop: 10,
  },
  passwordError: {
    marginTop: 10,
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
    borderBottomColor: "black",
  },
  passwordErrorInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  icon: {
    paddingTop: 20,
  },
});
