import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useClassContext } from "../../context/class-context";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.class}>{item.name}</Text>
    <Text style={styles.classId}>{item.id}</Text>
  </TouchableOpacity>
);

const ClassView = ({ navigation }) => {
  const { userClasses } = useClassContext();

  const renderItem = ({ item }) => <Item item={item} />;

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
        data={userClasses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
});

export default ClassView;
