import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/user-context";
import InputBox from "../../components/InputBox";
import PersonalityDropdown from "../../components/PersonalityDropdown";

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
      <StatusBar barStyle="light-content" />
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

      <PersonalityDropdown control={control} errors={errors} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}> Save </Text>
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
    marginBottom: 20,
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
});

export default EditProfile;
