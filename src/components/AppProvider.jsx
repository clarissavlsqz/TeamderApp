import React from "react";
import { ClassContextProvider } from "../context/class-context";
import { UserContextProvider } from "../context/user-context";

const AppProvider = ({ children }) => (
  <UserContextProvider>
    <ClassContextProvider>{children}</ClassContextProvider>
  </UserContextProvider>
);

export default AppProvider;
