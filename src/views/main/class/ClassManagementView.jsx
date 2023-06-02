import React, { useCallback, useMemo, useState } from "react";
import { Text, View, Button, Dialog } from "react-native-ui-lib";
import { FlatList } from "react-native-gesture-handler";
import LoadingButton from "../../../components/LoadingButton";
import { useClassContext } from "../../../context/class-context";
import UserAvatar from "../../../components/UserAvatar";

const User = ({ item: member }) => (
  <View row centerV>
    <View marginR-10 padding-10>
      <UserAvatar user={member.user} />
    </View>
    <Text text80>
      {member.user.firstName} {member.user.lastName}
    </Text>
  </View>
);

const GroupSection = ({ group }) => (
  <View marginV-10 centerV>
    <Text marginL-10> {group.name} </Text>
    <View bg-screenPop br30 paddingH-5>
      <FlatList
        data={group.members}
        keyExtractor={(item) => item.userid}
        renderItem={User}
      />
    </View>
  </View>
);

const ClassManagementView = ({ route, navigation }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { deleteClass, allClasses, allGroups } = useClassContext();
  const classId = route.params?.classId;
  const currentClass = allClasses.filter(
    (classObj) => classObj.id === classId
  )[0];

  const deleteConfirm = useCallback(() => {
    deleteClass(classId, () => {
      setShowConfirmation(false); // Hide the confirmation popup after successful deletion
      navigation.goBack();
    });
  }, [classId]);

  const classGroups = useMemo(
    () => allGroups.filter((group) => group.fromclass === classId),
    [allGroups, classId]
  );

  React.useEffect(() => {
    navigation.setOptions({
      title: currentClass.name,
    });
  }, [navigation]);

  const groupedGroups = useMemo(() => {
    const groups = {
      ungrouped: {
        name: "Unassigned Members",
        members: [],
      },
    };

    classGroups.forEach(({ id, name }) => {
      groups[id] = {
        name,
        members: [],
      };
    });

    currentClass.members.forEach((member) => {
      if (member.groupid) {
        groups[member.groupid].members.push(member);
      } else {
        groups.ungrouped.members.push(member);
      }
    });

    return groups;
  }, [classGroups, currentClass]);

  return (
    <View flex marginH-20>
      <View centerH marginB-30 marginT-20>
        <Text marginT-10 text60>
          {currentClass.name}
        </Text>

        <Text text80>Class Id {currentClass.id}</Text>
      </View>

      {currentClass.members.length === 0 ? (
        <Text>No one has joined this class yet.</Text>
      ) : (
        Object.entries(groupedGroups)
          .filter(([_groupId, group]) => group.members.length > 0)
          .map(([groupId, group]) => (
            <GroupSection group={group} key={groupId} />
          ))
      )}

      <View flexG />

      <LoadingButton
        onPress={() => setShowConfirmation(true)} // Show the confirmation popup when the delete button is pressed
        label="Delete Class"
        loading={false}
        color="red"
        backgroundColor="#FFFFFF"
        marginB-20
      />

      <Dialog
        useSafeArea
        visible={showConfirmation}
        onDismiss={() => setShowConfirmation(false)}
        containerStyle={{ justifyContent: "center", alignItems: "center" }}
      >
        <View padding-20 backgroundColor="#FFFFFF" borderRadius={10}>
          <Text text40 marginB-20>
            Confirm Deletion
          </Text>
          <Text marginB-20>Are you sure you want to delete this class?</Text>
          <Button
            label="Delete"
            onPress={deleteConfirm}
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
