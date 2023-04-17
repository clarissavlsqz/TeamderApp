import React, { useReducer, useEffect, createContext } from "react";
import { useContext } from "react";
import {
  createUserProfile,
  fetchUser,
  reducer,
  updateUserProfile,
} from "../reducers/user-reducer";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });

  const [user, _loading, _error] = useAuthState(auth);

  useEffect(() => {
    fetchUser(dispatch);
  }, [user]);

  return <UserContext.Provider value={[state, dispatch]} {...props} />;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a AppProvider");
  }

  const [state, dispatch] = context;

  return {
    user: state.user,

    updateProfile: (data) => updateUserProfile(data, dispatch),
    createUser: (data) => createUserProfile(data, dispatch),
  };
};
