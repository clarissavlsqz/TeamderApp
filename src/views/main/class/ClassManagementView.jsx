import React from "react";
import { Text, View } from "react-native-ui-lib";
import { SectionList } from "react-native";
import UserAvatar from "../../../components/UserAvatar";

const ClassManagementView = ({ route, navigation }) => {
  const { members, groups, className } = route.params;

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

  React.useEffect(() => {
    navigation.setOptions({
      title: className,
    });
  }, [navigation]);

  return (
    <View flex>
      {/* <Text center text20>
        Teams
      </Text> */}
      <View>
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
    </View>
  );
};

export default ClassManagementView;
