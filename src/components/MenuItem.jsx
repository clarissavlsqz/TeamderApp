import React from "react";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";

const MenuItem = ({ label, icon, onPress }) => (
  <TouchableOpacity row centerV paddingV-10 paddingH-20 onPress={onPress}>
    <View marginR-10 backgroundColor="#eee" padding-10 br30>
      {icon}
    </View>
    <Text text80>{label}</Text>
    <View flexG />
    <AntDesign name="right" size={12} color="black" />
  </TouchableOpacity>
);

export default MenuItem;
