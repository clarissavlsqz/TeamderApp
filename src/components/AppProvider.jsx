import React from "react";
import { UserContextProvider } from "../context/user-context";

const AppProvider = ({ children }) => (
  <UserContextProvider>{children}</UserContextProvider>
);

export default AppProvider;
