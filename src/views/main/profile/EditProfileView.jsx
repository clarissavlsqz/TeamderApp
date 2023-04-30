import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { useUserContext } from "../../../context/user-context";
import InputBox from "../../../components/InputBox";
import PersonalityDropdown from "../../../components/PersonalityDropdown";
import LoadingButton from "../../../components/LoadingButton";
import EnhancedKeyboardAvoidingView from "../../../components/EnhancedKeyboardAvoidingView";
import UserAvatar from "../../../components/UserAvatar";

const EditProfile = ({ navigation }) => {
  const { user, updateProfile } = useUserContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      personality: user.personality,
    },
  });

  if (user === null) {
    return null;
  }

  const onSubmit = (data) => {
    updateProfile(data);

    navigation.pop();
  };

  return (
    <EnhancedKeyboardAvoidingView>
      <View useSafeArea flex margin-40 bg-screenBG>
        <StatusBar barStyle="light-content" />
        <View centerH marginB-30>
          <UserAvatar user={user} size={100} />
        </View>

        <View>
          <Text text70 marginB-10>
            Edit your Profile
          </Text>
        </View>

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

        <LoadingButton
          onPress={handleSubmit(onSubmit)}
          label="Save Changes"
          loading={false}
          marginV-30
        />
      </View>
    </EnhancedKeyboardAvoidingView>
  );
};

export default EditProfile;
