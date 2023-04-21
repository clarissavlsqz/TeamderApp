import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  clearSelectedClass,
  createClass,
  createClassListener,
  createDefaultState,
  joinClass,
  reducer,
  selectClass,
} from "../reducers/class-reducer";
import { useUserContext } from "./user-context";

export const ClassContext = createContext();

export const ClassContextProvider = ({ children }) => {
  const { user } = useUserContext();

  const [state, dispatch] = useReducer(reducer, createDefaultState());

  useEffect(() => createClassListener(user, dispatch), [user]);

  const dispatchStateProvider = useMemo(
    () => [state, dispatch],
    [state, dispatch]
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

  const [state, dispatch] = context;

  return {
    allClasses: state.classes,
    userClasses: state.userClasses,
    selectedClass: state.selectedClass,

    joinClass: (classId, callback) =>
      joinClass(user, state.membership, state.classes, classId, callback),
    createClass: (data, callback) =>
      createClass(data, user, callback, dispatch),
    selectClass: (userClass) => selectClass(userClass, dispatch),
    deselectClass: () => clearSelectedClass(dispatch),
  };
};
