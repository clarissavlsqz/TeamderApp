import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const FETCH_USER = "FETCH_USER";

const fetchUserResponse = (data) => ({ type: FETCH_USER, payload: data });

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return { ...state, user: action.payload };
    }
    default:
      throw new Error();
  }
};

export const fetchUser = (dispatch) => {
  const user = auth.currentUser;

  if (user === null) {
    dispatch(fetchUserResponse(null));
    return;
  }

  const usersRef = collection(db, "users");

  getDoc(doc(usersRef, user.uid))
    .then((userDoc) => {
      dispatch(
        fetchUserResponse({
          firstName: userDoc.get("firstName"),
          lastName: userDoc.get("lastName"),
          personality: userDoc.get("personality"),
          email: user.email,
          uid: user.uid,
        })
      );
    })
    .catch(() => {});
};

export const updateUserProfile = (profile, dispatch) => {
  const user = auth.currentUser;

  if (user === null) {
    return;
  }

  const usersRef = collection(db, "users");

  updateDoc(doc(usersRef, user.uid), profile)
    .then(() => {
      fetchUser(dispatch);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const createUserProfile = (
  { email, password, firstName, lastName, personality },
  _dispatch
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;

      const usersRef = collection(db, "users");
      return setDoc(doc(usersRef, user.uid), {
        firstName,
        lastName,
        email,
        personality,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};
