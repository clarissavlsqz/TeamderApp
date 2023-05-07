import React, { useMemo, useRef } from "react";
import { FlatList, gestureHandlerRootHOC } from "react-native-gesture-handler";
import { SafeAreaView, StatusBar } from "react-native";
import { Badge, Colors, Drawer, Text, View } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";
import { useNotificationsContext } from "../../../context/notifications-context";

const NotificationItem = ({ item, updateNotification, deleteNotification }) => {
  const drawerRef = useRef(null);

  return (
    <Drawer
      ref={drawerRef}
      rightItems={[
        {
          text: "Delete",
          background: Colors.red30,
          keepOpen: false,
          onPress: () => deleteNotification(item.id),
        },
      ]}
      leftItem={{
        text: item.read ? "Unread" : "Read",
        background: Colors.blue30,
        keepOpen: false,
        onPress: () =>
          updateNotification(item.id, {
            read: !item.read,
          }),
      }}
      onFullSwipeRight={() => deleteNotification(item.id)}
      onWillFullSwipeLeft={() => {
        updateNotification(item.id, {
          read: !item.read,
        });
        drawerRef.current.closeDrawer();
      }}
      fullSwipeLeft
      fullSwipeRight
      disableHaptic
    >
      <View
        bg-grey80
        paddingH-20
        paddingV-10
        row
        centerV
        style={{ borderBottomWidth: 1, borderColor: Colors.grey60 }}
        testID="drawer_item"
      >
        {!item.read && (
          <Badge
            testID="drawer_item_badge"
            size={6}
            backgroundColor={Colors.red30}
            containerStyle={{ marginRight: 8 }}
          />
        )}
        <Ionicons name="notifications" size={24} color="black" />
        <View marginL-20>
          <Text text70R={item.read} text70BO={!item.read}>
            {item.title}
          </Text>
          <Text text80 marginT-2>
            {item.body}
          </Text>
        </View>
      </View>
    </Drawer>
  );
};

const NotificationsView = () => {
  const { notifications, updateNotification, deleteNotification } =
    useNotificationsContext();

  const renderItem = useMemo(() => {
    const render = ({ item }) => (
      <NotificationItem
        item={item}
        updateNotification={updateNotification}
        deleteNotification={deleteNotification}
      />
    );

    return render;
  }, [updateNotification]);

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default gestureHandlerRootHOC(NotificationsView);
