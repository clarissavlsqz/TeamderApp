import { collection, getDocs, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function ProfileView() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPersonality, setUserPersonality] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const user = auth.currentUser;
      if (user !== null) {
        setUserEmail(user.email);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", userEmail));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserName(doc.get("firstName") + " " + doc.get("lastName"));
          setUserPersonality(doc.get("personality"));
        });
      }
    }
    fetchUserData();
  }, [userEmail, userName, userPersonality]);

  const onLogout = () => {
    auth.signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Text style={styles.profileText}>
        {" "}
        <Text style={styles.boldText}>Name:</Text> {userName}
      </Text>
      <Text style={styles.profileText}>
        {" "}
        <Text style={styles.boldText}>Email:</Text> {userEmail}
      </Text>
      <Text style={styles.profileText}>
        {" "}
        <Text style={styles.boldText}>Personality:</Text> {userPersonality}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}> Logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#98D7D0",
    alignItems: "center",
    borderRadius: 25,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});
