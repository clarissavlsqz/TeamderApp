import React from "react";
import { UserContextProvider } from "../context/user-context";

function AppProvider({ children }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

export default AppProvider;
