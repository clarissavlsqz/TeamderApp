import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { auth } from "../../../../firebaseConfig";
import { useUserContext } from "../../../context/user-context";
import UserAvatar from "../../../components/UserAvatar";
import MenuItem from "../../../components/MenuItem";

const ProfileView = ({ navigation }) => {
  const { user } = useUserContext();

  const onLogout = () => {
    auth.signOut();
  };

  if (user === null) {
    return null;
  }

  return (
    <View useSafeArea flex margin-40 bg-screenBG>
      <StatusBar style="light" />
      <View centerH marginB-30 marginT-20>
        <UserAvatar user={user} size={100} />

        <Text marginT-10 text60>
          {user.firstName} {user.lastName}
        </Text>

        <Text text80>Personality {user.personality}</Text>
      </View>

      <View flexG centerV>
        <View bg-screenPop br60 paddingV-20 paddingH-10>
          <MenuItem
            label="Settings"
            icon={<AntDesign name="setting" size={24} color="black" />}
          />
          <MenuItem
            label="Edit Profile"
            onPress={() => navigation.push("EditProfile")}
            icon={
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color="black"
              />
            }
          />
          <MenuItem
            label="Log Out"
            icon={<MaterialIcons name="logout" size={24} color="black" />}
            onPress={onLogout}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileView;
