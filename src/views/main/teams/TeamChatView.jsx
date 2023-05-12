import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native-ui-lib";
import { FontAwesome } from "@expo/vector-icons";
import { ChatContextProvider } from "../../../context/chat-context";
import { useClassContext } from "../../../context/class-context";
import TeamChat from "./TeamChat";
import TeammatesModal from "../../../components/TeammatesModal";

const TeamChatView = ({ route, navigation }) => {
  const { userGroups } = useClassContext();
  const [modalVisible, setModalVisible] = useState(false);
  const groupId = route.params?.groupId;

  const group = useMemo(
    () => userGroups.filter((groupParam) => groupParam.id === groupId)[0],
    [userGroups, groupId]
  );

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <FontAwesome name="users" size={24} color="white" onPress={openModal} />
      ),
    });
  }, [navigation, setModalVisible]);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ChatContextProvider group={group}>
        <TeamChat />
      </ChatContextProvider>
      {modalVisible && (
        <View>
          <TeammatesModal
            members={group.members}
            isVisible={modalVisible}
            closeModal={closeModal}
          />
        </View>
      )}
    </>
  );
};

export default TeamChatView;
