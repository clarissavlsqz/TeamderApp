import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "../../../firebaseConfig";

const dummyClasses = Array.from(Array(5).keys()).map((i) => ({
  title: `Class ${i + 1}`,
  id: i,
}));

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.class}>{item.name}</Text>
  </TouchableOpacity>
);

const ClassView = ({ navigation }) => {
  const [userClass, setUserClass] = useState([]);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const fetchUsersGroups = async () => {
      try {
        const user = auth.currentUser;
        if (user !== null) {
          const usersClassesRef = collection(db, "users", user.uid, "classes");
          const unsubscribe = onSnapshot(usersClassesRef, (querySnapshot) => {
            const classes = [];
            querySnapshot.forEach((doc) => {
              const classItem = {};
              classItem.name = doc.data().name;
              classItem.uid = doc.data().uid;
              classes.push(classItem);
            });
            setUserClass(...userClass, classes);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsersGroups();
  }, []);

  useEffect(() => {
    console.log(userClass);
    setIsWaiting(false);
  }, [userClass]);

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
        data={userClass}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
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
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  button: {
    marginTop: 40,
  },
});

export default ClassView;
