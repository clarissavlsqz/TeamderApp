import React, { useMemo } from "react";
import { Card, Chip, Text, View } from "react-native-ui-lib";
import { EvilIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useClassContext } from "../../../context/class-context";
import { useUserContext } from "../../../context/user-context";
import UserAvatar from "../../../components/UserAvatar";

const ClassItem = ({ item, navigation }) => (
  <Card
    key={item.id}
    style={{
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 25,
      elevation: 5,
    }}
    onPress={() => {
      if (item.isAdmin) {
        navigation.push("ClassManagement", {
          classId: item.id,
        });
      }
    }}
    activeOpacity={item.isAdmin ? 0.6 : 1}
  >
    <View padding-20>
      <View row spread>
        <Text text40 $textDefault>
          {item.name}
        </Text>
        {item.isAdmin ? (
          <EvilIcons name="arrow-right" color="black" size={32} />
        ) : (
          <View />
        )}
      </View>
      <View row>
        <Text text90>{item.description}</Text>
        <Text text90 $textDefault>
          {" "}
          | {item.id}
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
        <View flex right>
          {item.isAdmin ? (
            <Chip
              label="Admin"
              backgroundColor="#F4D06F"
              containerStyle={{ borderWidth: 0 }}
            />
          ) : (
            <Chip
              label="Member"
              backgroundColor="#98D7D0"
              containerStyle={{ borderWidth: 0 }}
            />
          )}
        </View>
      </View>
    </View>
  </Card>
);
const ClassView = ({ navigation }) => {
  const { userClasses, allClasses } = useClassContext();
  const { user } = useUserContext();

  const adminClasses = useMemo(
    () => [
      ...allClasses
        .filter(({ admin }) => admin === user.uid)
        .map(({ id, ...rest }) => ({
          id,
          isAdmin: true,
          key: `admin-${id}`,
          ...rest,
        })),
    ],
    [allClasses]
  );

  const classes = useMemo(
    () => [...userClasses, ...adminClasses],
    [userClasses, adminClasses]
  );

  return (
    <View SafeAreaView flex>
      <StatusBar style="light" />
      <FlatList
        data={classes}
        keyExtractor={(item) => item.key ?? item.id}
        renderItem={({ item }) => (
          <ClassItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default ClassView;
