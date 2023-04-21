import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getDocs, collection, setDoc, doc, addDoc } from "firebase/firestore";
import { customAlphabet } from "nanoid/non-secure";
import {
  personalityTable,
  personalityWeightTable,
} from "../../../personalityTables";
import { db, auth } from "../../../firebaseConfig";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
const classID = `${nanoid(4)}-${nanoid(4)}`;

const storeClassInfo = async (className, classDesc, capacity) => {
  try {
    await setDoc(doc(db, "class", classID), {
      name: className,
      description: classDesc,
      capacity,
      id: classID,
    });
    console.log("Document written with ID: ", classID);
    await addClassToUser(className);
    navigation.navigate("CreateClassSummary")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addClassToUser = async (className) => {
  try {
    const userID = auth.currentUser.uid;
    const usersGroupsRef = collection(db, "users", userID, "classes");
    await setDoc(doc(usersGroupsRef, classID), {
      name: className,
      type: "owner",
    });
    console.log("Document written with ID: ", classID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const CreateClassView = () => {
  const [className, setClassName] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [capacity, setCapacity] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  // const [classIdMessage, setClassIdMessage] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Let&apos;s create your class</Text>
      <TextInput
        onChangeText={setClassName}
        value={className}
        placeholder="Class Name"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setClassDesc}
        value={classDesc}
        placeholder="Class Description"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setCapacity}
        value={capacity}
        placeholder="Class Capacity"
        style={styles.textInput}
      />

      <TextInput
        onChangeText={setGroupNumber}
        value={groupNumber}
        placeholder="Number of groups"
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={() => storeClassInfo(className, classDesc, capacity)}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Create Class </Text>
      </TouchableOpacity>

      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
    </SafeAreaView>
  );
};

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

export default CreateClassView;