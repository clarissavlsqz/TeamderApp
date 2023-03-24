import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const dummyClasses = Array.from(Array(50).keys()).map((i) => ({
  title: `Class ${i + 1}`,
  id: i,
}));

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.class}>{item.title}</Text>
  </TouchableOpacity>
);

export default function ClassView() {
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CreateClass")
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}> Create Class </Text>
      </TouchableOpacity>

      <FlatList
        data={dummyClasses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

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
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  button: {
    marginTop: 40,
  },
});
