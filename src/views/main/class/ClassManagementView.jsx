import React, { useState } from "react";
import { Text, View, Button, Dialog } from "react-native-ui-lib";
import { SectionList } from "react-native";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import UserAvatar from "../../../components/UserAvatar";
import { db } from "../../../../firebaseConfig";
import LoadingButton from "../../../components/LoadingButton";

const ClassManagementView = ({ route, navigation }) => {
  const { members, groups, className } = route.params;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const data = [];

  const classID = members[0].classid;

  const classGroupsList = groups.filter((group) => group.fromclass === classID);

  classGroupsList.map((group) => {
    const membersGroupList = members.filter(
      (member) => member.groupid === group.id
    );

    const membersData = [];
    membersGroupList.map((member) =>
      membersData.push({
        name: `${member.user.firstName} ${member.user.lastName}`,
        user: member.user,
      })
    );

    data.push({ title: group.name, data: membersData });
    return data;
  });

  const deleteClass = async () => {
    console.log("Delete: ", classID);

    try {
      await updateDoc(doc(db, "class", classID), { isactive: "0" });
      console.log("Class deleted successfully!");
      setShowConfirmation(false); // Hide the confirmation popup after successful deletion
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting class: ", error);
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: className,
    });
  }, [navigation]);

  return (
    <View flex>
      <View flex>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View paddingV-15 paddingL-20 flex row>
              <UserAvatar user={item.user} size={25} />
              <Text text60 marginT-2 marginL-4>
                {" "}
                {item.name}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View backgroundColor="rgba(43, 35, 67, 0.3)" padding-5>
              <Text text40 marginL-5 marginT-5>
                {title}
              </Text>
            </View>
          )}
        />
      </View>
      <View
        useSafeArea
        flex
        s
        bg-screenBG
        style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
      >
        <LoadingButton
          onPress={() => setShowConfirmation(true)} // Show the confirmation popup when the delete button is pressed
          label="Delete Class"
          loading={false}
          marginV-30
        />
      </View>

      <Dialog
  useSafeArea
  visible={showConfirmation}
  onDismiss={() => setShowConfirmation(false)}
  containerStyle={{ justifyContent: "center", alignItems: "center" }}
>
  <View
    padding-20
    backgroundColor="#FFFFFF"
    borderRadius={10}
  >
    <Text text40 marginB-20>
      Confirm Deletion
    </Text>
    <Text marginB-20>
      Are you sure you want to delete this class?
    </Text>
    <Button
      label="Delete"
      onPress={deleteClass}
      backgroundColor="#FF0000"
      enableShadow
    />
    <Button
      label="Cancel"
      onPress={() => setShowConfirmation(false)}
      link
      marginT-10
    />
  </View>
</Dialog>
</View>
);
};


export default ClassManagementView;
