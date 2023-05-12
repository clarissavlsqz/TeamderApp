import React, { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Card, Modal, Text, View, TouchableOpacity } from "react-native-ui-lib";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../../firebaseConfig";
import constants from "../constants";

const TeammatesModal = ({ members, isVisible, closeModal }) => {
  const teamMembersList = members.map((member) => (
    <View key={member.user.id} marginB-10>
      <Text>
        {member.user.firstName} {member.user.lastName}
      </Text>
      <Text marginL-10>
        <MaterialIcons name="email" size={12} color="black" />{" "}
        {member.user.email}
      </Text>
    </View>
  ));
  return (
    <Modal visible={isVisible} transparent onRequestClose={closeModal}>
      <View flex center style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}>
        <Card padding-20>
          <View>
            <Text text60 marginB-10>
              {" "}
              Team Members
            </Text>
            {teamMembersList}
            <View center>
              <TouchableOpacity
                style={{ backgroundColor: "#98D7D0", borderRadius: 5 }}
                padding-5
                onPress={closeModal}
              >
                <Text text90>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default TeammatesModal;
