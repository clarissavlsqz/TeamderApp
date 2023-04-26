import React from "react";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Text, TextField, View } from "react-native-ui-lib";
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

export default InputBox;
