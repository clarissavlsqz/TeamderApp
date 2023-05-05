import React from "react";
import { ActivityIndicator } from "react-native";
import { Button } from "react-native-ui-lib";

const LoadingButton = ({ loading, label, onPress, ...rest }) => (
  <Button
    label={loading ? "" : label}
    disabled={loading}
    onPress={onPress}
    borderRadius={7}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {loading && <ActivityIndicator />}
  </Button>
);

export default LoadingButton;
