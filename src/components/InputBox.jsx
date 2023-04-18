import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

const InputBox = ({
  control,
  errors,
  rules,
  name,
  label,
  password = false,
}) => {
  const {
    password: passwordEnabled,
    icon,
    onClickIcon,
  } = useTogglePasswordVisibility();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{label}</Text>

          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={constants.BACKGROUND_COLOR}
                style={styles.input}
                secureTextEntry={passwordEnabled && password}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name={name}
          />
        </View>

        {password && (
          <Ionicons
            name={icon}
            color="black"
            onPress={onClickIcon}
            size={24}
            style={styles.icon}
          />
        )}
      </View>
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </View>
  );
};

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
  input: {
    fontFamily: constants.FONT_FAMILY,
    fontSize: 14,
    height: 37,
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
});

export default InputBox;
