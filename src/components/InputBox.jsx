import React from "react";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Text, TextField, View } from "react-native-ui-lib";
import constants from "../constants";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

const InputBox = ({
  control,
  errors,
  rules,
  name,
  label,
  placeholder,
  password = false,
}) => {
  const {
    password: passwordEnabled,
    icon,
    onClickIcon,
  } = useTogglePasswordVisibility();

  return (
    <View>
      <View row paddingT-8 paddingB-3>
        <View flex>
          <Text marginB-5 text90 grey20>
            {label}
          </Text>
          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                autoCapitalize="none"
                secureTextEntry={passwordEnabled && password}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                value={value}
                trailingAccessory={
                  password && (
                    <Ionicons
                      name={icon}
                      color="black"
                      onPress={onClickIcon}
                      size={24}
                    />
                  )
                }
                fieldStyle={{
                  borderRadius: 5,
                  borderWidth: 0.75,
                  borderColor: errors[name] ? "red" : "black",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                }}
              />
            )}
            name={name}
          />
        </View>

        {}
      </View>
      {errors[name] && <Text error>{errors[name].message}</Text>}
    </View>
  );
};

const styles = {
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
  },
  input: {
    fontFamily: constants.FONT_FAMILY,
    fontSize: 14,
    height: 37,
  },
  label: {
    fontFamily: constants.FONT_FAMILY,
    marginLeft: 0,
    color: constants.BACKGROUND_COLOR,
    fontSize: 12,
  },
  error: {
    fontFamily: constants.FONT_FAMILY,
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 12,
  },
};

export default InputBox;
