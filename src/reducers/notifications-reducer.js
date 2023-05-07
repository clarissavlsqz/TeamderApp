import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";

const fetchNotificationsResponse = (data) => ({
  type: FETCH_NOTIFICATIONS,
  payload: data,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS: {
      return { ...state, notifications: action.payload };
    }
    default:
      throw new Error();
  }
};
const errorHandler = (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export const fetchNotifications = (dispatch, uid) => {
  if (!uid) {
    dispatch(fetchNotificationsResponse(null));
    return () => {};
  }

  const notificationRef = collection(db, "notifications");

  const unsubscribeNotifications = onSnapshot(
    query(notificationRef, where("userid", "==", uid)),
    async (querySnapshot) => {
      dispatch(
        fetchNotificationsResponse(
          querySnapshot.docs
            .map((notificationDoc) => ({
              id: notificationDoc.id,
              ...notificationDoc.data(),
            }))
            .sort((notifA, notifB) => notifB.timestamp - notifA.timestamp)
        )
      );
    },
    errorHandler
  );

  return () => {
    unsubscribeNotifications();
  };
};

export const updateNotification = (notificationId, data) => {
  const notificationRef = collection(db, "notifications");

  updateDoc(doc(notificationRef, notificationId), data).catch(errorHandler);
};

export const deleteNotification = (notificationId) => {
  const notificationRef = collection(db, "notifications");

  deleteDoc(doc(notificationRef, notificationId)).catch(errorHandler);
};

export const createNotification = ({ userid, title, body }) => {
  const notificationRef = collection(db, "notifications");

  return addDoc(notificationRef, {
    userid,
    title,
    body,
    timestamp: Date.now(),
    read: false,
  });
};
