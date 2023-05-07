import React, {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  createNotification,
  deleteNotification,
  fetchNotifications,
  reducer,
  updateNotification,
} from "../reducers/notifications-reducer";
import { useUserContext } from "./user-context";

export const NotificationsContext = createContext();

export const NotificationsContextProvider = ({ children }) => {
  const { user } = useUserContext();
  const uid = user?.uid;

  const [state, dispatch] = useReducer(reducer, {
    notifications: null,
  });

  useEffect(() => {
    fetchNotifications(dispatch, uid);
  }, [uid]);

  const dispatchStateProvider = useMemo(
    () => [state, dispatch],
    [state, dispatch]
  );

  return (
    <NotificationsContext.Provider value={dispatchStateProvider}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a AppProvider"
    );
  }

  const [state, _dispatch] = context;

  return {
    notifications: state.notifications,

    updateNotification,
    createNotification,
    deleteNotification,
  };
};
