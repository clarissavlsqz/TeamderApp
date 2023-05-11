import React from "react";
import { Text, View } from "react-native-ui-lib";

const ClassManagementView = ({ route, navigation }) => {
  const { members, groups, className } = route.params;

  const classID = members[0].classid;

  const classGroupsList = groups.filter((group) => group.fromclass === classID);

  const classGroups = classGroupsList.map((group) => {
    const membersGroupList = members.filter(
      (member) => member.groupid === group.id
    );
    const membersGroup = membersGroupList.map((member) => (
      <Text marginL-15 marginT-10>
        {" "}
        {member.user.firstName} {member.user.lastName}{" "}
      </Text>
    ));

    return (
      <View padding-20>
        <Text text60>{group.name}</Text>
        {membersGroup}
      </View>
    );
  });

  React.useEffect(() => {
    navigation.setOptions({
      title: className,
    });
  }, [navigation]);

  return (
    <View flex paddingT-25>
      <Text center text40>
        Teams
      </Text>
      <View paddingL-40 paddingT-15>
        {classGroups}
      </View>
    </View>
  );
};

export default ClassManagementView;
