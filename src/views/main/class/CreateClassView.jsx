import React from "react";
import { useForm } from "react-hook-form";
import { customAlphabet } from "nanoid/non-secure";
import { Text, View } from "react-native-ui-lib";
import InputBox from "../../../components/InputBox";
import { useClassContext } from "../../../context/class-context";
import EnhancedKeyboardAvoidingView from "../../../components/EnhancedKeyboardAvoidingView";
import LoadingButton from "../../../components/LoadingButton";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const CreateClassView = ({ navigation }) => {
  const { createClass } = useClassContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    const classId = `${nanoid(4)}-${nanoid(4)}`;
    createClass(
      {
        ...data,
        classId,
      },
      () => {
        navigation.replace("CreateClassSummary", {
          classId,
        });
      }
    );
  };

  return (
    <EnhancedKeyboardAvoidingView>
      <View useSafeArea flex margin-40 bg-screenBG>
        <View centerH marginB-30>
          <Text marginT-10 text60>
            Let&apos;s create your class
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
          label="Class Name"
          name="className"
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
          label="Class Description"
          name="classDesc"
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
          label="Capacity"
          name="capacity"
        />

        <LoadingButton
          onPress={handleSubmit(onSubmit)}
          label="Create Class"
          loading={false}
          marginV-30
        />
      </View>
    </EnhancedKeyboardAvoidingView>
  );
};

export default CreateClassView;
