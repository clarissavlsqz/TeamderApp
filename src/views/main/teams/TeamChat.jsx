import React, { useCallback, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import {
  Bubble,
  GiftedChat,
  MessageText,
  isSameDay,
  isSameUser,
} from "react-native-gifted-chat";
import { Colors, Image, Text, View } from "react-native-ui-lib";
import {
  MentionInput,
  mentionRegEx,
  replaceMentionValues,
} from "react-native-controlled-mentions";
import {
  gestureHandlerRootHOC,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useChatContext } from "../../../context/chat-context";
import { useUserContext } from "../../../context/user-context";
import UserAvatar from "../../../components/UserAvatar";
import LocalImages from "../../../../assets/images/LocalImages";

const renderSuggestions = ({ keyword, onSuggestionPress }, suggestions) => {
  const [calmKeyword, setCalmKeyword] = useState(keyword);
  useEffect(() => {
    const timeout = setTimeout(() => setCalmKeyword(keyword), 10);
    return () => clearTimeout(timeout);
  }, [keyword]);

  if (calmKeyword == null) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        bottom: "100%",
        marginBottom: 0,
        backgroundColor: "white",
      }}
    >
      {suggestions
        .filter((one) =>
          one.name.toLocaleLowerCase().includes(calmKeyword.toLocaleLowerCase())
        )
        .map((one) => (
          <TouchableOpacity
            key={one.id}
            onPress={() => onSuggestionPress(one)}
            style={{ padding: 12 }}
          >
            <Text>{one.name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const renderMentionBubble = (props, userRegEx) => {
  const { currentMessage, previousMessage, user } = props;
  // eslint-disable-next-line no-underscore-dangle
  const isSender = currentMessage.user._id === user._id;
  const displayUsername =
    (!isSameUser(currentMessage, previousMessage) ||
      !isSameDay(currentMessage, previousMessage)) &&
    !isSender;

  return (
    <View flex>
      <Bubble
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.green70,
          },
        }}
        renderMessageText={(textProps) => (
          <>
            {displayUsername && (
              <View marginH-10 marginT-5>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {currentMessage.user.name}
                </Text>
              </View>
            )}
            <MessageText
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...textProps}
              parsePatterns={() => [
                {
                  pattern: userRegEx,
                  style: {
                    color: isSender ? Colors.orange60 : Colors.yellow1,
                    fontWeight: "bold",
                  },
                  renderText: (value) =>
                    replaceMentionValues(value, ({ name }) => `@${name}`),
                },
                {
                  pattern: mentionRegEx,
                  style: { fontWeight: "bold" },
                  renderText: (value) =>
                    replaceMentionValues(value, ({ name }) => `@${name}`),
                },
              ]}
            />
          </>
        )}
      />
    </View>
  );
};

const renderAvatar = (props) => (
  <UserAvatar user={props.currentMessage.user} size={36} />
);

const renderComposer = (props, suggestions) => (
  <MentionInput
    inputRef={props.textInputProps?.ref}
    accessible
    accessibilityLabel={props.placeholder}
    placeholder={props.placeholder}
    placeholderTextColor={props.placeholderTextColor}
    editable={!props.disableComposer}
    onLayout={(e) => {
      if (props.onInputSizeChanged) {
        props.onInputSizeChanged({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height + 17,
        });
      }
    }}
    onChange={props.onTextChanged}
    containerStyle={{
      height: props.composerHeight,
      ...styles.textInputContainer,
    }}
    style={[
      props.textInputStyle,
      {
        marginLeft: 10,
      },
    ]}
    autoFocus={props.textInputAutoFocus}
    value={props.text ?? ""}
    enablesReturnKeyAutomatically
    underlineColorAndroid="transparent"
    keyboardAppearance={props.keyboardAppearance}
    keyboardType={Platform.OS === "ios" ? "twitter" : "email-address"}
    partTypes={[
      {
        trigger: "@",
        renderSuggestions: (p) => renderSuggestions(p, suggestions),
        textStyle: { fontWeight: "bold" },
        isInsertSpaceAfterMention: true,
      },
    ]}
  />
);

const EmptyChat = () => (
  <View
    flex
    center
    style={{
      transform: [{ scaleY: -1 }],
    }}
  >
    <View backgroundColor="white" br50 padding-20 center>
      <View padding-10>
        <Image source={LocalImages.emptyChat} height={250} width={200} />
      </View>
      <Text>Send a message to begin chat!</Text>
    </View>
  </View>
);

const TeamChat = () => {
  const { messages, sendMessage, suggestions, loading } = useChatContext();
  const { user } = useUserContext();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const onSend = useCallback(
    (messagesParam) => {
      sendMessage(messagesParam);
    },
    [sendMessage]
  );

  const memoizedRenderComposer = useCallback(
    (props) => renderComposer(props, suggestions),
    [suggestions]
  );

  const userRegEx = useMemo(
    () => new RegExp(`((.)\\[([^[]*)\\]\\((${user.uid})\\))`, "gi"),
    [user.uid]
  );

  const renderBubble = useCallback(
    (props) => renderMentionBubble(props, userRegEx),
    [userRegEx]
  );

  if (loading) {
    return null;
  }

  return (
    <View flex>
      <GiftedChat
        wrapInSafeArea={false}
        messages={messages}
        renderAvatar={renderAvatar}
        onSend={onSend}
        bottomOffset={Platform.OS === "android" ? 0 : bottomTabBarHeight}
        user={{
          _id: user.uid,
        }}
        renderChatEmpty={EmptyChat}
        renderComposer={memoizedRenderComposer}
        keyboardShouldPersistTaps="handled"
        renderBubble={renderBubble}
      />
      {Platform.OS === "android" && (
        <KeyboardAvoidingView
          keyboardVerticalOffset={insets.top + bottomTabBarHeight + 8}
          behavior="padding"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    justifyContent: "center",
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
});

export default gestureHandlerRootHOC(TeamChat);
