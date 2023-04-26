import React from "react";
import { Controller } from "react-hook-form";
import { Picker } from "react-native-ui-lib/src/components/picker";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native-ui-lib";

const data = [
  { label: "INTJ", value: "INTJ" },
  { label: "INTP", value: "INTP" },
  { label: "ENTJ", value: "ENTJ" },
  { label: "ENTP", value: "ENTP" },
  { label: "INFJ", value: "INFJ" },
  { label: "INFP", value: "INFP" },
  { label: "ENFJ", value: "ENFJ" },
  { label: "ENFP", value: "ENFP" },
  { label: "ISTJ", value: "ISTJ" },
  { label: "ISFJ", value: "ISFJ" },
  { label: "ESTJ", value: "ESTJ" },
  { label: "ESFJ", value: "ESFJ" },
  { label: "ISTP", value: "ISTP" },
  { label: "ISFP", value: "ISFP" },
  { label: "ESTP", value: "ESTP" },
  { label: "ESFP", value: "ESFP" },
].sort(({ label: label1 }, { label: label2 }) => label1.localeCompare(label2));

const PersonalityDropdown = ({ control, errors }) => (
  <View>
    <View row paddingT-8 paddingB-3>
      <View flex>
        <Text marginB-5 text90 grey20>
          Personality
        </Text>
        <Controller
          control={control}
          rules={{
            required: {
              message: "This field is required.",
              value: true,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              trailingAccessory={
                <Ionicons name="caret-down-outline" color="black" size={24} />
              }
              fieldStyle={{
                borderRadius: 5,
                borderWidth: 0.75,
                borderColor: errors.personality ? "red" : "black",
                paddingVertical: 6,
                paddingHorizontal: 10,
              }}
            >
              {data.map(({ label }) => (
                <Picker.Item key={label} value={label} label={label} />
              ))}
            </Picker>
          )}
          name="personality"
        />
      </View>
    </View>
    {errors.personality && <Text error>{errors.personality.message}</Text>}
  </View>
);

export default PersonalityDropdown;
