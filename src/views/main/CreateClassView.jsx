import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { customAlphabet } from "nanoid/non-secure";
import InputBox from "../../components/InputBox";
import { useClassContext } from "../../context/class-context";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const CreateClassView = ({ navigation }) => {
  // const [classIdMessage, setClassIdMessage] = useState(false);
  const { createClass } = useClassContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    createClass(
      {
        ...data,
        classId: `${nanoid(4)}-${nanoid(4)}`,
      },
      () => {
        navigation.replace("CreateClassSummary");
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Let&apos;s create your class</Text>
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

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}> Create Class </Text>
      </TouchableOpacity>

      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
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
  button: {
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});

export default CreateClassView;
