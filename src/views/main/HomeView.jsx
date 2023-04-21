import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { auth, db } from "../../../firebaseConfig";
import TeammatesView from "../../components/TeammatesModal";

const TeamItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.team}>{item.team}</Text>
    <Text style={styles.class}>{item.class}</Text>
  </View>
);

const HomeView = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [groupsOfUser, setGroupsOfUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupID, setGroupID] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    const memberRef = collection(db, "member");

    const unsubscribe = onSnapshot(
      memberRef,
      async (querySnapshot) => {
        const groups = [];
        querySnapshot.forEach((memberDoc) => {
          if (memberDoc.data().userid === user.uid) {
            if (memberDoc.data().groupid !== "") {
              groups.push(memberDoc.data().groupid);
            }
          }
        });
        setUserGroups(groups);
        const querySnapshotGroups = await getDocs(collection(db, "group"));
        const groupsUserIsIn = [];
        await Promise.all(
          groups.map(async (groupUser) => {
            await Promise.all(
              querySnapshotGroups.docs.map(async (doc2) => {
                if (doc2.id === groupUser) {
                  const groupItem = {};
                  groupItem.team = doc2.data().name;
                  groupItem.groupID = doc2.id;
                  const classIDOfGroup = doc2.data().fromclass;
                  const docRef = await getDoc(doc(db, "class", classIDOfGroup));
                  groupItem.class = docRef.data().name;
                  groupsUserIsIn.push(groupItem);
                }
              })
            );
          })
        );
        setGroupsOfUser(groupsUserIsIn);
        console.log("Groups:", groupsUserIsIn);
      },

      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isModalVisible]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setIsModalVisible(!isModalVisible);
        setGroupID(item.groupID);
        console.log("TEAMVIEWGROUPID:", groupID);
      }}
    >
      <TeamItem item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={groupsOfUser}
        renderItem={renderItem}
        keyExtractor={(item) => item.groupID}
      />
      {isModalVisible && (
        <View>
          <TeammatesView isVisible={isModalVisible} groupID={groupID} />
        </View>
      )}
    </SafeAreaView>
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
