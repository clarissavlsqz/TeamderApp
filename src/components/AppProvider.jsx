import React from "react";
import { ClassContextProvider } from "../context/class-context";
import { UserContextProvider } from "../context/user-context";
import { NotificationsContextProvider } from "../context/notifications-context";

const AppProvider = ({ children }) => (
  <UserContextProvider>
    <NotificationsContextProvider>
      <ClassContextProvider>{children}</ClassContextProvider>
    </NotificationsContextProvider>
  </UserContextProvider>
);

export default AppProvider;
