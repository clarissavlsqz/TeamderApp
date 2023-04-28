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
  const {
    classes: rawClasses,
    groups: rawGroups,
    members: rawMembers,
    users: rawUsers,
  } = state;

  useEffect(() => createListeners(uid, dispatch), [uid]);

  const membership = useMemo(() => {
    if (!uid) {
      return [];
    }

    return rawMembers.filter(({ userid }) => userid === uid);
  }, [rawMembers, uid]);

  const memoizedData = useMemo(() => {
    const userMap = {};

    rawUsers.forEach((dbUser) => {
      userMap[dbUser.id] = dbUser;
    });

    const members = rawMembers.map((member) => ({
      user: userMap[member.userid],
      ...member,
    }));

    const classesMap = {};
    rawClasses.forEach((classDoc) => {
      classesMap[classDoc.id] = classDoc;
    });

    const userGroupIds = new Set(
      members
        .filter(
          ({ userid, groupid }) => userid === uid && groupid !== undefined
        )
        .map(({ groupid }) => groupid)
    );

    const userGroups = rawGroups.filter(({ id }) => userGroupIds.has(id));

    const groups = {};
    userGroups.forEach((group) => {
      groups[group.id] = {
        ...group,
        class: classesMap[group.fromclass],
        members: [],
      };
    });

    members.forEach((member) => {
      if (!member.groupid) {
        return;
      }

      if (groups[member.groupid]) {
        groups[member.groupid].members.push(member);
      }
    });

    const newClasses = rawClasses.map((classObj) => ({
      members: members.filter(({ classId }) => classId === classObj.id),
      ...classObj,
    }));

    const classIds = new Set(membership.map(({ classid }) => classid));

    return {
      userGroups: Object.values(groups),
      classes: newClasses,
      userClasses: newClasses.filter(({ id }) => classIds.has(id)),
    };
  }, [rawUsers, rawMembers, rawClasses, rawGroups]);

  const dispatchStateProvider = useMemo(
    () => [
      {
        membership,
        ...state,
        ...memoizedData,
      },
      dispatch,
    ],
    [state, memoizedData, dispatch]
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

  const [
    { classes, selectedClass, membership, userClasses, userGroups },
    dispatch,
  ] = context;

  return {
    allClasses: classes,
    userClasses,
    selectedClass,
    userGroups,

    joinClass: (classId, callback) =>
      joinClass(user, membership, classes, classId, callback),
    createClass: (data, callback) =>
      createClass(data, user, callback, dispatch),
  };
};
