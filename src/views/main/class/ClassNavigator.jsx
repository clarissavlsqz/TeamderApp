import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native-ui-lib";
import { MaterialIcons } from "@expo/vector-icons";
import AddClassView from "./AddClassView";
import CreateClassView from "./CreateClassView";
import CreateClassSummaryView from "./CreateClassSummaryView";
import ClassView from "./ClassView";
import CreateOrJoinView from "./CreateOrJoin";

const Stack = createNativeStackNavigator();

const ClassNavigator = ({ navigation }) => (
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
      component={ClassView}
      options={{
        headerShown: true,
        title: "Classes",
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <View>
            <MaterialIcons
              name="add"
              color="#F5F5F5"
              size={24}
              onPress={() => navigation.navigate("CreateOrJoin")}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddClass"
      component={AddClassView}
      options={{ headerShown: true, title: "Join a Class" }}
    />
    <Stack.Screen
      name="CreateClass"
      component={CreateClassView}
      options={{ headerShown: true, title: "Create a Class" }}
    />
    <Stack.Screen
      name="CreateOrJoin"
      component={CreateOrJoinView}
      options={{ headerShown: true, title: "" }}
    />
    <Stack.Screen
      name="CreateClassSummary"
      component={CreateClassSummaryView}
      options={{ headerShown: true, title: "Create Summary" }}
    />
  </Stack.Navigator>
);

export default ClassNavigator;
