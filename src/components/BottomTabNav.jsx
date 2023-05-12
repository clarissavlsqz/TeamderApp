/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Platform } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { View } from "react-native-ui-lib";
import NotificationsView from "../views/main/notifications/NotificationsView";
import ClassNavigator from "../views/main/class/ClassNavigator";
import ProfileNavigator from "../views/main/profile/ProfileNavigator";
import { useNotificationsContext } from "../context/notifications-context";
import { useUserContext } from "../context/user-context";
import TeamsNavigator from "../views/main/teams/TeamsNavigator";

const { width } = Dimensions.get("window");
const height =
  Platform.OS === "android" && Platform.Version >= 29
    ? Dimensions.get("window").height
    : Dimensions.get("window").height;
const Tab = createBottomTabNavigator();

const AddNotificationTest = () => {
  const { createNotification } = useNotificationsContext();
  const { user } = useUserContext();

  return (
    <View>
      <MaterialIcons
        name="add"
        color="#F5F5F5"
        size={24}
        onPress={() => {
          createNotification({
            body: "Test body",
            title: "Test title",
            userid: user.uid,
          });
        }}
      />
    </View>
  );
};

const BottomTabNav = () => (
  <View width={width} height={height}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let isMaterialIcon;

          if (route.name === "Home") {
            iconName = focused ? "account-group" : "account-group-outline";
            isMaterialIcon = true;
          } else if (route.name === "Class") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
            isMaterialIcon = true;
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
            isMaterialIcon = false;
          } else if (route.name === "Profile") {
            iconName = focused ? "account-circle" : "account-circle-outline";
            isMaterialIcon = true;
          }

          // You can return any component that you like here!
          return isMaterialIcon ? (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          ) : (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#2B2343",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={TeamsNavigator}
        options={{
          headerShown: false,
          headerBackVisible: false,
          title: "Teams",
          headerStyle: {
            backgroundColor: "#2B2343",
          },
          headerTintColor: "#F5F5F5",
        }}
      />

      <Tab.Screen
        name="Class"
        component={ClassNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsView}
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: "Notifications",
          headerStyle: {
            backgroundColor: "#2B2343",
          },
          headerTintColor: "#F5F5F5",
          headerRight: AddNotificationTest,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          headerBackVisible: false,
          title: "Profile",
          headerStyle: {
            backgroundColor: "#2B2343",
          },
          headerTintColor: "#F5F5F5",
        }}
      />
    </Tab.Navigator>
  </View>
);

export default BottomTabNav;
