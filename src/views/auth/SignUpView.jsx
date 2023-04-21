import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { A } from "@expo/html-elements";
import { useForm, useWatch } from "react-hook-form";
import PersonalityDropdown from "../../components/PersonalityDropdown";
import InputBox from "../../components/InputBox";
import { useUserContext } from "../../context/user-context";

const SignUpView = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useUserContext();

  const pwd = useWatch({
    control,
    name: "password",
  });

  const onSubmit = (data) => {
    createUser(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Let&apos;s create your account</Text>

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
          pattern: {
            message: "Invalid email",
            value: /^\S+@\S+$/i,
          },
        }}
        label="Email"
        name="email"
      />

      <InputBox
        control={control}
        errors={errors}
        rules={{
          required: {
            message: "This field is required.",
            value: true,
          },
          minLength: {
            message: "Password must be at least 6 characters",
            value: 6,
          },
        }}
        label="Password"
        name="password"
        password
      />

      <InputBox
        control={control}
        errors={errors}
        rules={{
          required: {
            message: "This field is required.",
            value: true,
          },

          validate: (value) => value === pwd || "The passwords do not match",
        }}
        label="Confirm Password"
        name="confirmPassword"
        password
      />

      <PersonalityDropdown control={control} errors={errors} />

      <Text style={styles.redirectText}>
        If you don&apos;t know your personality, you can discover it by
        completing this{" "}
        <A
          href="https://www.16personalities.com/free-personality-test"
          style={{ color: "blue", fontWeight: "bold" }}
        >
          quiz
        </A>
      </Text>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}> Create </Text>
      </TouchableOpacity>
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
  redirectText: {
    width: "60%",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#98D7D0",
    alignItems: "center",
    borderRadius: 25,
    width: "80%",
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});

export default SignUpView;
