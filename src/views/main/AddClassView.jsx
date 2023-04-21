import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  arrayUnion,
  runTransaction,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../../../firebaseConfig";

const storeUserIDToClass = async (classID, navigation) => {
  try {
    console.log(classID);
    const classRef = doc(db, "class", classID);
    const classDoc = await getDoc(classRef);
    if (!classDoc.exists()) {
      throw new Error("Document does not exist!");
    }
    await addDoc(collection(db, "member"), {
      classid: classID,
      groupid: "",
      userid: auth.currentUser.uid,
    });
    // Returns to Tab after putting the code
    navigation.navigate("Tab");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const AddClassView = ({ navigation }) => {
  const [classInputID, setClassInputID] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Enter Group Code"
        onChangeText={setClassInputID}
        value={classInputID}
        style={styles.textInput}
      />
      <TouchableOpacity
        onPress={() =>
          // Check if the group exists and pop a message if not
          storeUserIDToClass(classInputID, navigation)
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}> Enter </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "70%",
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
});

export default AddClassView;
