import { collection, onSnapshot, getDocs } from "firebase/firestore";
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
  const [classesOfUser, setClassesOfUser] = useState([]);
  const [isWaiting, setIsWaiting] = useState(true);
  const [userClasses, setUserClasses] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const memberRef = collection(db, "member");

    const unsubscribe = onSnapshot(
      memberRef,
      async (querySnapshot) => {
        const classes = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().userid === user.uid) {
            classes.push(doc.data().classid);
          }
        });
        setUserClasses(classes);
        const querySnapshotClasses = await getDocs(collection(db, "class"));
        const classesUserIsIn = [];
        classes.forEach((classUser) => {
          querySnapshotClasses.forEach((doc2) => {
            if (doc2.id === classUser) {
              const classItem = {};
              classItem.name = doc2.data().name;
              classItem.uid = doc2.data().id;
              classesUserIsIn.push(classItem);
            }
          });
        });
        setClassesOfUser(classesUserIsIn);
      },

      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   console.log(userClass);
  //   setIsWaiting(false);
  // }, [userClass]);

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
        data={classesOfUser}
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
