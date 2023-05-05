import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "./EditProfileView";
import ProfileView from "./ProfileView";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="Root"
    screenOptions={{
      headerBackVisible: true,
      presentation: "card",
      headerStyle: {
        backgroundColor: "#2B2343",
      },
      headerTintColor: "#F5F5F5",
    }}
  >
    <Stack.Screen
      name="Root"
      component={ProfileView}
      options={{
        headerShown: true,
        title: "Profile",
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{ headerShown: true, title: "Edit Profile" }}
    />
  </Stack.Navigator>
);

export default ProfileNavigator;
