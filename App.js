import "react-native-gesture-handler";
import InitialView from "./views/InitialView";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import BottomTabNav from "./src/components/BottomTabNav";
import AddGroupView from "./views/AddGroupView";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateClassView from "./views/CreateClassView";
import AppProvider from "./src/components/AppProvider";
import EditProfile from "./views/EditProfileView";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand-VariableFont_wght.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const [user, userLoading, error] = useAuthState(auth);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (error) {
    SplashScreen.hideAsync();

    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!fontsLoaded || userLoading) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <AppProvider>
      <NavigationContainer>
        {user === null ? (
          <Stack.Navigator initialRouteName="Initial">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Initial"
              component={InitialView}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignUp"
              component={SignUpView}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginView}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Tab">
            <Stack.Screen
              name="Tab"
              component={BottomTabNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddGroup"
              component={AddGroupView}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="CreateClass"
              component={CreateClassView}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AppProvider>
  );
}
