import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useClassContext } from "../../../context/class-context";

const AddClassView = ({ navigation }) => {
  const [classInputID, setClassInputID] = useState("");
  const { joinClass } = useClassContext();

  const join = useCallback(() => {
    joinClass(classInputID, (success, message) => {
      if (!success) {
        Alert.alert("Error", message, [{ text: "OK" }]);
        return;
      }

      navigation.pop();
    });
  }, [joinClass, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Enter Group Code"
        onChangeText={setClassInputID}
        value={classInputID}
        style={styles.textInput}
      />
      <TouchableOpacity
        onPress={() => join(classInputID)}
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
