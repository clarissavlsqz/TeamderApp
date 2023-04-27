import React, { useState } from "react";
import { Image } from "expo-image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Button, Text, View } from "react-native-ui-lib";
import { auth } from "../../../firebaseConfig";
import InputBox from "../../components/InputBox";
import LoadingButton from "../../components/LoadingButton";
import LocalImages from "../../../assets/images/LocalImages";
import EnhancedKeyboardAvoidingView from "../../components/EnhancedKeyboardAvoidingView";

const LoginView = ({ navigation }) => {
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
    <EnhancedKeyboardAvoidingView>
      <View useSafeArea flex centerV margin-40 bg-screenBG>
        <View centerH paddingB-80>
          <Image
            source={LocalImages.logo2}
            style={{ width: 261, height: 41 }}
          />
        </View>

        <View>
          <Text text70 marginB-10>
            Login to your account
          </Text>
        </View>

        <InputBox
          control={control}
          errors={errors}
          placeholder="Enter your email"
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
          placeholder="Enter your password"
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

          <Button
            link
            label="Register"
            onPress={() => navigation.replace("SignUp")}
          />
        </View>
      </View>
    </EnhancedKeyboardAvoidingView>
  );
};

export default LoginView;
