import React, { useMemo } from "react";
import { Card, Text, View } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet } from "react-native";
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

  const renderItem = useMemo(() => {
    const render = ({ item }) => <TeamItem item={item} />;

    return render;
  }, []);

  return (
    <View SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={userGroups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  team: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  class: {
    fontSize: 15,
  },
});

export default HomeView;
