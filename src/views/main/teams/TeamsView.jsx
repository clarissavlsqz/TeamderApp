import React, { useMemo, useState } from "react";
import { Card, Text, View } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useClassContext } from "../../../context/class-context";
import UserAvatar from "../../../components/UserAvatar";
import TeammatesModal from "../../../components/TeammatesModal";

const TeamItem = ({ item, listMembers, checkItemPressed }) => {
  const returnMembers = item.members;
  const wasPress = true;

  return (
    <Card
      key={item.id}
      style={{
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 25,
        elevation: 5,
      }}
      // onPress={() => console.log(item.members)}
      onPress={() => {
        checkItemPressed(wasPress);
        listMembers(returnMembers);
      }}
    >
      <View padding-20>
        <View row spread>
          <Text text40 $textDefault>
            {item.name}
          </Text>

          <EvilIcons name="arrow-right" color="black" size={32} />
        </View>
        <View row>
          <Text text90>{item.class.name}</Text>
          <Text text90 $textDefault>
            {" "}
            | {item.class.id}
          </Text>
        </View>

        <Text text70 $textDefault marginV-6>
          People ({item.members.length})
        </Text>

        <View row>
          {item.members.map((member) => (
            <View
              key={member.userid}
              style={{
                marginRight: -6,
              }}
            >
              <UserAvatar user={member.user} />
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};

const HomeView = () => {
  const { userGroups } = useClassContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [members, setMembers] = useState([]);

  const getMembers = (itemMembers) => {
    setMembers(itemMembers);
  };

  const checkModalVisibility = (visibility) => {
    setModalVisible(visibility);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View useSafeArea flex>
      <StatusBar style="light" />
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={userGroups}
        renderItem={({ item }) => (
          <TeamItem
            item={item}
            listMembers={getMembers}
            checkItemPressed={checkModalVisibility}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {modalVisible && (
        <View>
          <TeammatesModal
            members={members}
            isVisible={modalVisible}
            closeModal={closeModal}
          />
        </View>
      )}
    </View>
  );
};

export default HomeView;
