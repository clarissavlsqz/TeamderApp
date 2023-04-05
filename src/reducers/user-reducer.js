import { collection, getDocs, query, where } from "firebase/firestore";
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
  const q = query(usersRef, where("email", "==", user.email));

  getDocs(q)
    .then((querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        return;
      }

      const doc = querySnapshot.docs[0];

      dispatch(
        fetchUserResponse({
          firstName: doc.get("firstName"),
          lastName: doc.get("lastName"),
          personality: doc.get("personality"),
          email: user.email,
        })
      );
    })
    .catch(() => {});
};
