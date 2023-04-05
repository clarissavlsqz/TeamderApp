import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import HomeView from "../../views/HomeView";
import ClassView from "../../views/ClassView";
import NotificationsView from "../../views/NotificationsView";
import ProfileView from "../../views/ProfileView";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();



export default function BottomTabNav({navigation}) {
  return (
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
        component={HomeView}
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: "Teams",
          headerStyle: {
            backgroundColor: "#2B2343",
          },
          headerTintColor: "#F5F5F5",
          headerRight: () => (
            <View style={styles.createGroupIcon}>
              <MaterialIcons
                name="group-add"
                color="#F5F5F5"
                size={24}
                onPress={() => console.log("CREATE GROUP")}
              />
            </View>
          ),
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
                onPress={() => navigation.navigate("AddGroup")}
              />
            </View>
          ),
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
          headerRight: () => (
            <View style={styles.createGroupIcon}>
              <MaterialIcons
                name="edit"
                color="#F5F5F5"
                size={24}
                onPress={() => navigation.push("EditProfile")}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  createGroupIcon: {
    paddingRight: 20,
  },
});
