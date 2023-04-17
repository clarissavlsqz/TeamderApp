import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebaseConfig";
import { useUserContext } from "../src/context/user-context";
import { Controller, useForm } from "react-hook-form";
import InputBox from "../src/components/InputBox";

const EditProfile = ({ navigation }) => {
  const { user, updateProfile } = useUserContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  if (user === null) {
    return null;
  }

  const onSubmit = (data) => {
    updateProfile(data);

    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Text style={styles.header}>Edit your Profile</Text>

      <InputBox
        control={control}
        errors={errors}
        rules={{
          required: {
            message: "This field is required.",
            value: true,
          },
        }}
        label="First Name"
        name="firstName"
      />

      <InputBox
        control={control}
        errors={errors}
        rules={{
          required: {
            message: "This field is required.",
            value: true,
          },
        }}
        label="Last Name"
        name="lastName"
      />

      <InputBox
        control={control}
        errors={errors}
        rules={{
          required: {
            message: "This field is required.",
            value: true,
          },
        }}
        label="Email"
        name="email"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}> Save </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;

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
    marginBottom: 20,
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
    marginTop: 10,
    backgroundColor: "#98D7D0",
    alignItems: "center",
    borderRadius: 25,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "74.8%",
    fontSize: 18,
    marginTop: 40,
  },
});
