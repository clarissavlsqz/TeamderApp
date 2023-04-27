import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const FETCH_CLASSES = "FETCH_CLASSES";
const FETCH_MEMBERS = "FETCH_MEMBERS";
const FETCH_USERS = "FETCH_USERS";
const FETCH_GROUPS = "FETCH_GROUPS";

const CLEAR_CLASSES = "CLEAR_CLASSES";

const fetchClassesResponse = (data) => ({ type: FETCH_CLASSES, payload: data });
const fetchMembersResponse = (data) => ({ type: FETCH_MEMBERS, payload: data });
const fetchUsersResponse = (data) => ({ type: FETCH_USERS, payload: data });
const fetchGroupsResponse = (data) => ({ type: FETCH_GROUPS, payload: data });

const clearClasses = () => ({ type: CLEAR_CLASSES });

export const createDefaultState = () => ({
  classes: [],
  groups: [],
  members: [],
  users: [],
});

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_CLASSES: {
      return { ...state, classes: action.payload };
    }
    case FETCH_GROUPS: {
      return { ...state, groups: action.payload };
    }
    case FETCH_MEMBERS: {
      return { ...state, members: action.payload };
    }
    case FETCH_USERS: {
      return { ...state, users: action.payload };
    }

    case CLEAR_CLASSES: {
      return createDefaultState();
    }

    default:
      throw new Error();
  }
};

const errorHandler = (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export const createListeners = (uid, dispatch) => {
  if (!uid) {
    dispatch(clearClasses());
    return () => {};
  }

  const classRef = collection(db, "class");
  const usersRef = collection(db, "user");
  const membersRef = collection(db, "member");
  const groupsRef = collection(db, "group");

  const unsubscribeClasses = onSnapshot(
    classRef,
    async (querySnapshot) => {
      dispatch(
        fetchClassesResponse(
          querySnapshot.docs.map((classDoc) => classDoc.data())
        )
      );
    },
    errorHandler
  );

  const unsubscribeUsers = onSnapshot(
    usersRef,
    async (querySnapshot) => {
      dispatch(
        fetchUsersResponse(querySnapshot.docs.map((userDoc) => userDoc.data()))
      );
    },
    errorHandler
  );

  const unsubscribeMembers = onSnapshot(
    membersRef,
    async (querySnapshot) => {
      dispatch(
        fetchMembersResponse(
          querySnapshot.docs.map((memberDoc) => memberDoc.data())
        )
      );
    },
    errorHandler
  );

  const unsubscribeGroups = onSnapshot(
    groupsRef,
    async (querySnapshot) => {
      dispatch(
        fetchGroupsResponse(
          querySnapshot.docs.map((groupDoc) => groupDoc.data())
        )
      );
    },
    errorHandler
  );

  return () => {
    unsubscribeClasses();
    unsubscribeUsers();
    unsubscribeMembers();
    unsubscribeGroups();
  };
};

export const joinClass = (user, membership, classes, classID, callback) => {
  if (membership.filter(({ classid }) => classid === classID).length !== 0) {
    callback(false, "You have already joined the class!");
    return;
  }

  if (classes.filter(({ id }) => id === classID).length === 0) {
    callback(false, "Class does not exist!");
    return;
  }

  addDoc(collection(db, "member"), {
    classid: classID,
    groupid: "",
    userid: user.uid,
  })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      callback(false, "firebase error");
    });
};

export const createClass = (
  { classId, className, classDesc, capacity },
  user,
  callback,
  _dispatch
) => {
  const classDocRef = doc(db, "class", classId);
  const classData = {
    name: className,
    description: classDesc,
    capacity,
    id: classId,
    admin: user.uid,
  };

  setDoc(classDocRef, classData).then(() => {
    callback(true);
  });
};
