import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const START_FETCHING_MESSAGES = "START_FETCHING_MESSAGES";
const END_FETCHING_MESSAGES = "END_FETCHING_MESSAGES";
const START_SENDING_MESSAGE = "START_SENDING_MESSAGE";
const CLEAR_MESSAGES = "CLEAR_MESSAGES";

const fetchMessagesResponse = (data) => ({
  type: END_FETCHING_MESSAGES,
  payload: data,
});

const startSendingMessage = (data) => ({
  type: START_SENDING_MESSAGE,
  payload: data,
});

const startFetch = () => ({
  type: START_FETCHING_MESSAGES,
});

const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case END_FETCHING_MESSAGES: {
      if (state.loading) {
        return {
          ...state,
          loading: false,
          messages:
            action.payload
              .get("added")
              ?.sort(
                (messageA, messageB) => messageB.createdAt - messageA.createdAt
              ) ?? [],
        };
      }

      const { messages } = state;

      if (action.payload.get("added")) {
        action.payload.get("added").forEach((addedMessage) => {
          const index = messages.findIndex(
            (messageIter) => messageIter.uuid === addedMessage.uuid
          );

          if (index > -1) {
            messages[index] = addedMessage;
          } else {
            messages.unshift(addedMessage);
          }
        });
      }

      return {
        ...state,
        messages,
      };
    }
    case START_SENDING_MESSAGE: {
      const { messages } = state;
      messages.unshift(action.payload);

      return {
        ...state,
        messages,
      };
    }
    case START_FETCHING_MESSAGES: {
      return {
        ...state,
        messages: [],
        loading: true,
      };
    }
    case CLEAR_MESSAGES: {
      return { ...state, messages: [], loading: false };
    }
    default:
      throw new Error();
  }
};
const errorHandler = (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export const fetchChat = (dispatch, groupId) => {
  if (!groupId) {
    dispatch(clearMessages());
    return () => {};
  }

  dispatch(startFetch());

  const chatMessagesRef = collection(db, "group", groupId, "messages");

  const unsubscribeChat = onSnapshot(
    chatMessagesRef,
    async (querySnapshot) => {
      const map = new Map();

      querySnapshot.docChanges().forEach((change) => {
        const changeType = change.type;
        const changes = map.get(changeType);
        const item = {
          ...change.doc.data(),
          received: true,
        };

        if (!changes) {
          map.set(changeType, [item]);
        } else {
          changes.push(item);
        }
      });

      dispatch(fetchMessagesResponse(map));
    },
    errorHandler
  );

  return () => {
    unsubscribeChat();
  };
};

export const addMessage = (groupId, { userid, text, uuid }, dispatch) => {
  const chatMessagesRef = collection(db, "group", groupId, "messages");

  dispatch(
    startSendingMessage({
      uuid,
      userid,
      text,
      createdAt: Date.now(),
      pending: true,
    })
  );

  addDoc(chatMessagesRef, {
    uuid,
    userid,
    text,
    createdAt: Date.now(),
  });
};
