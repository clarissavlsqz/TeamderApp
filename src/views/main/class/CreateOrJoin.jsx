import React from "react";
import { StatusBar } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MenuItem from "../../../components/MenuItem";

const CreateOrJoinView = ({ navigation }) => (
  <View useSafeArea flex margin-40 bg-screenBG>
    <StatusBar barStyle="light-content" />
    <View flexG>
      <Text text60 center marginB-10>
        Join or Create a Class
      </Text>
      <View paddingH-16 paddingV-8 br60 backgroundColor="white">
        <MenuItem
          icon={<Ionicons name="create-outline" size={24} color="black" />}
          label="Create Class"
          onPress={() => navigation.push("CreateClass")}
        />
        <MenuItem
          icon={
            <MaterialCommunityIcons
              name="google-classroom"
              size={24}
              color="black"
            />
          }
          label="Join Class"
          onPress={() => navigation.push("AddClass")}
        />
      </View>
    </View>
  </View>
);

export default CreateOrJoinView;
