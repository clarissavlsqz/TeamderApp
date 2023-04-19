/* eslint-disable react/jsx-filename-extension */
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthState } from "react-firebase-hooks/auth";
import InitialView from "./src/views/auth/InitialView";
import SignUpView from "./src/views/auth/SignUpView";
import LoginView from "./src/views/auth/LoginView";
import BottomTabNav from "./src/components/BottomTabNav";
import AddClassView from "./src/views/main/AddClassView";
import { auth } from "./firebaseConfig";
import CreateClassView from "./src/views/main/CreateClassView";
import AppProvider from "./src/components/AppProvider";
import EditProfile from "./src/views/main/EditProfileView";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    Quicksand: require("./assets/fonts/Quicksand-VariableFont_wght.ttf"),
    // eslint-disable-next-line global-require
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
        <p>
          Error:
          {error.message}
        </p>
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
              name="AddClass"
              component={AddClassView}
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
};

export default App;
