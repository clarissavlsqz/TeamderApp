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
  updateGroupName,
  deleteClass,
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
    const allmemberships = rawMembers;

    rawUsers.forEach((dbUser) => {
      userMap[dbUser.id] = dbUser;
    });

    const activeClasses = rawClasses.filter(
      (classObj) => classObj.isactive === "1"
    );

    const members = rawMembers.map((member) => ({
      user: userMap[member.userid],
      ...member,
    }));

    // Filter out the inactive class IDs
    const activeClassIds = new Set(activeClasses.map(({ id }) => id));

    // Filter out the inactive groups
    const activeGroups = rawGroups.filter(({ fromclass }) =>
      activeClassIds.has(fromclass)
    );

    // Filter out the inactive memberships
    const activeMemberships = members.filter(({ classid }) =>
      activeClassIds.has(classid)
    );

    const classesMap = {};
    activeClasses.forEach((classDoc) => {
      classesMap[classDoc.id] = classDoc;
    });

    const userGroupIds = new Set(
      activeMemberships
        .filter(
          ({ userid, groupid }) => userid === uid && groupid !== undefined
        )
        .map(({ groupid }) => groupid)
    );

    const userGroups = activeGroups.filter(({ id }) => userGroupIds.has(id));

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

    const newClasses = activeClasses.map((classObj) => ({
      members: members.filter(({ classid }) => classid === classObj.id),
      ...classObj,
    }));

    const classIds = new Set(membership.map(({ classid }) => classid));

    return {
      userGroups: Object.values(groups),
      classes: newClasses,
      userClasses: newClasses.filter(({ id }) => classIds.has(id)),
      groups: activeGroups,
      userMap,
      allmemberships,
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
    {
      classes,
      selectedClass,
      membership,
      allmemberships,
      userClasses,
      userGroups,
      groups,
      userMap,
    },
    dispatch,
  ] = context;

  return {
    allClasses: classes,
    userClasses,
    selectedClass,
    userGroups,
    allGroups: groups,
    userMap,

    joinClass: (classId, callback) =>
      joinClass(user, membership, allmemberships, classes, classId, callback),
    createClass: (data, callback) =>
      createClass(data, user, callback, dispatch),
    updateGroupName,
    deleteClass,
  };
};
