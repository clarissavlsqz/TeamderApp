/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import TeamsView from "../views/main/teams/TeamsView";
import ClassView from "../views/main/class/ClassView";
import NotificationsView from "../views/main/notifications/NotificationsView";
import ProfileView from "../views/main/profile/ProfileView";
import CreateOrJoinView from "../views/main/class/CreateOrJoin";

const Tab = createBottomTabNavigator();

const BottomTabNav = ({ navigation }) => (
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
        } else if (route.name === "CreateOrJoin") {
          iconName = focused ? "add-circle" : "add-circle-outline";
          isMaterialIcon = false;
        }

        // You can return any component that you like here!
        return isMaterialIcon ? (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        ) : (
          <Ionicons
            name={iconName}
            size={route.name === "CreateOrJoin" ? 36 : size}
            color={color}
          />
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
      component={ClassView}
      options={{
        headerShown: true,
        headerBackVisible: false,
        title: "Class",
        headerStyle: {
          backgroundColor: "#2B2343",
        },
        headerTintColor: "#F5F5F5",
        headerRight: () => (
          <View style={styles.createGroupIcon}>
            <MaterialIcons
              name="add"
              color="#F5F5F5"
              size={24}
              onPress={() => navigation.navigate("AddClass")}
            />
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="CreateOrJoin"
      component={CreateOrJoinView}
      options={{
        headerShown: true,
        headerBackVisible: false,
        title: "",
        headerStyle: {
          backgroundColor: "#2B2343",
        },
        headerTintColor: "#F5F5F5",
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
      component={ProfileView}
      options={{
        headerShown: true,
        headerBackVisible: false,
        title: "Profile",
        headerStyle: {
          backgroundColor: "#2B2343",
        },
        headerTintColor: "#F5F5F5",
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  createGroupIcon: {
    paddingRight: 20,
  },
});

export default BottomTabNav;
