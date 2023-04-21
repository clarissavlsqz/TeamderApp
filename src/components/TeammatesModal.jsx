import React, { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { db } from "../../firebaseConfig";
import constants from "../constants";

const TeammatesModal = ({ isVisible, groupID, closeModal }) => {
  const [teammatesList, setTeammatesList] = useState(null);

  useEffect(() => {
    async function getTeammates(groupID2) {
      // get a reference to the "users" collection
      const teammates = [];
      const querySnapshot = await getDocs(collection(db, "member"));
      querySnapshot.forEach((doc2) => {
        if (doc2.data().groupid === groupID2) {
          teammates.push(doc2.data().userid);
        }
      });

      const names = [];

      await Promise.all(
        teammates.map(async (teammate) => {
          const userRef = doc(db, "users", teammate);
          const userDoc = await getDoc(userRef);
          names.push(`${userDoc.data().firstName} ${userDoc.data().lastName}`);
        })
      );

      setTeammatesList(names);
    }
    getTeammates(groupID);
  }, [groupID]);

  if (!teammatesList) {
    return null;
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}> Team Members </Text>
            {teammatesList.map((person) => (
              <View key={person}>
                <Text style={styles.modalStudent}>{person}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: constants.BACKGROUND_COLOR,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalStudent: {
    marginBottom: 5,
  },
});

export default TeammatesModal;
