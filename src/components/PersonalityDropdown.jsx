import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Controller } from "react-hook-form";
import constants from "../constants";

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
  <View style={styles.root}>
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>Personality</Text>

        <Controller
          control={control}
          rules={{
            required: {
              message: "This field is required.",
              value: true,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select personality"
              value={value}
              onBlur={onBlur}
              onChange={(item) => onChange(item.value)}
            />
          )}
          name="personality"
        />
      </View>
    </View>
    {errors.personality && (
      <Text style={styles.error}>{errors.personality.message}</Text>
    )}
  </View>
);

export default PersonalityDropdown;

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "baseline",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 7.5,
    paddingHorizontal: 12.5,
    paddingBottom: 2.5,
    borderRadius: 5,
    borderWidth: 0.75,
    borderColor: constants.BACKGROUND_COLOR,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontFamily: constants.FONT_FAMILY,
    marginLeft: 5,
    color: constants.BACKGROUND_COLOR,
    fontSize: 12,
  },
  error: {
    fontFamily: constants.FONT_FAMILY,
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
