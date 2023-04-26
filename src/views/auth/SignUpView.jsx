import React, { useState } from "react";
import { A } from "@expo/html-elements";
import { useForm, useWatch } from "react-hook-form";
import { Button, Text, View } from "react-native-ui-lib";
import PersonalityDropdown from "../../components/PersonalityDropdown";
import InputBox from "../../components/InputBox";
import { useUserContext } from "../../context/user-context";
import LoadingButton from "../../components/LoadingButton";

const SignUpView = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const { createUser } = useUserContext();

  const pwd = useWatch({
    control,
    name: "password",
  });

  const onSubmit = (data) => {
    setLoading(true);
    createUser(data);
  };

  return (
    <View useSafeArea flex centerV padding-40 bg-screenBG>
      <Text text70 marginB-10>
        Create your account
      </Text>

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
      <Text>
        If you don&apos;t know your personality, you can discover it by
        completing this{" "}
        <A
          href="https://www.16personalities.com/free-personality-test"
          style={{ color: "blue", fontWeight: "bold" }}
        >
          quiz
        </A>
      </Text>
      <LoadingButton
        onPress={handleSubmit(onSubmit)}
        label="Create Account"
        loading={loading}
        marginV-30
      />

      <View centerH>
        <Text>Already have an account?</Text>

        <Button link label="Login" />
      </View>
    </View>
  );
};

export default SignUpView;
