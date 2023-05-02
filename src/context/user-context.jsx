import React, {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserProfile,
  fetchUser,
  reducer,
  updateUserProfile,
} from "../reducers/user-reducer";
import { auth } from "../../firebaseConfig";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });

  const [user, _loading, _error] = useAuthState(auth);

  useEffect(() => {
    fetchUser(dispatch);
  }, [user]);

  const dispatchStateProvider = useMemo(
    () => [state, dispatch],
    [state, dispatch]
  );

  return (
    <UserContext.Provider value={dispatchStateProvider}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a AppProvider");
  }

  const [state, dispatch] = context;

  return {
    user: state.user,

    updateProfile: (data, cb) => updateUserProfile(data, dispatch, cb),
    createUser: (data) => createUserProfile(data, dispatch),
  };
};
