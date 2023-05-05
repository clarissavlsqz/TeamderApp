import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "../../../context/user-context";
import InputBox from "../../../components/InputBox";
import PersonalityDropdown from "../../../components/PersonalityDropdown";
import LoadingButton from "../../../components/LoadingButton";
import EnhancedKeyboardAvoidingView from "../../../components/EnhancedKeyboardAvoidingView";
import UserAvatar from "../../../components/UserAvatar";
import AvatarPicker from "../../../components/AvatarPicker";

const EditProfile = ({ navigation }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, updateProfile } = useUserContext();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      personality: user.personality,
      avatar: user.avatar,
    },
  });

  const selectedAvatar = watch("avatar");

  const selectAvatar = useCallback(
    (avatarParam) => {
      setValue("avatar", avatarParam);
      setPopupVisible(false);
    },
    [setValue, setPopupVisible]
  );

  const onDismiss = useCallback(() => {
    setPopupVisible(false);
  }, [setPopupVisible]);

  if (user === null) {
    return null;
  }

  const onSubmit = (data) => {
    setSaving(true);

    updateProfile(data, () => {
      navigation.pop();
    });
  };

  return (
    <>
      <AvatarPicker
        visible={popupVisible}
        onDismiss={onDismiss}
        selectAvatar={selectAvatar}
        selectedAvatar={selectedAvatar}
      />
      <EnhancedKeyboardAvoidingView>
        <View useSafeArea flex margin-40 bg-screenBG>
          <StatusBar style="light" />
          <View centerH marginB-30>
            <UserAvatar
              user={user}
              size={100}
              overrideAvatar={selectedAvatar}
              onPress={() => setPopupVisible(true)}
              badgePosition="BOTTOM_RIGHT"
              badgeProps={{
                customElement: (
                  <MaterialIcons name="edit" color="#F5F5F5" size={14} />
                ),
                size: 28,
              }}
            />
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
            loading={saving}
            marginV-30
          />
        </View>
      </EnhancedKeyboardAvoidingView>
    </>
  );
};

export default EditProfile;
