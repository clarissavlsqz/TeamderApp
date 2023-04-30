import "react-native-gesture-handler"; // needs to be the first import
import "./src/utils/color-scheme"; // needs to be the second import
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthState } from "react-firebase-hooks/auth";
import InitialView from "./src/views/auth/InitialView";
import SignUpView from "./src/views/auth/SignUpView";
import LoginView from "./src/views/auth/LoginView";
import BottomTabNav from "./src/components/BottomTabNav";
import AddClassView from "./src/views/main/class/AddClassView";
import { auth } from "./firebaseConfig";
import CreateClassView from "./src/views/main/class/CreateClassView";
import AppProvider from "./src/components/AppProvider";
import EditProfile from "./src/views/main/profile/EditProfileView";
import CreateClassSummaryView from "./src/views/main/class/CreateClassSummaryView";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    Quicksand: require("./assets/fonts/Quicksand-VariableFont_wght.ttf"),
    // eslint-disable-next-line global-require
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    // eslint-disable-next-line global-require
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [user, userLoading, error] = useAuthState(auth);

  useEffect(() => {
    if (appIsReady) {
      return;
    }

    setAppIsReady(error || (fontsLoaded && !userLoading));
  }, [error, fontsLoaded, userLoading]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (error) {
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

  return (
    <AppProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        {user == null ? (
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
            <Stack.Screen
              name="CreateClassSummary"
              component={CreateClassSummaryView}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
