/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import TeamsView from "../views/main/teams/TeamsView";
import NotificationsView from "../views/main/notifications/NotificationsView";
import ClassNavigator from "../views/main/class/ClassNavigator";
import ProfileNavigator from "../views/main/profile/ProfileNavigator";

const { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

const BottomTabNav = () => (
  <View
    style={{
      width,
      height,
    }}
  >
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
        component={TeamsView}
        options={{
          headerShown: true,
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
