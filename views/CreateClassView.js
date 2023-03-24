import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


async function storeUserInfo(
    className,
    classDesc,
    capacity
  ) {
    createClassID()
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    try {
      const docRef = await addDoc(collection(db, "class"), {
        className: className,
        classDesc: classDesc,
        capacity: capacity,
        classID: docRef.id.substring(1,5),
      });
      console.log("Document written with ID: ", docRef.id);
      console.log(classID);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  export default function CreateClassView({ navigation }) {
    const [className, setClassName] = useState("");
    const [classDesc, setClassDesc] = useState("");
    const [capacity, setCapacity] = useState("");
    //const [classIdMessage, setClassIdMessage] = useState(false);
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Let's create your class</Text>
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

        <TouchableOpacity
          onPress={() =>
            storeUserInfo(className, classDesc, capacity)
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
  