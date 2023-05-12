import React, {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { addMessage, fetchChat, reducer } from "../reducers/chat-reducer";
import { useClassContext } from "./class-context";

export const ChatContext = createContext();

export const ChatContextProvider = ({ group, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    messages: [],
    group,
  });
  const { userMap } = useClassContext();

  useEffect(() => fetchChat(dispatch, group.id), [group.id]);

  const memoizedMessages = useMemo(() => {
    const mappedMessages = state.messages.map(
      ({ uuid, userid, text, createdAt, received, pending }) => ({
        _id: uuid,
        text,
        createdAt: new Date(createdAt),
        received,
        pending,
        user: {
          _id: userid,
          avatar: userMap[userid].avatar,
          firstName: userMap[userid].firstName,
          lastName: userMap[userid].lastName,
          name: `${userMap[userid].firstName} ${userMap[userid].lastName}`,
        },
      })
    );

    return mappedMessages;
  }, [state, userMap]);

  const suggestions = useMemo(
    () =>
      group.members.map((member) => ({
        id: member.userid,
        name: `${member.user.firstName} ${member.user.lastName}`,
      })),
    [group]
  );

  const dispatchStateProvider = useMemo(
    () => [
      {
        ...state,
        memoizedMessages,
        suggestions,
      },
      dispatch,
    ],
    [state, dispatch, memoizedMessages, suggestions]
  );

  return (
    <ChatContext.Provider value={dispatchStateProvider}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }

  const [state, dispatch] = context;

  const sendMessage = useCallback(
    (data) => {
      const [message] = data;

      addMessage(
        state.group.id,
        {
          // eslint-disable-next-line no-underscore-dangle
          uuid: message._id,
          createdAt: message.createdAt,
          text: message.text,
          // eslint-disable-next-line no-underscore-dangle
          userid: message.user._id,
        },
        dispatch
      );
    },
    [state.group.id, dispatch]
  );

  return {
    messages: state.memoizedMessages,
    suggestions: state.suggestions,
    loading: state.loading,
    sendMessage,
  };
};
