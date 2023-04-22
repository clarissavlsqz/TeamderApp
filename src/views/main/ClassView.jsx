import React, { useMemo } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useClassContext } from "../../context/class-context";
import { useUserContext } from "../../context/user-context";
import constants from "../../constants";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.class}>{item.name}</Text>
    <View style={styles.badgeView}>
      <Text style={styles.classId}>{item.id}</Text>
      {item.admin && (
        <View style={styles.classOwnerView}>
          <Text style={styles.classOwner}>owner</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const ClassView = ({ navigation }) => {
  const { userClasses, allClasses, selectClass, selectedClass } =
    useClassContext();
  const { user } = useUserContext();

  const classes = useMemo(
    () => [
      ...allClasses
        .filter(({ admin }) => admin === user.uid)
        .map(({ name, id, ...rest }) => ({
          name,
          id: `admin-${id}`,
          admin: true,
          ...rest,
        })),
      ...userClasses,
    ],
    [userClasses, allClasses]
  );

  console.log(selectedClass.classmates);

  const renderItem = useMemo(() => {
    const renderClass = ({ item }) => (
      <Item
        item={item}
        onPress={() => {
          selectClass(item);

          // navigation.push("ClassInfo");
        }}
      />
    );

    return renderClass;
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateClass")}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Create Class </Text>
      </TouchableOpacity>

      <FlatList
        data={classes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  class: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  classId: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  button: {
    marginTop: 40,
  },
  classOwner: {
    fontWeight: "bold",
    fontSize: 12,
    color: "black",
    padding: 2,
  },
  badgeView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  classOwnerView: {
    backgroundColor: constants.BACKGROUND_COLOR,
    padding: 5,
    marginRight: 10,
    borderRadius: 50,
  },
  flatListContainer: {
    marginBottom: 70,
  },
});

export default ClassView;
