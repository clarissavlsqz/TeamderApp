import React, { useMemo } from "react";
import { Card, Text, View } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useClassContext } from "../../../context/class-context";
import UserAvatar from "../../../components/UserAvatar";

const TeamItem = ({ item }) => (
  <Card
    key={item.id}
    style={{
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 25,
      elevation: 5,
    }}
    onPress={() => console.log(item.members)}
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

const HomeView = () => {
  const { userGroups } = useClassContext();

  return (
    <View useSafeArea flex>
      <StatusBar style="light" />
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={userGroups}
        renderItem={TeamItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeView;
