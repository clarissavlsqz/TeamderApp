import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebaseConfig";
import InputBox from "../../components/InputBox";

const LoginView = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
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
        }}
        label="Password"
        name="password"
        password
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onLogin)}>
        <Text style={styles.buttonText}> Login </Text>
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

export default LoginView;
