import React, { useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Colors,
  GridView,
  Incubator,
  PanningProvider,
  Spacings,
  View,
} from "react-native-ui-lib";
import { FontAwesome } from "@expo/vector-icons";
import LocalImages from "../../assets/images/LocalImages";

const images = [
  "blackbird",
  "butterfly",
  "chicken",
  "cow",
  "duck",
  "ganesha",
  "ostrich",
  "panda",
  "parrot",
  "pelican",
  "scavenging",
  "shark",
  "turtle",
];

const AvatarPicker = ({ visible, onDismiss, selectedAvatar, selectAvatar }) => {
  const items = useMemo(
    () =>
      images.map((imageName) => ({
        renderCustomItem: () => (
          <View flex center marginB-10>
            {imageName === selectedAvatar ? (
              <Avatar
                source={LocalImages.avatars[imageName]}
                badgePosition="BOTTOM_RIGHT"
                badgeProps={{
                  customElement: (
                    <FontAwesome name="check" size={14} color="black" />
                  ),
                  size: 28,
                }}
              />
            ) : (
              <Avatar source={LocalImages.avatars[imageName]} />
            )}
          </View>
        ),
        onPress: () => selectAvatar(imageName),
        title: imageName,
        titleLines: 2,
      })),
    [selectAvatar, selectedAvatar]
  );

  return (
    <Incubator.Dialog
      visible={visible}
      onDismiss={onDismiss}
      width="100%"
      height="100%"
      bottom
      useSafeArea
      containerStyle={{ backgroundColor: Colors.$backgroundDefault }}
      direction={PanningProvider.Directions.DOWN}
      headerProps={{ title: "Custom modal" }}
    >
      <ScrollView>
        <GridView
          items={items}
          numColumns={3}
          itemSpacing={Spacings.s3}
          listPadding={Spacings.s5}
        />
      </ScrollView>
    </Incubator.Dialog>
  );
};

export default AvatarPicker;
