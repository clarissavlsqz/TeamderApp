import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  createListeners,
  createClass,
  createDefaultState,
  joinClass,
  reducer,
} from "../reducers/class-reducer";
import { useUserContext } from "./user-context";

export const ClassContext = createContext();

export const ClassContextProvider = ({ children }) => {
  const { user } = useUserContext();
  const uid = user?.uid;

  const [state, dispatch] = useReducer(reducer, createDefaultState());
  const { classes, groups, members, users } = state;

  useEffect(() => createListeners(uid, dispatch), [uid]);

  const classmates = useMemo(() => {
    const userMap = {};

    users.forEach((dbUser) => {
      userMap[dbUser.id] = dbUser;
    });

    const memberUserMap = members.map((member) => ({
      user: userMap[member.userid],
      ...member,
    }));

    const newClasses = classes.map((classObj) => ({
      members: memberUserMap.filter(({ classId }) => classId === classObj.id),
      ...classObj,
    }));
  }, [users, members, classes]);

  const membership = useMemo(() => {
    if (!uid) {
      return [];
    }

    return members.filter(({ userid }) => userid === uid);
  }, [members, uid]);

  const userClasses = useMemo(() => {
    if (!uid) {
      return [];
    }

    const classIds = new Set(membership.map(({ classid }) => classid));
    return classes.filter(({ id }) => classIds.has(id));
  }, [classes, membership, uid]);

  const dispatchStateProvider = useMemo(
    () => [
      {
        userClasses,
        membership,
        ...state,
      },
      dispatch,
    ],
    [state, userClasses, dispatch]
  );

  return (
    <ClassContext.Provider value={dispatchStateProvider}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => {
  const context = useContext(ClassContext);

  if (!context) {
    throw new Error("useClassContext must be used within a AppProvider");
  }

  const { user } = useUserContext();

  const [{ classes, selectedClass, membership, userClasses }, dispatch] =
    context;

  return {
    allClasses: classes,
    userClasses,
    selectedClass,

    joinClass: (classId, callback) =>
      joinClass(user, membership, classes, classId, callback),
    createClass: (data, callback) =>
      createClass(data, user, callback, dispatch),
  };
};
