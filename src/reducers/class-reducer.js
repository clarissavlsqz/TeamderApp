import {
  FieldPath,
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const FETCH_CLASSES = "FETCH_CLASSES";
const FETCH_CLASS_MEMBERSHIP = "FETCH_CLASS_MEMBERSHIP";
const CLEAR_CLASSES = "CLEAR_CLASSES";
const SELECT_CLASS = "SELECT_CLASS";
const LOAD_CLASSMATES = "LOAD_CLASSMATES";
const CLEAR_SELECTED_CLASS = "CLEAR_SELECTED_CLASS";

const fetchClassesResponse = (data) => ({ type: FETCH_CLASSES, payload: data });
const fetchClassesMembershipResponse = (data) => ({
  type: FETCH_CLASS_MEMBERSHIP,
  payload: data,
});
const selectClassStart = (data) => ({ type: SELECT_CLASS, payload: data });
const loadClassmatesResponse = (data) => ({
  type: LOAD_CLASSMATES,
  payload: data,
});
const clearClassSelection = () => ({ type: CLEAR_SELECTED_CLASS });
const clearClasses = () => ({ type: CLEAR_CLASSES });

export const createDefaultState = () => ({
  classes: [],
  userClasses: [],
  membership: [],
  selectedClass: {
    class: null,
    classmates: null,
    loading: false,
  },
});

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_CLASSES: {
      return { ...state, classes: action.payload };
    }
    case FETCH_CLASS_MEMBERSHIP: {
      const classIds = new Set(action.payload.map(({ classid }) => classid));
      const userClasses = state.classes.filter(({ id }) => classIds.has(id));

      return { ...state, membership: action.payload, userClasses };
    }
    case CLEAR_CLASSES: {
      return createDefaultState();
    }
    case CLEAR_SELECTED_CLASS: {
      return {
        ...state,
        selectedClass: {
          class: null,
          classmates: null,
          loading: false,
        },
      };
    }
    case SELECT_CLASS: {
      return {
        ...state,
        selectedClass: {
          class: action.payload,
          classmates: null,
          loading: true,
        },
      };
    }
    case LOAD_CLASSMATES: {
      return {
        ...state,
        selectedClass: {
          class: state.selectedClass.class,
          classmates: action.payload,
          loading: false,
        },
      };
    }
    default:
      throw new Error();
  }
};

export const loadMembers = (user, dispatch) => {
  const memberRef = collection(db, "member");
  const memberQuery = query(memberRef, where("userid", "==", user.uid));

  getDocs(memberQuery).then((querySnapshot) => {
    dispatch(
      fetchClassesMembershipResponse(
        querySnapshot.docs.map((memberDoc) => memberDoc.data())
      )
    );
  });
};

export const createClassListener = (user, dispatch) => {
  if (user === null) {
    dispatch(clearClasses());
    return () => {};
  }

  const classRef = collection(db, "class");

  const unsubscribeClasses = onSnapshot(
    classRef,
    async (querySnapshot) => {
      dispatch(
        fetchClassesResponse(
          querySnapshot.docs.map((classDoc) => classDoc.data())
        )
      );
      loadMembers(user, dispatch);
    },

    (error) => {
      console.error(error);
    }
  );

  const memberRef = collection(db, "member");
  const memberQuery = query(memberRef, where("userid", "==", user.uid));

  const unsubscribeMembers = onSnapshot(
    memberQuery,
    async (querySnapshot) => {
      dispatch(
        fetchClassesMembershipResponse(
          querySnapshot.docs.map((memberDoc) => memberDoc.data())
        )
      );
    },

    (error) => {
      console.error(error);
    }
  );

  return () => {
    unsubscribeClasses();
    unsubscribeMembers();
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
      console.error(error);
      callback(false, "firebase error");
    });
};

export const clearSelectedClass = (dispatch) => {
  dispatch(clearClassSelection());
};

export const selectClass = (userClass, dispatch) => {
  dispatch(selectClassStart(userClass));

  const memberRef = collection(db, "member");
  const memberQuery = query(memberRef, where("classid", "==", userClass.id));

  getDocs(memberQuery)
    .then((memberQuerySnapshot) => {
      const userIds = new Set();
      const groupIds = new Set();
      const userGroup = {};
      memberQuerySnapshot.forEach((userDoc) => {
        userIds.add(userDoc.get("userid"));
        userGroup[userDoc.get("userid")] = userDoc.get("groupid");

        const groupId = userDoc.get("groupid");
        if (groupId && !groupIds.has(groupId)) {
          groupIds.add(groupId);
        }
      });

      console.log(userGroup);
      console.log(groupIds);

      if (userIds.size === 0) {
        dispatch(loadClassmatesResponse([]));
        return Promise.resolve();
      }

      const usersRef = collection(db, "users");

      const classmateQuery = query(
        usersRef,
        where(documentId(), "in", [...userIds])
      );

      return getDocs(classmateQuery).then((classmateQuerySnapshot) => {
        if (groupIds.size === 0) {
          dispatch(
            loadClassmatesResponse(
              classmateQuerySnapshot.docs.map((classmateDoc) =>
                classmateDoc.data()
              )
            )
          );

          return Promise.resolve();
        }

        const groupRef = collection(db, "group");

        const groupQuery = query(
          groupRef,
          where(documentId(), "in", [...groupIds])
        );

        return getDocs(groupQuery).then((groupQuerySnapshot) => {
          const groupMap = {};
          groupQuerySnapshot.forEach((groupDoc) => {
            groupMap[groupDoc.id] = groupDoc.data();
          });

          dispatch(
            loadClassmatesResponse(
              classmateQuerySnapshot.docs.map((classmateDoc) => {
                const data = classmateDoc.data();

                return {
                  group: groupMap[userGroup[classmateDoc.id]],
                  groupId: userGroup[classmateDoc.id],
                  ...data,
                };
              })
            )
          );
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createClass = (
  { classId, className, classDesc, capacity },
  user,
  callback,
  dispatch
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
    selectClass(classData, dispatch);
    callback(true);
  });
};
