import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamsView from "./TeamsView";
import TeamChatView from "./TeamChatView";

const Stack = createNativeStackNavigator();

const TeamsNavigator = () => (
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
      component={TeamsView}
      options={{
        headerShown: true,
        title: "Teams",
      }}
    />
    <Stack.Screen
      name="TeamChat"
      component={TeamChatView}
      options={({ route }) => ({
        headerShown: true,
        title: route.params.groupName,
      })}
    />
  </Stack.Navigator>
);

export default TeamsNavigator;
