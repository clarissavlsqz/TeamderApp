import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Button, Colors, Dash, Text, View } from "react-native-ui-lib";
import { auth } from "../../../firebaseConfig";
import InputBox from "../../components/InputBox";
import LoadingButton from "../../components/LoadingButton";
import LocalImages from "../../../assets/images/LocalImages";

const LoginView = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onLogin = ({ email, password }) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorMessage = error.message;
      setError("password", {
        message: errorMessage,
      });
      setLoading(false);
    });
  };

  return (
    <View useSafeArea flex centerV padding-40 bg-screenBG>
      <View centerH paddingB-80>
        <Image source={LocalImages.logo2} style={{ width: 261, height: 41 }} />
      </View>

      <Text text70 marginB-10>
        Login to your account
      </Text>

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

      <LoadingButton
        onPress={handleSubmit(onLogin)}
        label="Sign In"
        loading={loading}
        marginV-30
      />

      <View centerH>
        <Text>Don&#39;t have an account?</Text>

        <Button link label="Register" />
      </View>
    </View>
  );
};

export default LoginView;
