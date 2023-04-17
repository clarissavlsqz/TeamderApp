import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  Text,
} from "react-native";
import { auth, db } from "../firebaseConfig";

const TeamItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.team}>{item.team}</Text>
    <Text style={styles.class}>{item.name}</Text>
  </View>
);

export default function HomeView() {
  const [userTeam, setUserTeam] = useState([]);

  useEffect(() => {
    const fetchUsersTeams = async () => {
      try {
        const user = auth.currentUser;
        if (user !== null) {
          const usersGroupsRef = collection(db, "users", user.uid, "groups");
          const unsubscribe = onSnapshot(usersGroupsRef, (querySnapshot) => {
            const groups = [];
            querySnapshot.forEach((doc) => {
              var group = {};
              group.name = doc.data().name;
              group.team = doc.data().team;
              groups.push(group);
            });
            setUserTeam(...userTeam, groups);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsersTeams();
  }, []);

  useEffect(() => {
    console.log(userTeam);
  }, [userTeam]);

  const renderItem = ({ item }) => {
    console.log("SOS");
    return <TeamItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        data={userTeam}
        renderItem={renderItem}
        keyExtractor={(item) => item.team}
      />
    </SafeAreaView>
  );
}

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
